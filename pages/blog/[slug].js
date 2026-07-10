import Link from 'next/link';
import Seo from '@/components/Seo';
import settings from '@/content/site/settings.json';
import { getBlogPosts, getBlogPostBySlug, markdownToHtml } from '@/lib/content';

export default function BlogPost({ post, contentHtml }) {
  const date = new Date(post.date).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`;

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />
      <article className="py-24 md:py-32">
        <div className="container-page max-w-3xl">
          <Link href="/blog" className="text-gold text-xs uppercase tracking-widest">
            ← Blog Jurídico
          </Link>

          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gold mt-6">
            <span>{post.category}</span>
            <span className="text-cream/40">·</span>
            <span className="text-cream/50 normal-case tracking-normal">{date}</span>
          </div>

          <h1 className="section-heading text-3xl md:text-5xl text-cream mt-4 mb-8">{post.title}</h1>

          <div
            className="text-cream/80 leading-relaxed [&_h2]:font-display [&_h2]:text-gold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {post.tags?.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-cream/60 border border-white/15 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex gap-3">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Compartir en WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Compartir en Facebook
              </a>
            </div>
            <a
              href={settings.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream/60 hover:text-gold"
            >
              Síguenos en Instagram
            </a>
          </div>
        </div>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getBlogPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getBlogPostBySlug(params.slug);
  const contentHtml = await markdownToHtml(post.body);
  return {
    props: { post, contentHtml },
  };
}

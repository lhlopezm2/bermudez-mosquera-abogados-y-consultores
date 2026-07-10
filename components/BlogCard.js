import Link from 'next/link';

export default function BlogCard({ post }) {
  const date = new Date(post.date).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border border-white/10 hover:border-gold/50 bg-graphite-light p-8 rounded-sm transition-colors"
    >
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gold mb-3">
        <span>{post.category}</span>
        <span className="text-cream/40">·</span>
        <span className="text-cream/50 normal-case tracking-normal">{date}</span>
      </div>
      <h3 className="font-display text-xl text-cream group-hover:text-gold transition-colors mb-3">
        {post.title}
      </h3>
      <p className="text-sm text-cream/70 leading-relaxed mb-4">{post.excerpt}</p>
      <span className="text-xs uppercase tracking-widest text-gold">Leer artículo →</span>
    </Link>
  );
}

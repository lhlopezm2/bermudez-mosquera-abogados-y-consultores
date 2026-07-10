import Link from 'next/link';
import Seo from '@/components/Seo';
import { getCaseStudies, getCaseStudyBySlug, markdownToHtml } from '@/lib/content';

export default function CaseStudyDetail({ item, contentHtml }) {
  return (
    <>
      <Seo title={item.title} description={item.result} path={`/casos-de-exito/${item.slug}`} />
      <section className="py-24 md:py-32">
        <div className="container-page max-w-3xl">
          <Link href="/casos-de-exito" className="text-gold text-xs uppercase tracking-widest">
            ← Casos de Éxito
          </Link>
          <span className="block text-gold text-xs uppercase tracking-widest mt-6">{item.sector}</span>
          <h1 className="section-heading text-3xl md:text-5xl text-cream mt-3 mb-8">{item.title}</h1>
          <div
            className="text-cream/80 leading-relaxed [&_strong]:text-gold [&_em]:text-cream/50 [&_em]:text-sm [&_p]:mb-4"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          <div className="mt-12 border-t border-white/10 pt-8">
            <Link href="/contacto" className="btn-gold">
              Cuéntenos su caso
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const cases = getCaseStudies();
  return {
    paths: cases.map((item) => ({ params: { slug: item.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const item = getCaseStudyBySlug(params.slug);
  const contentHtml = await markdownToHtml(item.body);
  return {
    props: { item, contentHtml },
  };
}

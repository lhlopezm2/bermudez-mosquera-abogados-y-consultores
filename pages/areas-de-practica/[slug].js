import Link from 'next/link';
import Seo from '@/components/Seo';
import { getPracticeAreas, getPracticeAreaBySlug, markdownToHtml } from '@/lib/content';

export default function PracticeAreaDetail({ area, contentHtml }) {
  return (
    <>
      <Seo title={area.title} description={area.summary} path={`/areas-de-practica/${area.slug}`} />
      <section className="py-24 md:py-32">
        <div className="container-page max-w-3xl">
          <Link href="/areas-de-practica" className="text-gold text-xs uppercase tracking-widest">
            ← Áreas de Práctica
          </Link>
          <h1 className="section-heading text-3xl md:text-5xl text-cream mt-5 mb-8">{area.title}</h1>
          <div
            className="prose-legal text-cream/80 leading-relaxed [&_h2]:font-display [&_h2]:text-gold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_strong]:text-cream"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          <div className="mt-12 border-t border-white/10 pt-8">
            <Link href="/contacto" className="btn-gold">
              Solicitar asesoría en {area.title}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const areas = getPracticeAreas();
  return {
    paths: areas.map((area) => ({ params: { slug: area.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const area = getPracticeAreaBySlug(params.slug);
  const contentHtml = await markdownToHtml(area.body);
  return {
    props: { area, contentHtml },
  };
}

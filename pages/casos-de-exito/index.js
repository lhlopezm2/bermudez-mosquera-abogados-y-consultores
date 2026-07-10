import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import CaseStudyCard from '@/components/CaseStudyCard';
import { getCaseStudies } from '@/lib/content';

export default function CasosDeExito({ cases }) {
  return (
    <>
      <Seo
        title="Casos de Éxito"
        description="Resultados que respaldan nuestra experiencia en derecho civil, administrativo, empresarial y contratación estatal."
        path="/casos-de-exito"
      />
      <section className="py-24 md:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Resultados"
            title="Casos de Éxito"
            text="Estos casos se presentan de forma anonimizada, en cumplimiento de la reserva profesional que protege a todos nuestros clientes."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((item) => (
              <CaseStudyCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      cases: getCaseStudies(),
    },
  };
}

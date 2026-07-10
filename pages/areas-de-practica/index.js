import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import PracticeAreaCard from '@/components/PracticeAreaCard';
import { getPracticeAreas } from '@/lib/content';

export default function AreasDePractica({ areas }) {
  return (
    <>
      <Seo
        title="Áreas de Práctica"
        description="Derecho civil, administrativo, empresarial, propiedad horizontal y contratación estatal en Cartago y el Valle del Cauca."
        path="/areas-de-practica"
      />
      <section className="py-24 md:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Nuestra experiencia"
            title="Áreas de Práctica"
            text="Combinamos especialización técnica y visión estratégica para acompañar a nuestros clientes en cada uno de estos frentes jurídicos."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <PracticeAreaCard key={area.slug} area={area} />
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
      areas: getPracticeAreas(),
    },
  };
}

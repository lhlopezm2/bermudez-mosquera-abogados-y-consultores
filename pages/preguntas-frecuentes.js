import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import FaqAccordion from '@/components/FaqAccordion';
import { getFaqContent } from '@/lib/content';

export default function PreguntasFrecuentes({ faq }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <Seo title="Preguntas Frecuentes" description={faq.subtitle} path="/preguntas-frecuentes" jsonLd={jsonLd} />
      <section className="py-24 md:py-32">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Ayuda" title={faq.title} text={faq.subtitle} />
          <FaqAccordion items={faq.items} />
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      faq: getFaqContent(),
    },
  };
}

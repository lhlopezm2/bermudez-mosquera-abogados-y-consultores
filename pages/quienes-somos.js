import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import { getQuienesSomosContent } from '@/lib/content';

export default function QuienesSomos({ content }) {
  return (
    <>
      <Seo title="Quiénes Somos" description={content.intro} path="/quienes-somos" />

      <section className="py-24 md:py-32">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Nuestra firma" title={content.title} />
          <p className="text-cream/80 leading-relaxed mb-6">{content.intro}</p>
          <p className="text-cream/70 leading-relaxed">{content.history}</p>
        </div>
      </section>

      <section className="py-20 bg-graphite-light/40">
        <div className="container-page grid md:grid-cols-2 gap-10">
          <div className="border border-white/10 p-8 rounded-sm bg-graphite">
            <h3 className="font-display text-gold text-xl mb-4">Misión</h3>
            <p className="text-cream/70 leading-relaxed">{content.mission}</p>
          </div>
          <div className="border border-white/10 p-8 rounded-sm bg-graphite">
            <h3 className="font-display text-gold text-xl mb-4">Visión</h3>
            <p className="text-cream/70 leading-relaxed">{content.vision}</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Lo que nos guía" title="Nuestros valores" align="center" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.map((value) => (
              <div key={value.title} className="border border-white/10 p-7 rounded-sm bg-graphite-light text-center">
                <h4 className="font-display text-gold text-lg mb-3">{value.title}</h4>
                <p className="text-sm text-cream/70 leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-graphite-light/40">
        <div className="container-page">
          <SectionHeading eyebrow="Equipo" title="Socios fundadores" text={content.founders_intro} />
          <div className="grid md:grid-cols-2 gap-8">
            {content.founders.map((founder) => (
              <div key={founder.role} className="border border-white/10 p-8 rounded-sm bg-graphite">
                <h3 className="font-display text-cream text-xl">{founder.role}</h3>
                <p className="text-gold text-sm uppercase tracking-widest mt-1 mb-4">{founder.focus}</p>
                <p className="text-cream/70 text-sm leading-relaxed">{founder.bio}</p>
              </div>
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
      content: getQuienesSomosContent(),
    },
  };
}

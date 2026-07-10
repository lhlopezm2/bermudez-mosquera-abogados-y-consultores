import Image from 'next/image';
import Link from 'next/link';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import PracticeAreaCard from '@/components/PracticeAreaCard';
import BlogCard from '@/components/BlogCard';
import settings from '@/content/site/settings.json';
import {
  getHomeContent,
  getPracticeAreas,
  getBlogPosts,
} from '@/lib/content';

export default function Home({ home, practiceAreas, latestPosts }) {
  return (
    <>
      <Seo title="Inicio" description={home.hero_subtitle} path="/" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-graphite">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <Image src={settings.logo} alt="" fill className="object-cover" />
        </div>
        <div className="container-page relative py-28 md:py-36 text-center fade-in-up">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold">
            {home.hero_eyebrow}
          </span>
          <h1 className="section-heading text-4xl md:text-6xl text-cream mt-5 leading-tight">
            {home.hero_title}
          </h1>
          <p className="text-cream/70 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            {home.hero_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/contacto" className="btn-gold">
              {home.hero_cta_primary}
            </Link>
            <Link href="/areas-de-practica" className="btn-outline">
              {home.hero_cta_secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-graphite-light">
        <div className="container-page py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {home.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-gold text-3xl md:text-4xl">{stat.number}</div>
              <div className="text-cream/60 text-xs md:text-sm uppercase tracking-widest mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Por qué elegirnos"
            title="Una firma boutique con estándares de firma internacional"
            align="center"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.value_props.map((prop) => (
              <div key={prop.title} className="border border-white/10 p-7 rounded-sm bg-graphite-light">
                <h3 className="font-display text-gold text-lg mb-3">{prop.title}</h3>
                <p className="text-sm text-cream/70 leading-relaxed">{prop.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="py-20 md:py-28 bg-graphite-light/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Áreas de práctica"
            title="Asesoría jurídica especializada"
            text="Cubrimos las áreas del derecho más relevantes para personas, empresas y entidades públicas en Cartago y el Valle del Cauca."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.slice(0, 6).map((area) => (
              <PracticeAreaCard key={area.slug} area={area} />
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Blog jurídico"
            title="Contenido de valor para tomar mejores decisiones legales"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="btn-outline">
              Ver todos los artículos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-gold-gradient">
        <div className="container-page text-center">
          <h2 className="section-heading text-3xl md:text-4xl text-graphite">
            {home.cta_banner_title}
          </h2>
          <p className="text-graphite/80 mt-4 max-w-xl mx-auto">{home.cta_banner_text}</p>
          <Link
            href="/contacto"
            className="inline-flex mt-8 px-8 py-3 bg-graphite text-gold uppercase text-xs tracking-widest font-semibold rounded-sm hover:bg-graphite-light transition-colors"
          >
            Contáctenos ahora
          </Link>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      home: getHomeContent(),
      practiceAreas: getPracticeAreas(),
      latestPosts: getBlogPosts().slice(0, 3),
    },
  };
}

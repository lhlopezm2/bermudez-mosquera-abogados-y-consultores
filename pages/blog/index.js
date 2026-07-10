import { useMemo, useState } from 'react';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import BlogCard from '@/components/BlogCard';
import { getBlogPosts, getBlogCategories } from '@/lib/content';

export default function Blog({ posts, categories }) {
  const [activeCategory, setActiveCategory] = useState('Todas');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'Todas') return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <>
      <Seo
        title="Blog Jurídico"
        description="Artículos de análisis jurídico en derecho civil, administrativo, empresarial, propiedad horizontal y contratación estatal."
        path="/blog"
      />
      <section className="py-24 md:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Blog jurídico"
            title="Contenido de valor jurídico"
            text="Análisis y guías prácticas para tomar mejores decisiones legales en Cartago y el Valle del Cauca."
          />

          <div className="flex gap-3 flex-wrap mb-10">
            {['Todas', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? 'border-gold bg-gold text-graphite'
                    : 'border-white/20 text-cream/70 hover:border-gold/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
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
      posts: getBlogPosts(),
      categories: getBlogCategories(),
    },
  };
}

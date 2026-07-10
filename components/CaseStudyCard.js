import Link from 'next/link';

export default function CaseStudyCard({ item }) {
  return (
    <Link
      href={`/casos-de-exito/${item.slug}`}
      className="group block border border-white/10 hover:border-gold/50 bg-graphite-light p-8 rounded-sm transition-colors"
    >
      <span className="text-xs uppercase tracking-widest text-gold">{item.sector}</span>
      <h3 className="font-display text-xl text-cream group-hover:text-gold transition-colors mt-3 mb-3">
        {item.title}
      </h3>
      <p className="text-sm text-cream/70 leading-relaxed mb-4">{item.result}</p>
      <span className="text-xs uppercase tracking-widest text-gold">Ver caso →</span>
    </Link>
  );
}

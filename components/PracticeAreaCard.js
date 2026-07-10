import Link from 'next/link';

export default function PracticeAreaCard({ area }) {
  return (
    <Link
      href={`/areas-de-practica/${area.slug}`}
      className="group block border border-white/10 hover:border-gold/50 bg-graphite-light p-8 rounded-sm transition-colors"
    >
      <h3 className="font-display text-xl text-cream group-hover:text-gold transition-colors mb-3">
        {area.title}
      </h3>
      <p className="text-sm text-cream/70 leading-relaxed mb-4">{area.summary}</p>
      <span className="text-xs uppercase tracking-widest text-gold">Ver más →</span>
    </Link>
  );
}

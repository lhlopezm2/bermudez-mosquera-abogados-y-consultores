export default function SectionHeading({ eyebrow, title, text, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-2xl mb-12 ${alignment}`}>
      {eyebrow && (
        <span className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">
          {eyebrow}
        </span>
      )}
      <h2 className="section-heading text-3xl md:text-4xl text-cream mt-3">{title}</h2>
      {text && <p className="text-cream/70 mt-4 leading-relaxed">{text}</p>}
    </div>
  );
}

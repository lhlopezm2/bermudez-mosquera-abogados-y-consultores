import { useState } from 'react';

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-white/10 border-t border-b border-white/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              className="w-full flex items-center justify-between py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span className="font-display text-cream text-base md:text-lg pr-4">
                {item.question}
              </span>
              <span className="text-gold text-2xl leading-none shrink-0">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <p className="pb-5 text-cream/70 text-sm leading-relaxed">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}

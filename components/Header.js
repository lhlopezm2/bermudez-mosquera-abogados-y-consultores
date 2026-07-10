import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import settings from '@/content/site/settings.json';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/quienes-somos', label: 'Quiénes Somos' },
  { href: '/areas-de-practica', label: 'Áreas de Práctica' },
  { href: '/casos-de-exito', label: 'Casos de Éxito' },
  { href: '/blog', label: 'Blog Jurídico' },
  { href: '/preguntas-frecuentes', label: 'Preguntas Frecuentes' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-graphite/95 backdrop-blur border-b border-white/10">
      <div className="container-page flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src={settings.logo}
            alt={settings.firm_name}
            width={44}
            height={44}
            className="rounded-sm"
            priority
          />
          <span className="font-display text-sm md:text-base tracking-wide text-cream leading-tight">
            {settings.short_name}
            <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
              Abogados &amp; Consultores
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cream/90 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contacto" className="btn-gold">
            Agendar Cita
          </Link>
        </div>

        <button
          aria-label="Abrir menú"
          className="lg:hidden text-cream p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-white/10 bg-graphite">
          <div className="container-page flex flex-col py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/90 hover:text-gold text-sm"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contacto" className="btn-gold w-full mt-2" onClick={() => setOpen(false)}>
              Agendar Cita
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

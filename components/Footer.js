import Link from 'next/link';
import Image from 'next/image';
import settings from '@/content/site/settings.json';
import { withBasePath } from '@/lib/basePath';

function whatsappLink(number, message) {
  const text = encodeURIComponent(message || '');
  return `https://wa.me/${number}?text=${text}`;
}

const SOCIAL_ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.06 1.97.24 2.43.42.6.24 1.03.52 1.48.97.45.45.73.88.97 1.48.18.46.36 1.26.42 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.24 1.97-.42 2.43-.24.6-.52 1.03-.97 1.48-.45.45-.88.73-1.48.97-.46.18-1.26.36-2.43.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.97-.24-2.43-.42-.6-.24-1.03-.52-1.48-.97-.45-.45-.73-.88-.97-1.48-.18-.46-.36-1.26-.42-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.06-1.17.24-1.97.42-2.43.24-.6.52-1.03.97-1.48.45-.45.88-.73 1.48-.97.46-.18 1.26-.36 2.43-.42C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.14 0-3.5.01-4.73.07-1.02.05-1.58.22-1.94.36-.49.19-.84.42-1.2.79-.37.36-.6.71-.79 1.2-.14.36-.31.92-.36 1.94C3.01 8.5 3 8.86 3 12s.01 3.5.07 4.73c.05 1.02.22 1.58.36 1.94.19.49.42.84.79 1.2.36.37.71.6 1.2.79.36.14.92.31 1.94.36 1.23.06 1.59.07 4.73.07s3.5-.01 4.73-.07c1.02-.05 1.58-.22 1.94-.36.49-.19.84-.42 1.2-.79.37-.36.6-.71.79-1.2.14-.36.31-.92.36-1.94.06-1.23.07-1.59.07-4.73s-.01-3.5-.07-4.73c-.05-1.02-.22-1.58-.36-1.94a3.2 3.2 0 0 0-.79-1.2 3.2 3.2 0 0 0-1.2-.79c-.36-.14-.92-.31-1.94-.36C15.5 4.01 15.14 4 12 4zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zm5.85-2.6a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.3-1.4 1.5-1.4h1.4V5.2C15.9 5.1 15 5 13.9 5c-2.4 0-4 1.4-4 4v2h-2.4v2.8h2.4V21h3.6z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.5 4.78 5.76V21H18v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.55-2.3 3.16V21H10V9z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M14.5 3h2.1c.15 1.42.86 2.62 2.4 3.44v2.2c-1.1-.03-2.1-.36-2.9-.94v6.02c0 3.15-2.06 5.28-5.06 5.28-2.9 0-5.04-2.03-5.04-4.9 0-2.86 2.34-4.9 5.14-4.9.28 0 .58.02.86.07v2.28a2.7 2.7 0 0 0-.86-.15c-1.4 0-2.5 1.05-2.5 2.4 0 1.35 1.05 2.4 2.45 2.4 1.5 0 2.6-1.15 2.6-2.85V3z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M21.6 7.2s-.2-1.5-.85-2.15c-.8-.85-1.7-.85-2.1-.9C15.9 4 12 4 12 4s-3.9 0-6.65.15c-.4.05-1.3.05-2.1.9C2.6 5.7 2.4 7.2 2.4 7.2S2.25 9 2.25 10.75v1.5C2.25 14 2.4 15.8 2.4 15.8s.2 1.5.85 2.15c.8.85 1.85.82 2.32.91C7.1 19 12 19 12 19s3.9 0 6.65-.15c.4-.05 1.3-.05 2.1-.9.65-.65.85-2.15.85-2.15s.15-1.8.15-3.55v-1.5c0-1.75-.15-3.55-.15-3.55zM9.95 14.6V9.4l5.6 2.6-5.6 2.6z" />
    </svg>
  ),
};

export default function Footer() {
  const socialEntries = Object.entries(settings.social || {}).filter(([, url]) => url);

  return (
    <footer className="bg-graphite-light border-t border-white/10 mt-24">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Image src={withBasePath(settings.logo)} alt={settings.firm_name} width={56} height={56} className="rounded-sm" />
            <span className="font-display text-cream">{settings.firm_name}</span>
          </div>
          <p className="text-sm text-cream/70 max-w-sm">{settings.footer_note}</p>
          {socialEntries.length > 0 && (
            <div className="flex gap-3 mt-5">
              {socialEntries.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-graphite transition-colors"
                >
                  {SOCIAL_ICONS[key] || null}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-cream font-display mb-4 text-sm uppercase tracking-widest">Navegación</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href="/quienes-somos" className="hover:text-gold">Quiénes Somos</Link></li>
            <li><Link href="/areas-de-practica" className="hover:text-gold">Áreas de Práctica</Link></li>
            <li><Link href="/casos-de-exito" className="hover:text-gold">Casos de Éxito</Link></li>
            <li><Link href="/blog" className="hover:text-gold">Blog Jurídico</Link></li>
            <li><Link href="/preguntas-frecuentes" className="hover:text-gold">Preguntas Frecuentes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-display mb-4 text-sm uppercase tracking-widest">Contacto</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>{settings.address_line}</li>
            <li>
              <a href={`tel:+${settings.whatsapp_number}`} className="hover:text-gold">
                {settings.phone_display}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email_contact}`} className="hover:text-gold break-all">
                {settings.email_contact}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(settings.whatsapp_number, settings.whatsapp_message)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                Escribir por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col md:flex-row justify-between gap-2 text-xs text-cream/50">
          <span>© {new Date().getFullYear()} {settings.firm_name}. Todos los derechos reservados.</span>
          <span>{settings.city}</span>
        </div>
      </div>
    </footer>
  );
}

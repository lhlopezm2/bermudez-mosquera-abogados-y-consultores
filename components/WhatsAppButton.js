import settings from '@/content/site/settings.json';

export default function WhatsAppButton() {
  const text = encodeURIComponent(settings.whatsapp_message || '');
  const href = `https://wa.me/${settings.whatsapp_number}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/40 hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#0b0b0c">
        <path d="M16.02 3C9.4 3 4.02 8.38 4.02 15c0 2.3.66 4.46 1.8 6.3L4 29l7.9-1.76A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.62 28 15S22.64 3 16.02 3zm0 21.9c-2 0-3.9-.56-5.5-1.55l-.4-.24-4.4.98.95-4.28-.26-.44a9.8 9.8 0 0 1-1.5-5.27c0-5.46 4.5-9.9 10.11-9.9 5.6 0 10.1 4.44 10.1 9.9 0 5.46-4.5 9.8-10.1 9.8zm5.6-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.15-.15.34-.4.5-.6.16-.2.22-.35.34-.58.11-.23.05-.44-.05-.6-.1-.15-.6-1.44-.82-1.97-.22-.53-.44-.46-.6-.47h-.51c-.17 0-.44.06-.68.32-.24.26-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.13.17 1.78 2.72 4.33 3.7 2.55.99 2.55.66 3.01.62.46-.04 1.49-.6 1.7-1.19.21-.58.21-1.08.15-1.19-.06-.11-.2-.17-.5-.32z" />
      </svg>
    </a>
  );
}

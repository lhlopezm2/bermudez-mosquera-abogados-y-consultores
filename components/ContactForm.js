import { useState } from 'react';
import settings from '@/content/site/settings.json';
import contacto from '@/content/site/contacto.json';

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    if (data.get('_gotcha')) {
      return;
    }

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Nueva solicitud de ${data.get('name') || ''}`);
      const body = encodeURIComponent(
        `Nombre: ${data.get('name')}\nCorreo: ${data.get('email')}\nTeléfono: ${data.get('phone')}\nServicio de interés: ${data.get('service')}\n\nMensaje:\n${data.get('message')}`
      );
      window.location.href = `mailto:${settings.email_contact}?subject=${subject}&body=${body}`;
      setStatus('success');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setError('No pudimos enviar su solicitud. Intente de nuevo o escríbanos por WhatsApp.');
      }
    } catch {
      setStatus('error');
      setError('No pudimos enviar su solicitud. Intente de nuevo o escríbanos por WhatsApp.');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-gold/40 bg-graphite-light p-8 text-center rounded-sm">
        <p className="text-gold font-display text-xl mb-2">¡Solicitud enviada!</p>
        <p className="text-cream/80 text-sm">{contacto.form_success_message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-cream/60 mb-2">
            Nombre completo *
          </label>
          <input
            required
            type="text"
            name="name"
            className="w-full bg-transparent border border-white/20 focus:border-gold outline-none px-4 py-3 text-sm text-cream rounded-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-cream/60 mb-2">
            Correo electrónico *
          </label>
          <input
            required
            type="email"
            name="email"
            className="w-full bg-transparent border border-white/20 focus:border-gold outline-none px-4 py-3 text-sm text-cream rounded-sm"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-cream/60 mb-2">
            Teléfono / WhatsApp
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full bg-transparent border border-white/20 focus:border-gold outline-none px-4 py-3 text-sm text-cream rounded-sm"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-cream/60 mb-2">
            Servicio de interés
          </label>
          <select
            name="service"
            defaultValue=""
            className="w-full bg-graphite border border-white/20 focus:border-gold outline-none px-4 py-3 text-sm text-cream rounded-sm"
          >
            <option value="" disabled>
              Seleccione una opción
            </option>
            {contacto.services_options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-cream/60 mb-2">
          Cuéntenos brevemente su caso *
        </label>
        <textarea
          required
          name="message"
          rows={5}
          className="w-full bg-transparent border border-white/20 focus:border-gold outline-none px-4 py-3 text-sm text-cream rounded-sm"
        />
      </div>

      {status === 'error' && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={status === 'loading'} className="btn-gold w-full md:w-auto">
        {status === 'loading' ? 'Enviando…' : 'Enviar solicitud'}
      </button>
    </form>
  );
}

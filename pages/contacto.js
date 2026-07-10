import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import settings from '@/content/site/settings.json';
import { getContactoContent } from '@/lib/content';

function whatsappLink(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message || '')}`;
}

export default function Contacto({ content }) {
  return (
    <>
      <Seo title="Contacto" description={content.subtitle} path="/contacto" />
      <section className="py-24 md:py-32">
        <div className="container-page grid lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Hablemos" title={content.title} text={content.subtitle} />

            <div className="space-y-6 mt-2">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gold mb-1">Ubicación</h4>
                <p className="text-cream/80">{settings.address_line}</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gold mb-1">Teléfono / WhatsApp</h4>
                <a href={`tel:+${settings.whatsapp_number}`} className="text-cream/80 hover:text-gold">
                  {settings.phone_display}
                </a>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gold mb-1">Correo electrónico</h4>
                <a href={`mailto:${settings.email_contact}`} className="text-cream/80 hover:text-gold break-all">
                  {settings.email_contact}
                </a>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gold mb-1">Horario de atención</h4>
                <p className="text-cream/80">{settings.schedule}</p>
              </div>
            </div>

            <div className="mt-10 border border-gold/30 rounded-sm p-6 bg-graphite-light">
              <h4 className="font-display text-cream text-lg mb-2">{content.scheduling_title}</h4>
              <p className="text-sm text-cream/70 leading-relaxed mb-5">{content.scheduling_text}</p>
              <a
                href={whatsappLink(settings.whatsapp_number, settings.whatsapp_message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Agendar por WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="border border-white/10 rounded-sm p-8 bg-graphite-light">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      content: getContactoContent(),
    },
  };
}

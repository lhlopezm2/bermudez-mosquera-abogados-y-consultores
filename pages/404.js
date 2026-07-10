import Link from 'next/link';
import Seo from '@/components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" path="/404" />
      <section className="py-32 text-center">
        <div className="container-page">
          <h1 className="section-heading text-5xl text-gold mb-4">404</h1>
          <p className="text-cream/70 mb-8">La página que busca no existe o fue movida.</p>
          <Link href="/" className="btn-gold">
            Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
}

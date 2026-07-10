import Head from 'next/head';
import settings from '@/content/site/settings.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bermudezmosquera.example.com';

export default function Seo({
  title,
  description,
  path = '/',
  image,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${settings.firm_name}` : settings.firm_name;
  const desc = description || settings.tagline;
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}${settings.logo}`;

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: settings.firm_name,
    image: ogImage,
    url: SITE_URL,
    telephone: settings.phone_display,
    email: settings.email_contact,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cartago',
      addressRegion: 'Valle del Cauca',
      addressCountry: 'CO',
    },
    sameAs: Object.values(settings.social || {}).filter(Boolean),
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd || organizationJsonLd) }}
      />
    </Head>
  );
}

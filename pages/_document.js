import { Html, Head, Main, NextScript } from 'next/document';
import settings from '@/content/site/settings.json';
import { withBasePath } from '@/lib/basePath';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="theme-color" content="#0b0b0c" />
        <link rel="icon" href={withBasePath(settings.logo)} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

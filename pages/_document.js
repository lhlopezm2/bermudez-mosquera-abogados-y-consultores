import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="theme-color" content="#0b0b0c" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/logo.jpg`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

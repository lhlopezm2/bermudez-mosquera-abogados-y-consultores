import { Playfair_Display, Montserrat } from 'next/font/google';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${playfair.variable} ${montserrat.variable} font-body`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

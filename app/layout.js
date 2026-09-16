import { Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE = 'https://krishnateja-portfolio.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'Krishna Teja — Performance Video Editor & Ad Creative Strategist',
  description:
    'Performance video editor in Bengaluru. Hook-first ad creatives for Meta and Google across six fintech products and seven Indian languages, plus brand films and short-form.',
  keywords: [
    'performance video editor',
    'ad creative strategist',
    'Meta ads video editor',
    'UGC ad editor India',
    'Bengaluru video editor',
    'hook based editing',
  ],
  authors: [{ name: 'Krishna Teja T' }],
  openGraph: {
    title: 'Krishna Teja — Performance Video Editor',
    description:
      'Hook-first video creative for Meta & Google. Six fintech products, seven Indian languages, plus brand and short-form work.',
    url: SITE,
    siteName: 'Krishna Teja',
    images: [{ url: '/media/showreel-poster.jpg', width: 720, height: 1280 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krishna Teja — Performance Video Editor',
    description: 'Hook-first video creative for Meta & Google — fintech ads, brand films and short-form.',
    images: ['/media/showreel-poster.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#08080A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${mono.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

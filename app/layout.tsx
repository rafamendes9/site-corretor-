import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ricardo Mendes - Corretor de Imóveis Recife',
  description: 'Portfolio profissional de Ricardo Mendes, corretor de imóveis em Recife. Especializado em vendas, locações e consultoria imobiliária.',
  keywords: 'corretor, imóveis, recife, venda, locação',
  authors: [{ name: 'Ricardo Mendes' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://site-corretor-eight.vercel.app',
    title: 'Ricardo Mendes - Corretor de Imóveis Recife',
    description: 'Especialista em imóveis em Recife - Venda, locação e consultoria',
    images: [
      {
        url: 'https://site-corretor-eight.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ricardo Mendes - Corretor de Imóveis Recife',
    description: 'Especialista em imóveis em Recife',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1B2B4B" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

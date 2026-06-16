import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rafaell Mendes - Corretor de Imóveis Recife',
  description: 'Portfolio profissional de Rafaell Mendes, corretor de imóveis em Recife. Especializado em vendas, locações e consultoria imobiliária.',
  keywords: 'corretor, imóveis, recife, venda, locação',
  authors: [{ name: 'Rafaell Mendes' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://rafaellcorretor.vercel.app',
    title: 'Rafaell Mendes - Corretor de Imóveis Recife',
    description: 'Especialista em imóveis em Recife - Venda, locação e consultoria',
    images: [
      {
        url: 'https://rafaellcorretor.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafaell Mendes - Corretor de Imóveis Recife',
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

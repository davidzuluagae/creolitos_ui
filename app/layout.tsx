import '@/app/ui/global.css';
import { montserrat } from '@/app/ui/fonts';
import Providers from '@/app/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadDevFonts = process.env.NODE_ENV !== 'production';

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {loadDevFonts ? (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400;500;700&display=swap"
              rel="stylesheet"
            />
          </>
        ) : null}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

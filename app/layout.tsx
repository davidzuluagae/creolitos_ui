'use client';
import '@/app/ui/global.css';
import { dynaPuff } from '@/app/ui/fonts';
import { MDXProvider } from '@mdx-js/react';
import { useMDXComponents } from '../mdx-components';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${dynaPuff.className} antialiased`}>
        <MDXProvider components={useMDXComponents()}>
          {children}
        </MDXProvider>
      </body>
    </html>
  );
}

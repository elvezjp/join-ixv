import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/modal.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IXV (イクシブ) - クローズドβ申し込み',
  description: 'IXVは、AIを活用した次世代の開発ツール。チーム開発をよりスマートに、より効率的に。',
  metadataBase: new URL('https://elvezjp.github.io/join-ixv'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
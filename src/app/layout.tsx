/**
 * @file src/app/layout.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月18日
 * @version 0.0.3
 * @description ルートレイアウト。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/modal.css';
import '../styles/slider.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IXV (イクシブ) - クローズドβ版お申込み',
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
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
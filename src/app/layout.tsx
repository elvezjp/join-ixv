/**
 * @file src/app/layout.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description ルートレイアウト。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/modal.css';
import '../styles/slider.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { NavigationPanelProvider } from '@/contexts/NavigationPanelContext';
import { AssistantPanelProvider } from '@/contexts/AssistantPanelContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IXV (イクシブ) - クローズドβ版お申込み',
  description: 'IXVは、AIを活用した次世代の開発ツール。チーム開発をよりスマートに、より効率的に。',
  metadataBase: new URL('https://elvezjp.github.io/join-ixv'),
};

/**
 * ルートレイアウトコンポーネント。
 * @param {Object} props - コンポーネントのプロパティ。
 * @param {React.ReactNode} props.children - レイアウト内に表示される子要素。
 * @returns {JSX.Element} ルートレイアウトのJSX要素。
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <LanguageProvider>
          <NavigationPanelProvider>
            <AssistantPanelProvider>
            <Header />
            <main className="flex-1 min-h-screen">
              {children}
            </main>
            <Footer />
            </AssistantPanelProvider>
          </NavigationPanelProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
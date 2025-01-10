/**
 * @file src/components/Header.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description ヘッダーのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

'use client'

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import ja from '@/locales/ja';
import en from '@/locales/en';

/**
 * ヘッダーのコンポーネント。
 * @returns ヘッダーのコンポーネント。
 */
export default function Header() {
  const { language } = useLanguage();
  const t = language === 'ja' ? ja : en;

  return (
  <header className="bg-gradient-to-r from-[#1a365d] to-[#2563eb] text-white">
    <div className="container mx-auto px-6 pt-6">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold mr-auto">{t.header.logo}</Link>
        <div className="flex items-center space-x-6">
          <LanguageSwitcher />
          <Link
            href="#signup"
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold cursor-not-allowed opacity-50"
          >
            {t.header.signup}
          </Link>
        </div>
      </nav>
    </div>
  </header>
  );
}
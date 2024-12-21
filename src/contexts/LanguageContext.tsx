/**
 * @file src/contexts/LanguageContext.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description 言語コンテキスト。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


type Language = 'ja' | 'en';

/**
 * 言語コンテキストの型。
 */
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * 言語コンテキストプロバイダー。
 * @param children - 子コンポーネント。
 * @returns 言語コンテキストプロバイダー。
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    // クライアントサイドでのみlocalStorageにアクセス
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return (saved as Language) || 'ja';
    }
    return 'ja';
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // クライアントサイドレンダリング前にデフォルト言語で表示されるのを防ぐため、サーバーサイドレンダリング時は何も表示しない
  if (!isClient) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * 言語コンテキストを使用するためのフック。
 * @returns 言語コンテキスト。
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
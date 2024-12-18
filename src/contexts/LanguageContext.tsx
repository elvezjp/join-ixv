/**
 * @file src/contexts/LanguageContext.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月18日
 * @version 0.0.3
 * @description 言語コンテキスト。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
'use client'

import { createContext, useContext, useState, ReactNode } from 'react';


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
  const [language, setLanguage] = useState<Language>('ja');

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
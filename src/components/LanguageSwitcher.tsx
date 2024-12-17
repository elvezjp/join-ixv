/**
 * @file src/components/LanguageSwitcher.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月17日
 * @version 0.0.2
 * @description 言語切り替えコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
      className="fixed top-4 right-4 bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-blue-50 transition"
    >
      {language === 'ja' ? '日本語' : 'English'}
    </button>
  );
}
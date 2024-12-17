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
    <div className="fixed top-6 right-6 flex items-center">
      <div className="flex items-center space-x-2">
        <button
          className={`px-3 py-1 rounded-full border ${language === 'ja' ? 'bg-blue-600 text-white border-white' : 'bg-gray-200 text-gray-500 border-transparent'}`}
          onClick={() => setLanguage('ja')}
        >
          JP
        </button>
        <button
          className={`px-3 py-1 rounded-full border ${language === 'en' ? 'bg-blue-600 text-white border-white' : 'bg-gray-200 text-gray-500 border-transparent'}`}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
      </div>
    </div>
  );
}
/**
 * @file src/components/LanguageSwitcher.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月18日
 * @version 0.0.3
 * @description 言語切り替えコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">
        日本語
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={language === 'en'}
          onChange={() => setLanguage(language === 'en' ? 'ja' : 'en')}
        />
        <div className="w-16 h-8 bg-white border-1 border-gray-200 rounded-full transition-all duration-300">
          <div
            className={`absolute top-1 left-1 bg-blue-600 rounded-full h-6 w-6 transform transition-transform duration-300 ${
              language === 'en' ? 'translate-x-8' : ''
            }`}
          ></div>
        </div>
      </label>
      <span className="text-sm font-medium">
        English
      </span>
    </div>
  );
}
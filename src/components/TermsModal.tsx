/**
 * @file src/components/TermsModal.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description 利用規約のモーダルのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import { useEffect, useCallback, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ja from '@/locales/ja';
import en from '@/locales/en';

// 利用規約のモーダルのプロパティ型
interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 利用規約のモーダルのコンポーネント。
 * @param isOpen - モーダルが開いているかどうか。
 * @param onClose - モーダルを閉じる関数。
 * @returns 利用規約のモーダルのコンポーネント。
 */
export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const { language } = useLanguage();
  const t = language === 'ja' ? ja : en;
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>('exited');

  useEffect(() => {
    if (isOpen && animationState === 'exited') {
      setAnimationState('entering');
      setTimeout(() => {
        setAnimationState('entered');
      }, 10);
    } else if (!isOpen && (animationState === 'entering' || animationState === 'entered')) {
      setAnimationState('exiting');
      setTimeout(() => {
        setAnimationState('exited');
      }, 300);
    }
  }, [isOpen, animationState]);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (animationState === 'exited' && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 modal-backdrop ${animationState}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className={`modal-content text-black bg-white rounded-lg w-full max-w-2xl ${animationState}`}>
          <div className="modal-header p-6 border-b">
            <h2 className="text-2xl font-bold">{t.termsModal.title}</h2>
          </div>

          <div className="modal-body p-6">
            <p className="mb-6">{t.termsModal.introduction}</p>

            <h3 className="font-bold mt-6">{t.termsModal.sections[0].title}</h3>
            <p>{t.termsModal.sections[0].items[0]}</p>

            <h3 className="font-bold mt-6">{t.termsModal.sections[1].title}</h3>
            <ol className="list-decimal pl-6">
              <li>{t.termsModal.sections[1].items[0]}</li>
              <li>{t.termsModal.sections[1].items[1]}</li>
              <ul className="list-disc pl-6">
                <li>{t.termsModal.sections[1].subItems[0]}</li>
                <li>{t.termsModal.sections[1].subItems[1]}</li>
                <li>{t.termsModal.sections[1].subItems[2]}</li>
              </ul>
            </ol>

            <h3 className="font-bold mt-6">{t.termsModal.sections[2].title}</h3>
            <ol className="list-decimal pl-6">
              <li>{t.termsModal.sections[2].items[0]}</li>
              <li>{t.termsModal.sections[2].items[1]}</li>
            </ol>

            <h3 className="font-bold mt-6">{t.termsModal.sections[3].title}</h3>
            <ol className="list-decimal pl-6">
              <li>{t.termsModal.sections[3].items[0]}</li>
              <li>{t.termsModal.sections[3].items[1]}</li>
            </ol>

            <h3 className="font-bold mt-6">{t.termsModal.sections[4].title}</h3>
            <ol className="list-decimal pl-6">
              <li>{t.termsModal.sections[4].items[0]}</li>
              <li>{t.termsModal.sections[4].items[1]}</li>
            </ol>

            <h3 className="font-bold mt-6">{t.termsModal.sections[5].title}</h3>
            <ol className="list-decimal pl-6">
              <li>{t.termsModal.sections[5].items[0]}</li>
              <li>{t.termsModal.sections[5].items[1]}</li>
            </ol>

            <h3 className="font-bold mt-6">{t.termsModal.sections[6].title}</h3>
            <ol className="list-decimal pl-6">
              <li>{t.termsModal.sections[6].items[0]}</li>
              <li>{t.termsModal.sections[6].items[1]}</li>
            </ol>

            <h3 className="font-bold mt-6">{t.termsModal.sections[7].title}</h3>
            <ol className="list-decimal pl-6">
              <li>{t.termsModal.sections[7].items[0]}</li>
              <li>{t.termsModal.sections[7].items[1]}</li>
            </ol>

            <h3 className="font-bold mt-6">{t.termsModal.sections[8].title}</h3>
            <p>{t.termsModal.sections[8].items[0]}</p>

            <div className="mt-8 text-right">
              <p className="text-gray-600">{t.termsModal.footer.date}</p>
            </div>
          </div>

          <div className="modal-footer border-t p-4 flex justify-end bg-gray-50">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {t.termsModal.closeButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
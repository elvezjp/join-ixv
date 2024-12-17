/**
 * @file src/components/NoticeModal.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月15日
 * @version 0.0.1
 * @description お申込みに際してのご留意点のモーダルのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import { useEffect, useCallback, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ja from '@/locales/ja';
import en from '@/locales/en';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NoticeModal({ isOpen, onClose }: NoticeModalProps) {
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
        <div className={`modal-content bg-white rounded-lg w-full max-w-2xl ${animationState}`}>
          <div className="modal-header p-6 border-b">
            <h2 className="text-2xl font-bold">{t.noticeModal.title}</h2>
          </div>

          <div className="modal-body p-6">
            <h3 className="font-bold text-lg mb-4">{t.noticeModal.sections[0].title}</h3>
            <p className="mb-6">{t.noticeModal.sections[0].content}</p>

            <h3 className="font-bold text-lg mb-4">{t.noticeModal.sections[1].title}</h3>
            <p className="mb-6">{t.noticeModal.sections[1].content}</p>

            <h3 className="font-bold text-lg mb-4">{t.noticeModal.sections[2].title}</h3>
            <p className="mb-6">{t.noticeModal.sections[2].content}</p>

            <h3 className="font-bold text-lg mb-4">{t.noticeModal.sections[3].title}</h3>
            <p className="mb-6">{t.noticeModal.sections[3].content}</p>
          </div>

          <div className="modal-footer border-t p-4 flex justify-end bg-gray-50">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {t.noticeModal.closeButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
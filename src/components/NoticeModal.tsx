/**
 * @file src/components/NoticeModal.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月15日
 * @version 0.0.1
 * @description お申込みに際してのご留意点のモーダルのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import { useEffect, useCallback, useState } from 'react';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NoticeModal({ isOpen, onClose }: NoticeModalProps) {
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
            <h2 className="text-2xl font-bold">お申込みに際してのご留意点</h2>
          </div>

          <div className="modal-body p-6">
            <h3 className="font-bold text-lg mb-4">クローズドβ版リリースの目的</h3>
            <p className="mb-6">本クローズドβ版は、当社が考える次世代AI開発ツール「IXV」のコンセプトをご確認いただくための準備段階として提供するものです。IXVの機能や可能性を体験していただき、フィードバックをいただくことを目的としています。</p>

            <h3 className="font-bold text-lg mb-4">ご住所や会社名の正確な入力をお願いします</h3>
            <p className="mb-6">お申込みフォームでは会社名、住所、メールアドレスなどの必要事項を正確にご入力ください。正確な情報のご提供により、円滑なご案内が可能となります。</p>

            <h3 className="font-bold text-lg mb-4">利用規約への同意</h3>
            <p className="mb-6">クローズドβ版のご利用には、当社の利用規約へのご同意が必須です。詳細はお申込みフォームに記載されておりますので、内容をご確認のうえご同意ください。</p>

            <h3 className="font-bold text-lg mb-4">ご参加までのプロセス</h3>
            <p>お申込み後、選考を経て参加が確定したお客様には、当社より個別にご連絡を差し上げます。なお、参加基準に関する詳細は非公開とさせていただいておりますので、ご了承ください。</p>
          </div>

          <div className="modal-footer border-t p-4 flex justify-end bg-gray-50">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
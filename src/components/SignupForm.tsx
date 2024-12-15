/**
 * @file src/components/SignupForm.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月14日
 * @version 0.0.1
 * @description 申込みフォームのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import { FormEvent, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import NoticeModal from './NoticeModal';

// 申込みフォームのプロパティ型
interface SignupFormProps {
  onOpenModal: () => void;
}

/**
 * 申込みフォームのコンポーネント。
 * @param onOpenModal - モーダルを開く関数。
 * @returns 申込みフォームのコンポーネント。
 */
export default function SignupForm({ onOpenModal }: SignupFormProps) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        alert('申込みを受け付けました。担当者より追ってご連絡させていただきます。');
        formRef.current.reset();
      }
    } catch (error) {
      console.error('送信エラー:', error);
      alert('申込みの送信に失敗しました。お手数ですが、時間をおいて再度お試しください。');
    }
  };

  return (
    <section id="signup" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-8">
          <img src="/join-ixv/images/IXV-logo.png" alt="IXVロゴ" className="h-64" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-4">クローズドβ版申込み</h2>
        <p className="text-center text-gray-700 mb-4">全ての項目が必須です</p>
        <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto">
          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">
              会社名
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-gray-700 font-semibold mb-2">
              部署名
            </label>
            <input
              type="text"
              id="department"
              name="department"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              氏名
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <div>
              <input
                type="checkbox"
                id="acknowledgement"
                name="acknowledgement"
                className="mr-2"
                required
                checked={isAcknowledged}
                onChange={(e) => setIsAcknowledged(e.target.checked)}
              />
              <label htmlFor="acknowledgement" className="text-gray-700">
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(true)}
                  className="text-blue-600 underline"
                >
                  お申込み留意点
                </button>
                について了解します
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                className="mr-2"
                required
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              <label htmlFor="agreement" className="text-gray-700">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="text-blue-600 underline"
                >
                  利用規約
                </button>
                に同意します
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={`text-white px-6 py-3 rounded-lg font-semibold transition w-full ${
              isAgreed && isAcknowledged ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isAgreed || !isAcknowledged}
          >
            申込む
          </button>
        </form>
        <NoticeModal isOpen={isNoticeModalOpen} onClose={() => setIsNoticeModalOpen(false)} />
      </div>
    </section>
  );
}
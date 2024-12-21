/**
 * @file src/components/SignupForm.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description 申込みフォームのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import { FormEvent, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import NoticeModal from './NoticeModal';
import TermsModal from './TermsModal';
import { useLanguage } from '@/contexts/LanguageContext';
import ja from '@/locales/ja';
import en from '@/locales/en';
import Image from 'next/image';

/**
 * 申込みフォームのコンポーネント。
 * @returns 申込みフォームのコンポーネント。
 */
export default function SignupForm() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { language } = useLanguage();
  const t = language === 'ja' ? ja : en;

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
        alert(t.signup.messages.success);
        formRef.current.reset();
      }
    } catch (error) {
      console.error(error);
      alert(t.signup.messages.error);
    }
  };

  return (
    <section id="signup" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-8">
          <Image
            src="/join-ixv/images/IXV-logo.png"
            alt={t.signup.logoAlt}
            width={256}
            height={256}
            className="h-64 w-auto"
            priority
          />
        </div>
        <h2 className="text-3xl font-bold text-center mb-4">{t.signup.title}</h2>
        <p className="text-center text-gray-700 mb-4">{t.signup.note}</p>
        <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto">
          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">
              {t.signup.form.company}
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
              {t.signup.form.department}
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
              {t.signup.form.phone}
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
              {t.signup.form.email}
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
              {t.signup.form.name}
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
                  {t.signup.form.acknowledgement.button}
                </button>
                {t.signup.form.acknowledgement.text}
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
                  onClick={() => setIsTermsModalOpen(true)}
                  className="text-blue-600 underline"
                >
                  {t.signup.form.agreement.button}
                </button>
                {t.signup.form.agreement.text}
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
            {t.signup.form.submit}
          </button>
        </form>
        <NoticeModal isOpen={isNoticeModalOpen} onClose={() => setIsNoticeModalOpen(false)} />
        <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
      </div>
    </section>
  );
}
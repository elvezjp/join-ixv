/**
 * @file src/app/page.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月17日
 * @version 0.0.2
 * @description メインのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Features from '@/components/Features';
import SignupForm from '@/components/SignupForm';
import TermsModal from '@/components/TermsModal';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen">
      <LanguageSwitcher />
      <Header />
      <Features />
      <SignupForm onOpenModal={handleOpenModal} />
      <TermsModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Footer />
    </main>
  );
}
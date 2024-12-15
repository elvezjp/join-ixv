/**
 * @file src/app/page.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月15日
 * @version 0.0.1
 * @description メインのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Announcement from '@/components/Announcement';
import Features from '@/components/Features';
import SignupForm from '@/components/SignupForm';
import TermsModal from '@/components/TermsModal';
import Footer from '@/components/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen">
      <Header />
      <Announcement />
      <Features />
      <SignupForm onOpenModal={handleOpenModal} />
      <TermsModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Footer />
    </main>
  );
}
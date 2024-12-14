'use client';

import { useState } from 'react';
import Header from '@/components/Header';
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
      <Features />
      <SignupForm onOpenModal={handleOpenModal} />
      <TermsModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Footer />
    </main>
  );
}
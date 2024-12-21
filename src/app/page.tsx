/**
 * @file src/app/page.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description メインのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
'use client';

import Header from '@/components/Header';
import Features from '@/components/Features';
import SignupForm from '@/components/SignupForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Features />
      <SignupForm />
      <Footer />
    </main>
  );
}
/**
 * @file src/components/Header.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月14日
 * @version 0.0.1
 * @description ヘッダーのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageSlider from './ImageSlider';

/**
 * ヘッダーのコンポーネント。
 * @returns ヘッダーのコンポーネント。
 */
export default function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const slides = [
    {
      imageSrc: '/join-ixv/images/hero-project-agent.png',
      alt: '上流工程の効率化',
      title: '上流工程の効率化',
      description: 'AIを活用して要件定義書作成を支援し、品質のばらつきを低減します。'
    },
    {
      imageSrc: '/join-ixv/images/hero-task-agent.png',
      alt: 'プロジェクト管理の最適化',
      title: 'プロジェクト管理の最適化',
      description: 'AIによる進捗管理の自動化や最適なリソース配分提案を実現します。'
    },
    {
      imageSrc: '/join-ixv/images/hero-extension.png',
      alt: '開発プロセスの改善',
      title: '開発プロセスの改善',
      description: 'コード統合の支援を行い、品質を向上させるとともに、チームの成果を最大化します。'
    }
  ];

  return (
    <header className="bg-gradient-to-r from-[#1a365d] to-[#2563eb] text-white">
      <div className="container mx-auto px-6 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold">IXV</div>
          <Link
            href="#signup"
            className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition"
            scroll={true}
          >
            クローズドβ版申込み
          </Link>
        </nav>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              開発をもっと<br />シンプルに
            </h1>
            <p className="text-xl mb-8">
              IXV（イクシブ）は、AIを活用した次世代の開発ツール。<br />
              チーム開発をよりスマートに、より効率的に。
            </p>
            <div className="space-x-4">
              <Link
                href="#signup"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
                scroll={true}
              >
                クローズドβ版申込み
              </Link>
              <Link
                href="#features"
                className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                scroll={true}
              >
                詳細を見る
              </Link>
            </div>
            <div className="rounded-lg border border-white p-4 mt-8 md:mr-4">
              <h2 className="text-xl font-bold mb-4">【重要なお知らせ】</h2>
              <p className="mb-4">
                事前登録を完了いただいている皆様には、クローズドβ版の優先的なご案内を差し上げますが、
                正式にクローズドβ版をご利用いただくには、専用の申込フォームにてお申し込みいただく必要がございます。
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative w-full h-[400px]">
              {isClient && <ImageSlider slides={slides} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
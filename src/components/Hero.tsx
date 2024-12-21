/**
 * @file src/components/Hero.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description ヒーローコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import Link from 'next/link';
import ImageSlider from './ImageSlider';
import { AssistantPanelButton } from '@/components/AssistantPanelButton';
import { useLanguage } from '@/contexts/LanguageContext';
import ja from '@/locales/ja';
import en from '@/locales/en';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const { language } = useLanguage();
  const t = language === 'ja' ? ja : en;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const slides = [
    {
      imageSrc: '/join-ixv/images/hero-project-agent.png',
      alt: t.header.slides[0].alt,
      title: t.header.slides[0].title,
      description: t.header.slides[0].description
    },
    {
      imageSrc: '/join-ixv/images/hero-task-agent.png',
      alt: t.header.slides[1].alt,
      title: t.header.slides[1].title,
      description: t.header.slides[1].description
    },
    {
      imageSrc: '/join-ixv/images/hero-extension.png',
      alt: t.header.slides[2].alt,
      title: t.header.slides[2].title,
      description: t.header.slides[2].description
    }
  ];

  return (
	<div className="container  mx-auto px-6 py-6 text-white">
		<div className="flex justify-end">
			<AssistantPanelButton />
		</div>
		<div className="flex flex-col md:flex-row items-center justify-between">
			<div className="md:w-1/2 mb-8 md:mb-0">
				<h1 className="text-4xl md:text-6xl font-bold mb-6">
				{t.header.title1}<br />
				{t.header.title2}
				</h1>
				<p className="text-xl mb-8">
				{t.header.description1}<br />
				{t.header.description2}
				</p>
				<div className="space-x-4">
				<Link
					href="#signup"
					className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
					scroll={true}
				>
					{t.header.signup}
				</Link>
				<Link
					href="#features"
					className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
					scroll={true}
				>
					{t.header.details}
				</Link>
				</div>
				<div className="rounded-lg border border-white p-4 mt-8 md:mr-4">
				<h2 className="text-xl font-bold mb-4">{t.header.notice.title}</h2>
				<p className="mb-4">
					{t.header.notice.message}
					<Link
					href="#signup"
					className="underline"
					scroll={true}
					>
					{t.header.notice.formLink}
					</Link>
					{t.header.notice.messageEnd}
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
  );
};

export default Hero;
/**
 * @file src/components/Features.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2025年01月04日
 * @version 0.1.0
 * @description 特徴のコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import { useLanguage } from '@/contexts/LanguageContext';
import ja from '@/locales/ja';
import en from '@/locales/en';

export default function Features() {
	const { language } = useLanguage();
	const t = language === 'ja' ? ja : en;

	return (
		<>
			<section id="features" className="py-20 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-8 text-[#3F62A7]">{t.features.title}</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{t.features.cards.map((card, index) => (
							<div key={index} className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
								<h3 className="text-xl font-bold text-blue-600 mb-4">{card.title}</h3>
								<p className="text-gray-800">{card.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="challenges" className="py-20 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-8 text-[#3F62A7]">{t.challenges.title}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">{t.challenges.problems.title}</h3>
							<ul className="list-disc list-inside text-gray-700">
								{t.challenges.problems.items.map((item, index) => (
									<li key={index} className="text-gray-800">{item}</li>
								))}
							</ul>
						</div>
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">{t.challenges.solutions.title}</h3>
							<ul className="list-disc list-inside text-gray-700">
								{t.challenges.solutions.items.map((item, index) => (
									<li key={index} className="text-gray-800">{item}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section id="why-ixv" className="py-20 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-8 text-[#3F62A7]">{t.whyIxv.title}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{t.whyIxv.cards.map((card, index) => (
							<div key={index} className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
								<h3 className="text-xl font-bold text-blue-600 mb-4">{card.title}</h3>
								<p className="text-gray-800">{card.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
/**
 * @file src/app/visualization/PanelContent.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2025年01月04日
 * @version 0.1.0
 * @description ナビゲーションパネルとアシスタントパネルのコンテンツを提供するコンポーネント。
 * 多言語対応と各パネルの機能説明を含む。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

'use client'

import { useLanguage } from '@/contexts/LanguageContext';
import ja from '@/locales/ja';
import en from '@/locales/en';
import Link from 'next/link';

/**
 * ナビゲーションパネルのコンテンツを表示するコンポーネント。
 * 言語に応じたタイトル、説明、機能リスト、クイックアクセス情報を表示します。
 * @returns {JSX.Element} ナビゲーションパネルのコンテンツ
 */
export function NavigationPanelContent() {
	const { language } = useLanguage();
	const t = language === 'ja' ? ja : en;

	return (
		<div className="text-white">
		<h2 className="text-lg font-semibold">{t.navigationPanel.title}</h2>
		<p>{t.navigationPanel.description}</p>
		<ul className="list-disc list-inside">
			{t.navigationPanel.features.map((feature, index) => (
			<li key={index}>{feature}</li>
			))}
		</ul>
		<p>{t.navigationPanel.quickAccess}</p>

		<div className="mt-4 border-t border-gray-600 pt-4">
			<h3 className="text-md font-semibold mb-2">
			{t.navigationPanel.homeLink.title}
			</h3>
			<Link
				href='/'
				legacyBehavior
			>
				<a className="text-blue-300 hover:text-blue-100 transition-colors duration-200">
					{t.navigationPanel.homeLink.linkText}
				</a>
			</Link>
		</div>

		</div>
	);
	}

	/**
	 * アシスタントパネルのコンテンツを表示するコンポーネント。
	 * 言語に応じたタイトル、説明、機能リスト、クイックアクセス情報を表示します。
	 * @returns {JSX.Element} アシスタントパネルのコンテンツ
	 */
	export function AssistantPanelContent() {
	const { language } = useLanguage();
	const t = language === 'ja' ? ja : en;

	return (
		<div className="bg-white p-4 text-gray-800">
		<h2 className="text-lg font-semibold">{t.assistantPanel.title}</h2>
		<p>{t.assistantPanel.description}</p>
		<ul className="list-disc list-inside">
			{t.assistantPanel.features.map((feature, index) => (
			<li key={index}>{feature}</li>
			))}
		</ul>
		<p>{t.assistantPanel.quickAccess}</p>
		</div>
	);
}
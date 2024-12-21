/**
 * @file src/app/page.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description メインのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
'use client';

import { Box } from '@mui/material';

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import SignupForm from '@/components/SignupForm';

import { useNavigationPanel } from '@/contexts/NavigationPanelContext';
import { useAssistantPanel } from '@/contexts/AssistantPanelContext';
import { NavigationPanel } from '@/components/NavigationPanel';
import { AssistantPanel } from '@/components/AssistantPanel';

import { useLanguage } from '@/contexts/LanguageContext';
import ja from '@/locales/ja';
import en from '@/locales/en';

/**
 * ナビゲーションパネルのコンテンツを表示するコンポーネント。
 * 言語に応じたタイトル、説明、機能リスト、クイックアクセス情報を表示します。
 * @returns {JSX.Element} ナビゲーションパネルのコンテンツ
 */
function NavigationPanelContent() {
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
    </div>
  );
}

/**
 * アシスタントパネルのコンテンツを表示するコンポーネント。
 * 言語に応じたタイトル、説明、機能リスト、クイックアクセス情報を表示します。
 * @returns {JSX.Element} アシスタントパネルのコンテンツ
 */
function AssistantPanelContent() {
  const { language } = useLanguage();
  const t = language === 'ja' ? ja : en;

  return (
    <div className="bg-white p-4">
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

/**
 * ホームコンポーネント。
 * ナビゲーションパネルとアシスタントパネルを表示し、ヒーローセクション、機能リスト、サインアップフォームを含むページの主要なコンテンツをレンダリングします。
 * @returns {JSX.Element} ホームページのJSX要素
 */
export default function Home() {

  const {isPinned: isNavigationPinned, width: navigationPanelWidth } = useNavigationPanel();

  const { isOpen: isAssistantPanelOpen, closePanel: closeAssistantPanel, width: assistantPanelWidth } = useAssistantPanel();

  return (
    <div>
      <NavigationPanel>
        <NavigationPanelContent />
      </NavigationPanel>
      <AssistantPanel isOpen={isAssistantPanelOpen} onClose={closeAssistantPanel}>
        <AssistantPanelContent />
      </AssistantPanel>
      <div className="bg-gradient-to-r from-[#1a365d] to-[#2563eb] text-white">
        <Box
          className="flex-1 transition-all duration-300 ease-in-out"
          sx={{
            marginLeft: isNavigationPinned ? navigationPanelWidth : 0,
            marginRight: isAssistantPanelOpen ? assistantPanelWidth : 0
          }}
        >
          <Hero />
        </Box>
      </div>
      <Box
        className="flex-1 transition-all duration-300 ease-in-out"
        sx={{
          marginLeft: isNavigationPinned ? navigationPanelWidth : 0,
          marginRight: isAssistantPanelOpen ? assistantPanelWidth : 0
        }}
      >
        <Features />
        <SignupForm />
      </Box>
    </div>
  );
}
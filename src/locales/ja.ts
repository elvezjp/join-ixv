/**
 * @file src/locales/ja.ts
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月17日
 * @version 0.0.2
 * @description 日本語の辞書ファイル。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
export default {
  header: {
    title1: '開発をもっと',
    title2: 'シンプルに',
    description1: 'IXV（イクシブ）は、AIを活用した次世代の開発ツール。',
    description2: 'チーム開発をよりスマートに、より効率的に。',
    signup: 'クローズドβ版申込み',
    details: '詳細を見る',
    logo: 'IXV',
    notice: {
      title: '【重要なお知らせ】',
      message: '事前登録を完了いただいている皆様には、クローズドβ版の優先的なご案内を差し上げますが、正式にクローズドβ版をご利用いただくには、',
      formLink: '本ページの申込フォーム',
      messageEnd: 'にてお申し込みいただく必要がございます。'
    },
    slides: [
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
    ]
  },
  // 他のセクションも同様に
} as const;
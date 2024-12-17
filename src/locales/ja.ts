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
  features: {
    title: 'IXVの特徴',
    cards: [
      {
        title: '上流工程の効率化',
        description: 'AIを活用して要件定義書作成を支援し、品質のばらつきを低減します。'
      },
      {
        title: 'プロジェクト管理の最適化',
        description: 'AIによる進捗管理の自動化や最適なリソース配分提案を実現します。'
      },
      {
        title: '開発プロセスの改善',
        description: 'コード統合の支援を行い、品質を向上させるとともに、チームの成果を最大化します。'
      }
    ]
  },
  challenges: {
    title: '日本のソフトウェア開発の課題と解決',
    problems: {
      title: '主な課題',
      items: [
        '要件の曖昧さやステークホルダー間の認識齟齬',
        'タスク分割やリソースアサインの難しさ',
        '属人化した開発やナレッジ共有・継承の困難さ'
      ]
    },
    solutions: {
      title: 'IXVによる解決',
      items: [
        'AIを活用した要件定義書作成支援と品質チェックの自動化',
        '最適なリソース配分提案と進捗管理の自動化',
        'コード統合支援やナレッジ共有・蓄積の促進'
      ]
    }
  },
  whyIxv: {
    title: 'なぜIXVなのか？',
    cards: [
      {
        title: 'シンプルな操作性',
        description: '複雑なバージョン管理は不要。直感的なインターフェースで、すぐに使い始められます。'
      },
      {
        title: '安全性の確保',
        description: 'AIによる変更分析と影響範囲の可視化。リスクを最小限に抑えた開発が可能です。'
      },
      {
        title: '生産性の向上',
        description: '自動化された作業フローとAIサポートにより、チームの生産性が大幅に向上します。'
      },
      {
        title: 'チーム連携の強化',
        description: 'リアルタイムな情報共有と進捗の可視化で、チームの連携がさらに強化されます。'
      }
    ]
  },
  signup: {
    logoAlt: 'IXVロゴ',
    title: 'クローズドβ版申込み',
    subtitle: '全ての項目が必須です',
    form: {
      company: '会社名',
      department: '部署名',
      phone: '電話番号',
      email: 'メールアドレス',
      name: '氏名',
      acknowledgement: {
        button: 'お申込み留意点',
        text: 'について了解します'
      },
      agreement: {
        button: '利用規約',
        text: 'に同意します'
      },
      submit: '申込む'
    },
    messages: {
      success: '申込みを受け付けました。担当者より追ってご連絡させていただきます。',
      error: '申込みの送信に失敗しました。お手数ですが、時間をおいて再度お試しください。'
    }
  }
} as const;
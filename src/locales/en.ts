/**
 * @file src/locales/en.ts
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月17日
 * @version 0.0.2
 * @description 英語の辞書ファイル。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
export default {
  header: {
    title1: 'Simplify',
    title2: 'Development',
    description1: 'IXV is an AI-powered next-generation development tool.',
    description2: 'Make team development smarter and more efficient.',
    signup: 'Apply for Closed Beta',
    details: 'Learn More',
    logo: 'IXV',
    notice: {
      title: '[Important Notice]',
      message: 'While those who have completed pre-registration will receive priority invitation to the closed beta version, you will need to apply through the ',
      formLink: 'application form on this page',
      messageEnd: ' to officially participate in the closed beta.'
    },
    slides: [
      {
        imageSrc: '/join-ixv/images/hero-project-agent.png',
        alt: 'Upstream Process Optimization',
        title: 'Upstream Process Optimization',
        description: 'AI support for requirements documentation and quality standardization.'
      },
      {
        imageSrc: '/join-ixv/images/hero-task-agent.png',
        alt: 'Project Management Optimization',
        title: 'Project Management Optimization',
        description: 'Automated progress tracking and optimal resource allocation with AI.'
      },
      {
        imageSrc: '/join-ixv/images/hero-extension.png',
        alt: 'Development Process Improvement',
        title: 'Development Process Improvement',
        description: 'Code integration support to enhance quality and maximize team performance.'
      }
    ]
  },
  // 他のセクションも同様に
} as const;
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
  features: {
    title: 'IXV Features',
    cards: [
      {
        title: 'Upstream Process Optimization',
        description: 'AI support for requirements documentation and quality standardization.'
      },
      {
        title: 'Project Management Optimization',
        description: 'Automated progress tracking and optimal resource allocation with AI.'
      },
      {
        title: 'Development Process Improvement',
        description: 'Code integration support to enhance quality and maximize team performance.'
      }
    ]
  },
  challenges: {
    title: 'Software Development Challenges in Japan and Solutions',
    problems: {
      title: 'Key Challenges',
      items: [
        'Ambiguous requirements and stakeholder misalignment',
        'Difficulty in task division and resource assignment',
        'Personalized development and knowledge sharing challenges'
      ]
    },
    solutions: {
      title: 'IXV Solutions',
      items: [
        'AI-powered requirements documentation support and automated quality checks',
        'Optimal resource allocation suggestions and automated progress management',
        'Code integration support and knowledge sharing promotion'
      ]
    }
  },
  whyIxv: {
    title: 'Why IXV?',
    cards: [
      {
        title: 'Simple Operation',
        description: 'No complex version control needed. Start using immediately with an intuitive interface.'
      },
      {
        title: 'Enhanced Security',
        description: 'AI-powered change analysis and impact visualization. Develop with minimal risk.'
      },
      {
        title: 'Increased Productivity',
        description: 'Automated workflows and AI support significantly boost team productivity.'
      },
      {
        title: 'Strengthened Team Collaboration',
        description: 'Real-time information sharing and progress visualization enhance team coordination.'
      }
    ]
  },
  signup: {
    logoAlt: 'IXV Logo',
    title: 'Apply for Closed Beta',
    subtitle: 'All fields are required',
    form: {
      company: 'Company Name',
      department: 'Department',
      phone: 'Phone Number',
      email: 'Email Address',
      name: 'Full Name',
      acknowledgement: {
        button: 'Application Notes',
        text: ' I understand the application notes'
      },
      agreement: {
        button: 'Terms of Service',
        text: ' I agree to the terms of service'
      },
      submit: 'Apply'
    },
    messages: {
      success: 'Your application has been received. Our team will contact you shortly.',
      error: 'Failed to submit the application. Please try again later.'
    }
  }
} as const;
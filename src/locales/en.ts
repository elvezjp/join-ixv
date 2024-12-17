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
        alt: 'Upstream Process Optimization',
        title: 'Upstream Process Optimization',
        description: 'AI support for requirements documentation and quality standardization.'
      },
      {
        alt: 'Project Management Optimization',
        title: 'Project Management Optimization',
        description: 'Automated progress tracking and optimal resource allocation with AI.'
      },
      {
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
    note: 'All fields are required',
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
  },
  noticeModal: {
    title: 'Important Notes About Application',
    sections: [
      {
        title: 'Purpose of Closed Beta Release',
        content: 'This closed beta version is provided as a preparatory stage to validate the concept of our next-generation AI development tool "IXV". It aims to let you experience IXV\'s features and possibilities, and provide feedback.'
      },
      {
        title: 'Please Enter Accurate Company Information',
        content: 'Please enter accurate information such as company name and email address in the application form. This ensures smooth communication.'
      },
      {
        title: 'Terms of Service Agreement',
        content: 'Use of the closed beta version requires agreement to our terms of service. Please review the details provided in the application form before agreeing.'
      },
      {
        title: 'Application Process',
        content: 'After application, we will contact selected participants individually. Please note that the selection criteria details are not publicly disclosed.'
      }
    ],
    closeButton: 'Close'
  },
  termsModal: {
    title: 'Closed Beta Terms of Service',
    introduction: 'ELVEZ Inc. (hereinafter referred to as "the Company") establishes the following terms of service for the closed beta version (hereinafter referred to as "the Service") provided by the Company. Users of the Service (hereinafter referred to as "Users") must agree to these terms before using the Service.',
    sections: [
      {
        title: 'Article 1 (Purpose)',
        items: [
          'These terms apply to Users of the Service. The Service is provided as a means to verify and improve service functionality, and Users shall use it in accordance with the following conditions.'
        ]
      },
      {
        title: 'Article 2 (Usage Qualifications)',
        items: [
          'Users may use the Service provided by the Company in a proper and appropriate manner.',
          'Users agree to use the closed beta version in accordance with its intended purpose and not to engage in the following activities:'
        ],
        subItems: [
          'Infringing on the intellectual property rights of others',
          'Disclosing or sharing information about the Service to third parties without authorization',
          'Reverse engineering the Service specifications'
        ]
      },
      {
        title: 'Article 3 (Confidentiality)',
        items: [
          'Users shall not disclose or leak any information related to the Service (hereinafter referred to as "Confidential Information") to third parties.',
          'Confidential Information includes Service specifications, bugs, improvement suggestions, provided materials, and other non-public information.'
        ]
      },
      {
        title: 'Article 4 (Survey Cooperation)',
        items: [
          'Users shall cooperate with the Company\'s survey activities regarding the Service. Survey activities include interviews, questionnaires, and usage reports.',
          'Survey results will only be used for Service improvement purposes and will not be disclosed externally in a way that identifies individuals.'
        ]
      },
      {
        title: 'Article 5 (Disclaimer)',
        items: [
          'The Service is provided for testing purposes and comes with no warranties of any kind.',
          'The Company shall not be liable for any damages arising from the use of the Service.'
        ]
      },
      {
        title: 'Article 6 (Suspension and Termination)',
        items: [
          'The Company may suspend or terminate the use of the Service without prior notice if Users violate these terms.',
          'Users agree not to make any claims against the Company upon termination of the Service.'
        ]
      },
      {
        title: 'Article 7 (Intellectual Property Rights)',
        items: [
          'All intellectual property rights related to the Service belong to the Company.',
          'Users are prohibited from using materials, technologies, or information related to the Service without authorization.'
        ]
      },
      {
        title: 'Article 8 (Changes to Terms)',
        items: [
          'The Company may modify these terms as necessary.',
          'Continued use of the Service after changes to the terms constitutes acceptance of the modified terms.'
        ]
      },
      {
        title: 'Article 9 (Governing Law and Jurisdiction)',
        items: [
          'These terms shall be interpreted and governed by Japanese law. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the court having jurisdiction over the location of the Company\'s headquarters as the court of first instance.'
        ]
      }
    ],
    footer: {
      date: 'Established: December 16, 2024'
    },
    closeButton: 'Close'
  }
} as const;
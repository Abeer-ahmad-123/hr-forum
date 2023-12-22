import { AiFillHome } from 'react-icons/ai'
import { BsFillBookmarksFill } from 'react-icons/bs'
import avatarPng from '../../assets/avatars/image-juliusomo.png'
import avatarWebp from '../../assets/avatars/image-juliusomo.webp'
import avatar2Png from '../../assets/avatars/image-amyrobson.png'
import avatar2Webp from '../../assets/avatars/image-amyrobson.webp'
import avatar3Png from '../../assets/avatars/image-maxblagun.png'
import avatar3Webp from '../../assets/avatars/image-maxblagun.webp'
import avatar4Png from '../../assets/avatars/image-ramsesmiron.png'
import avatar4Webp from '../../assets/avatars/image-ramsesmiron.webp'
import { LoginIcon, ScaleIcon, TermsOfServiceIcon } from '@/assets/icons'

export const colors = ['indigo', 'blue', 'coral', 'mint', 'sunset', 'mauve']

export const menuItems = [
  // {
  //   href: '#',
  //   icon: <LoginIcon />,
  //   label: 'Login / Signup',
  // },
  {
    href: '/policies/privacy-policy',
    icon: <ScaleIcon />,
    label: 'Privacy Policy',
  },
  {
    href: '/policies/code-of-conduct',
    icon: <LoginIcon />,
    label: 'Code of Conduct',
  },
  {
    href: '/policies/terms-of-use',
    icon: <TermsOfServiceIcon />,
    label: 'Terms of Use',
  },
]
export const themeColors: any = {
  indigo: '#6366F1',
  blue: '#2970FF',
  coral: '#FF6B6B',
  mint: '#2ED8B6',
  sunset: '#FF6348',
  mauve: '#D980FA',
}
export const reactions = [
  { name: 'none', emoji: '♡' },
  { name: 'love', emoji: '❤️' },
  { name: 'like', emoji: '👍' },
  { name: 'clap', emoji: '👏' },
  { name: 'celebrate', emoji: '🎉' },
]
export const data = {
  currentUser: {
    image: {
      png: avatarPng.src,
      webp: avatarWebp.src,
    },
    username: 'juliusomo',
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: 1641854725,
      score: 12,
      user: {
        image: {
          png: avatar2Png.src,
          webp: avatar2Webp.src,
        },
        username: 'amyrobson',
      },
      replies: [
        {
          parentId: 1,
          id: 5,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: 1642459525,
          score: 4,
          replyingTo: 'maxblagun',
          replies: [],
          user: {
            image: {
              png: avatar3Png.src,
              webp: avatar3Webp.src,
            },
            username: 'ramsesmiron',
          },
        },
      ],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: 1629236725,
      score: 5,
      user: {
        image: {
          png: avatar3Png.src,
          webp: avatar3Webp.src,
        },
        username: 'maxblagun',
      },
      replies: [
        {
          parentId: 2,
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: 1644792325,
          score: 4,
          replyingTo: 'maxblagun',
          replies: [],
          user: {
            image: {
              png: avatar4Png.src,
              webp: avatar4Webp.src,
            },
            username: 'ramsesmiron',
          },
        },
        {
          parentId: 2,
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: 1644533125,
          score: 2,
          replyingTo: 'ramsesmiron',
          replies: [],
          user: {
            image: {
              png: avatarPng.src,
              webp: avatarWebp.src,
            },
            username: 'juliusomo',
          },
        },
      ],
    },
  ],
}
export const imageUrls = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
]
export const channels = [
  {
    name: 'HR Best Practices',
    picture:
      'https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2836&q=80',
    description: 'Share and discuss HR best practices.',
    link: '#channelHRBestPractices',
  },
  {
    name: 'Diversity and Inclusion',
    picture:
      'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80',
    description: 'Promote diversity and inclusion in the workplace.',
    link: '#channelDiversityInclusion',
  },
  {
    name: 'Employee Benefits',
    picture:
      'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Discuss employee benefits and compensation packages.',
    link: '#channelEmployeeBenefits',
  },
  {
    name: 'Remote Work Strategies',
    picture:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    description: 'Share tips and best practices for managing remote teams.',
    link: '#channelRemoteWorkStrategies',
  },
  {
    name: 'Talent Acquisition',
    picture:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    description: 'Discuss strategies for attracting and hiring top talent.',
    link: '#channelTalentAcquisition',
  },
  {
    name: 'Performance Management',
    picture:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    description: 'Explore effective performance evaluation and management.',
    link: '#channelPerformanceManagement',
  },
  {
    name: 'Workplace Culture',
    picture:
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    description: 'Foster a positive and inclusive workplace culture.',
    link: '#channelWorkplaceCulture',
  },
  // Add more HR forum channels as needed
]

export const themeColorsProperties = [
  { name: 'Primary (Original)', variable: 'primary' },
  {
    name: 'Secondary (Slightly Lighter than primary)',
    variable: 'secondary',
  },
  { name: 'Accent (Brighter than primary)', variable: 'accent' },
  { name: 'Background (Background color)', variable: 'background' },
  { name: 'On Primary???', variable: 'on-primary' },
]
export const notificationSettings = {
  activity: [
    'Email me when someone comments onmy article',
    'Email me when someone answers on my form',
  ],
  application: ['News and announcements', 'Weekly product updates'],
}
export const reactionOptions = [
  { name: 'none', emoji: '♡' },
  { name: 'love', emoji: '❤️' },
  { name: 'like', emoji: '👍' },
  { name: 'clap', emoji: '👏' },
  { name: 'celebrate', emoji: '🎉' },
]
export const navigation = [
  { name: 'Home', href: '/feeds', icon: AiFillHome },

  { name: 'Saved', href: '/saved', icon: BsFillBookmarksFill },
]
export const sidebarChannels = [
  {
    id: 1,
    name: 'HR Best Practices',
    code: 'Rz160015',
    href: '/channels/HR-Best-Practices',
    color: 'purple',
    slug: '',
  },
  {
    id: 2,
    name: 'Diversity and Inclusion',
    code: 'Rz160015',
    href: '/channels/Diversity-and-Inclusion',
    color: 'indigo',
    slug: '',
  },
  {
    id: 3,
    name: 'Employee Benefits',
    code: 'Rz160015',
    href: '/channels/Employee-Benefits',
    color: 'skyblue',
    slug: '',
  },
  {
    id: 4,
    name: 'Remote Work Strategies',
    code: 'Rz160015',
    href: '/channels/Remote-Work-Strategies',
    color: 'pink',
    slug: '',
  },
  {
    id: 5,
    name: 'Talent Acquisition',
    code: 'Rz160015',
    href: '/channels/Talent-Acquisition',
    color: 'orange',
    slug: '',
  },
]
export const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]
export const renderFeedData = [
  {
    id: 1,
    title: 'Handling Workplace Conflict',
    content:
      'What are some effective strategies for handling workplace conflicts? How can HR managers mediate disputes between employees?',
    createdAt: 1641854725,
    likes: 25,
    user: {
      image: {
        png: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
        webp: 'https://example.com/images/avatars/image-johnsmith.webp',
      },
      username: 'johnsmithHR',
    },
    // tags: ["Workplace Conflict", "HR Strategies", "Employee Mediation"],
    tags: ['HR Best Practices'],
  },
  {
    id: 2,
    title: 'Performance Appraisal Best Practices',
    content:
      'What are some best practices for conducting performance appraisals? How can HR ensure fair and objective evaluations of employees?',
    createdAt: 1641854725,
    likes: 18,
    user: {
      image: {
        png: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        webp: 'https://example.com/images/avatars/image-emilybrown.webp',
      },
      username: 'emilybrownHR',
    },
    // tags: ["Performance Appraisal", "Employee Evaluation", "Fair Assessment"],
    tags: ['Diversity and Inclusion'],
  },
  {
    id: 3,
    title: 'Remote Work Challenges',
    content:
      'As more employees work remotely, what challenges are HR teams facing in managing remote teams? Share your experiences and tips for effective remote work.',
    createdAt: 1641854725,
    likes: 32,
    user: {
      image: {
        png: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
        webp: 'https://example.com/images/avatars/image-markthompson.webp',
      },
      username: 'markthompsonHR',
    },
    // tags: ["Remote Work", "Managing Remote Teams", "Work from Home"],
    tags: ['Employee Benefits'],
  },
  {
    id: 4,
    title: 'Diversity and Inclusion Initiatives',
    content:
      'How can HR departments promote diversity and inclusion in the workplace? Share your success stories and best practices for creating a more inclusive work environment.',
    createdAt: 1641854725,
    likes: 42,
    user: {
      image: {
        png: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        webp: 'https://example.com/images/avatars/image-sarahjones.webp',
      },
      username: 'sarahjonesHR',
    },
    // tags: ["Diversity and Inclusion", "Inclusive Workplace", "Equity"],
    tags: ['Remote Work Strategies'],
  },
  {
    id: 5,
    title: 'Employee Benefits Survey',
    content:
      'We are planning to update our employee benefits package. What benefits are most valued by employees? Conducting a survey to gather insights and suggestions.',
    createdAt: 1641854725,
    likes: 28,
    user: {
      image: {
        png: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
        webp: 'https://example.com/images/avatars/image-kevinlee.webp',
      },
      username: 'kevinleeHR',
    },
    // tags: ["Employee Benefits", "Benefits Survey", "Compensation"],
    tags: ['Talent Acquisaition'],
  },
  {
    id: 6,
    title: 'Mental Health Support at Work',
    content:
      "How can employers better support employees' mental health? Discussing the importance of mental health initiatives and resources in the workplace.",
    createdAt: 1641854725,
    likes: 35,
    user: {
      image: {
        png: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        webp: 'https://example.com/images/avatars/image-lisawong.webp',
      },
      username: 'lisawongHR',
    },
    // tags: ["Mental Health", "Well-being", "Employee Support"],
    tags: ['HR Best Practices'],
  },
  // Add more posts here
]
export const mockChannelkeyValuePair = {
  1: {
    id: 1,
    name: 'HR-General',
    description: 'General discussions related to Human Resources',
    slug: 'hr-general',
  },
  2: {
    id: 2,
    name: 'HR-Recruitment',
    description: 'Discussions about recruitment and hiring',
    slug: 'hr-recruitment',
  },
  3: {
    id: 3,
    name: 'HR-Benefits',
    description: 'Information and discussions about employee benefits',
    slug: 'hr-benefits',
  },
  4: {
    id: 4,
    name: 'HR-Training',
    description: 'Training schedules, materials, and discussions',
    slug: 'hr-training',
  },
  5: {
    id: 5,
    name: 'HR-Compliance',
    description: 'Compliance-related announcements and discussions',
    slug: 'hr-compliance',
  },
  6: {
    id: 6,
    name: 'HR-Performance',
    description: 'Performance review schedules and discussions',
    slug: 'hr-performance',
  },
}
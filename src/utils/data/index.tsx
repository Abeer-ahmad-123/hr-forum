import { LoginIcon, ScaleIcon, TermsOfServiceIcon } from '@/assets/icons'
import Icon from '@/assets/icons/heartIcon'
import HomeIcon from '@/assets/icons/home'
import { AiFillHome } from 'react-icons/ai'
import { BsFillBookmarksFill } from 'react-icons/bs'
export const colors = ['indigo', 'blue', 'coral', 'mint', 'sunset', 'mauve']

export const menuItems = [
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

export const navigationItems = [
  { title: 'Home', href: '/feeds', icon: <HomeIcon /> },

  { title: 'Saved', href: '/saved', icon: <Icon strokeWidth='1.5' /> },

  { title: 'Popular', href: '/popular', icon: <Icon strokeWidth='1.5' /> },
]

export const reactionOptions = [
  { name: 'none', emoji: '♡' },
  { name: 'love', emoji: '❤️' },
  { name: 'like', emoji: '👍' },
  { name: 'clap', emoji: '👏' },
  { name: 'celebrate', emoji: '🎉' },
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

export const reportData = [
  {
    reason: 'Sexual content',
    description:
      'content that include graphics ,nudity or other type of sexual content',
  },
  {
    reason: 'Hateful and Abusive Content',
    description: 'content that is voilent,graphics or posted to shock viewers',
  },
  {
    reason: 'Harness or bullying',
    description:
      'content that promotes hatred against protected groups abusive vulnerarble individuals',
  },
  {
    reason: 'Harmful and dangerous acts',
    description: 'content that included acts that may physical harm',
  },
  {
    reason: 'Misinformation',
    description:
      'content that is misleading or deceptive with serious risk of egresious harm',
  },
  {
    reason: 'Child Abuse',
    description:
      'content that includes sexual , predatory or abusive communications towards minors',
  },
  {
    reason: 'Promotes terrorism',
    description: 'content that is intended to recruit terrorsit organizations',
  },
  {
    reason: 'Spam or misLeading',
    description:
      'content that is massively posted or have miss leading information',
  },
  {
    reason: 'legal issues',
    description: 'copyrights , privacy or other legal complaints',
  },
  {
    reason: 'Caption issues',
    description: 'missing inaccurate or abusive captions ',
  },
]

export const rulesData = [
  {
    title: 'Stay professional.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam, voluptatibus.',
  },
  {
    title: 'Be concise and to the point.',
    description:
      'In hac habitasse platea dictumst. Vivamus vel felis eu ligula consequat tincidunt. Quisquam, voluptatibus.',
  },
  {
    title: 'Do not use slangs or hate speach.',
    description:
      'Fusce auctor odio ac neque varius, vitae efficitur justo suscipit. Quisquam, voluptatibus.',
  },
  {
    title: 'Stay away from commenting about religion and other beliefs.',
    description:
      'Suspendisse non ligula nec urna fermentum consectetur. Quisquam, voluptatibus.',
  },
  {
    title: 'Be empathetic towards others while adding comments.',
    description:
      'Sed euismod neque non metus fermentum, a bibendum lacus ultricies. Quisquam, voluptatibus.',
  },
]
export const navigation = [
  { name: 'Home', href: '/feeds', icon: HomeIcon },

  { name: 'Saved', href: '/saved', icon: Icon },
]

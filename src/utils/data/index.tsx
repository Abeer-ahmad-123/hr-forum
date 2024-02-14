import { LoginIcon, ScaleIcon, TermsOfServiceIcon } from '@/assets/icons'
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
    title: 'Vel elit, ut ut.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam, voluptatibus.',
  },
  {
    title: 'Cras nec purus et.',
    description:
      'In hac habitasse platea dictumst. Vivamus vel felis eu ligula consequat tincidunt. Quisquam, voluptatibus.',
  },
  {
    title: 'Fusce auctor odio.',
    description:
      'Fusce auctor odio ac neque varius, vitae efficitur justo suscipit. Quisquam, voluptatibus.',
  },
  {
    title: 'Suspendisse non',
    description:
      'Suspendisse non ligula nec urna fermentum consectetur. Quisquam, voluptatibus.',
  },
  {
    title: 'Sed euismod',
    description:
      'Sed euismod neque non metus fermentum, a bibendum lacus ultricies. Quisquam, voluptatibus.',
  },
  {
    title: 'Cras nec purus.',
    description:
      'Cras nec purus ac odio feugiat posuere. Quisquam, voluptatibus.',
  },
  {
    title: 'Fusce auctor.',
    description:
      'Fusce auctor justo vel massa fermentum, vel cursus metus blandit. Quisquam, voluptatibus.',
  },
  {
    title: 'Suspendisse.',
    description:
      'Suspendisse potenti. Nulla facilisi. Duis vehicula, eros vitae posuere. Quisquam, voluptatibus.',
  },
]
export const navigation = [
  { name: 'Home', href: '/feeds', icon: AiFillHome },

  { name: 'Saved', href: '/saved', icon: BsFillBookmarksFill },
]

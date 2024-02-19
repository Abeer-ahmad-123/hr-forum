import { LayoutWrapper } from '@/wrappers/index'
import StoreProvider from '@/Providers/StoreProvider'
import '@/assets/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://hr-forum.vercel.app'),
  title: 'HR-Forum: Shaping the Future of HR',
  description:
    'Discover our HR Forum: the hub for HR professionals. Engage in discussions, network, and access expert insights on recruitment, employee development, diversity, and more. Join us in shaping the future of HR!',
  applicationName: 'HR-Forum',
  keywords: [
    'HR Forum',
    'HR professionals',
    'Discussions',
    'Networking',
    'Expert insights',
    'Recruitment',
    'Employee development',
    'Diversity',
    'Future of HR',
    'Professional development',
    'Human resources',
    'Talent management',
    'Workplace culture',
    'Leadership',
    'Best practices',
    'Innovation',
    'Learning and development',
    'Career growth',
    'HR trends',
    'Community engagement',
  ],
  viewport: { width: 'device-width', initialScale: 1 },
  robots: { index: true, follow: true },
  icons: [
    'https://h-forum.s3.us-east-2.amazonaws.com/uploads/1708327881-favicon.ico/c7007038-abb1-45d0-8f09-0d21bd475017.ico',
  ],

  openGraph: {
    title: 'HR-Forum',
    description:
      'Discover our HR Forum: the hub for HR professionals. Engage in discussions, network, and access expert insights on recruitment, employee development, diversity, and more. Join us in shaping the future of HR!',
    emails: ['admin@hr-forum.com'],
    siteName: 'HR-Forum',
    locale: 'hr-forum',
    images: {
      url: 'https://h-forum.s3.us-east-2.amazonaws.com/uploads/1708327606-Mediamodifier-Design.svg/940ec5d3-fe22-4b23-9a56-7eda257ebbae.svg',
      alt: 'Visit HR-Forum',
      width: 1200,
      height: 630,
    },
    url: 'https://hr-forum.vercel.app',
  },
  twitter: {
    site: 'HR-Forum',
    images: {
      url: 'https://h-forum.s3.us-east-2.amazonaws.com/uploads/1708327606-Mediamodifier-Design.svg/940ec5d3-fe22-4b23-9a56-7eda257ebbae.svg',
      alt: 'Visit HR-Forum',
      width: 1200,
      height: 630,
    },
    title: 'HR-Forum',
    description:
      'Discover our HR Forum: the hub for HR professionals. Engage in discussions, network, and access expert insights on recruitment, employee development, diversity, and more. Join us in shaping the future of HR!',
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <StoreProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </StoreProvider>
    </html>
  )
}

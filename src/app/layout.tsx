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
  icons: ['@/app/favicon.ico'],

  openGraph: {
    title: 'HR-Forum',
    description:
      'Discover our HR Forum: the hub for HR professionals. Engage in discussions, network, and access expert insights on recruitment, employee development, diversity, and more. Join us in shaping the future of HR!',
    emails: ['admin@hr-forum.com'],
    siteName: 'HR-Forum',
    locale: 'hr-forum',
    images: {
      url: 'https://devryx-web-imgs.s3.amazonaws.com/Enxsys+Logo.png',
      alt: 'Visit HR-Forum',
      width: 1200,
      height: 630,
    },
    url: 'https://hr-forum.vercel.app',
  },
  twitter: {
    site: 'HR-Forum',
    images: {
      url: 'https://devryx-web-imgs.s3.amazonaws.com/Enxsys+Logo.png',
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

import { LayoutWrapper } from '@/wrappers/index'
import StoreProvider from '@/Providers/StoreProvider'
import '@/assets/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum',
  description:
    'Discover our HR Forum: the hub for HR professionals. Engage in discussions, network, and access expert insights on recruitment, employee development, diversity, and more. Join us in shaping the future of HR!',
  openGraph: {
    images: 'https://devryx-web-imgs.s3.amazonaws.com/Enxsys+Logo.png',
    title: 'HR-Forum',
    description:
      'Discover our HR Forum: the hub for HR professionals. Engage in discussions, network, and access expert insights on recruitment, employee development, diversity, and more. Join us in shaping the future of HR!',
    type: 'website',
    url: 'https://hr-forum.vercel.app',
    siteName: 'HR-Forum',
    emails: ['admin@hr-forum.com'],
    locale: 'hr-forum',
  },
  twitter: {
    images: 'https://devryx-web-imgs.s3.amazonaws.com/Enxsys+Logo.png',
    title: 'HR-Forum',
    description:
      'Discover our HR Forum: the hub for HR professionals. Engage in discussions, network, and access expert insights on recruitment, employee development, diversity, and more. Join us in shaping the future of HR!',
    card: 'summary_large_image',
    site: 'HR-Forum',
  },
  icons: ['@/app/favicon.co'],
  metadataBase: new URL('https://hr-forum.vercel.app'),
  alternates: {
    canonical: '/feeds',
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

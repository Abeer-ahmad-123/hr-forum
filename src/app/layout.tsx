import { LayoutWrapper } from '@/wrappers/index'
import StoreProvider from '@/Providers/StoreProvider'
import '@/assets/styles/globals.css'
import type { Metadata } from 'next'
import { shareMetaData } from '@/utils/share-metadata'

export const metadata: Metadata = {
  title: 'HR-Forum: Shaping the Future of HR',
  ...shareMetaData,
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

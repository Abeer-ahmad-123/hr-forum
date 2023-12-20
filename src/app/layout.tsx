import { LayoutWrapper } from '@/wrappers/index'
import StoreProvider from '@/Providers/StoreProvider'

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <StoreProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </StoreProvider>
    </html>
  )
}

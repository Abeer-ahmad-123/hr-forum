import { LayoutWrapper } from '@/wrappers/index'
import StoreProvider from '@/Providers/StoreProvider'

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={`font-primary dark:bg-slate-700`}>
        <StoreProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </StoreProvider>
      </body>
    </html>
  )
}

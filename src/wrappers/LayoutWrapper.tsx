import Navbar from '@/components/Navbar/Navbar'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import { LayoutWrapperProps } from '@/utils/types/layoutWrapper'
import GoogleAndAuth from '@/wrappers/GoogleAndAuth'
import NProgressbar from '@/wrappers/NProgressbar'
import RenderChildren from '@/wrappers/RenderChildren'
import 'react-toastify/dist/ReactToastify.css'
import { getUserFromCookie } from '@/utils/cookies'

const LayoutWrapper = async ({ children, pathname }: LayoutWrapperProps) => {
  const isError = pathname === '/error'
  const { user, token } = await getUserFromCookie()
  return (
    <main className="h-max max-w-[100dvw] font-primary">
      <ThemeProvider attribute="class" defaultTheme="theme-default">
        {!isError &&
          !pathname?.includes('/login') &&
          !pathname?.includes('/register') && (
            <Navbar user={user} pathname={pathname} />
          )}
        {isError && <Navbar user={user} pathname={pathname} />}
        <ToastContainer />
        <RenderChildren isError={isError} pathname={pathname}>
          {children}
        </RenderChildren>
        <GoogleAndAuth />
        <NProgressbar />
      </ThemeProvider>
    </main>
  )
}

export default LayoutWrapper

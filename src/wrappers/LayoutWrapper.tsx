import Navbar from '@/components/Navbar/Navbar'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import { LayoutWrapperProps } from '@/utils/types/layoutWrapper'
import GoogleAndAuth from '@/wrappers/GoogleAndAuth'
import NProgressbar from '@/wrappers/NProgressbar'
import RenderChildren from '@/wrappers/RenderChildren'
import 'react-toastify/dist/ReactToastify.css'

const LayoutWrapper = ({ children, pathname }: LayoutWrapperProps) => {
  const isError = pathname === '/error'
  console.log(pathname)
  return (
    <main className="m-auto h-max max-w-[1512px] font-primary">
      <ThemeProvider attribute="class" defaultTheme="theme-default">
        {!isError && <Navbar pathname={pathname} />}
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

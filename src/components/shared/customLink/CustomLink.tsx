import { PropsWithChildren, useEffect } from 'react'
import Link from 'next/link'
// import nProgress from 'nprogress'
// import { usePathname } from 'next/navigation'
// import './style.css'

// NProgress.configure({ showSpinner: false })

export const CustomLink: React.FC<
  PropsWithChildren<{ href: string; className?: string }>
> = ({ href, className, children }) => {
  // const pathname = usePathname()

  // const handleClick = () => {
  //   if (pathname !== href)  nProgress.start()
  // }

  // useEffect(() => {
  //   return () => {
  //     // nProgress.done()
  //   }
  // }, [])

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

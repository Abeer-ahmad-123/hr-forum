'use client'

import Link from 'next/link'
import NProgress from 'nprogress'
import { PropsWithChildren, useEffect } from 'react'
import './style.css'

NProgress.configure({ showSpinner: false })

export const CustomLink: React.FC<
  PropsWithChildren<{ href: string; className?: string }>
> = ({ href, className, children }) => {
  useEffect(() => {
    return () => {
      NProgress.done()
    }
  }, [])

  return (
    <Link href={href} className={className} onClick={() => NProgress.start()}>
      {children}
    </Link>
  )
}

import { PropsWithChildren } from 'react'
import Link from 'next/link'

export const CustomLink: React.FC<
  PropsWithChildren<{ href: string; className?: string }>
> = ({ href, className, children }) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

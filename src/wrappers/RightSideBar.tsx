'use client'
import { usePathname } from 'next/navigation'
import RulesCard from '@/components/Cards/RuleCard'

interface RightSideBarProps {
  isProfilePage: boolean
}

const RightSideBar = ({ isProfilePage }: RightSideBarProps) => {
  const pathname = usePathname()
  return (
    <div
      className={`${
        pathname.startsWith('/profile') ? 'hidden' : 'hidden md:block'
      }
       ml-5  mt-0 h-[882px] bg-bg-primary pr-6 dark:bg-bg-primary-dark`}>
      <div className={`hidden flex-1 md:inline-block`}>
        <RulesCard />
      </div>
    </div>
  )
}

export default RightSideBar

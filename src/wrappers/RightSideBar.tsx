'use client'
import RulesCard from '@/components/Cards/RuleCard'
import { usePathname } from 'next/navigation'

const RightSideBar = () => {
  const pathname = usePathname()
  const isProfilePage = pathname?.includes('/profile')
  return (
    <div
      className={`${isProfilePage ? 'hidden' : 'hidden md:block'}
       ml-5  mt-0 h-[882px] bg-bg-primary pr-6 dark:bg-bg-primary-dark`}>
      <div className={`hidden flex-1 md:inline-block`}>
        <RulesCard />
      </div>
    </div>
  )
}

export default RightSideBar

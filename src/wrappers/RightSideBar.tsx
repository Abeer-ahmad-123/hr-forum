'use client'
import RulesCard from '@/components/Cards/RuleCard'
import { usePathname } from 'next/navigation'

const RightSideBar = () => {
  const pathname = usePathname()
  const isProfilePage = pathname?.includes('/profile')
  const isUserActivity = pathname?.includes('/user-activities')

  return (
    <div
      className={`${
        isProfilePage || isUserActivity ? 'hidden' : 'hidden lg:block'
      }
       mt-0 h-[882px] w-[25%] bg-bg-primary pr-6 dark:bg-bg-primary-dark`}>
      <div className={`hidden w-full flex-1 lg:inline-block`}>
        <RulesCard />
      </div>
    </div>
  )
}

export default RightSideBar

import RulesCard from '@/components/Cards/RuleCard'
import { usePathname } from 'next/navigation'

function RightSideBar() {
  const pathname = usePathname()

  return (
    <div
      className={`${
        pathname === '/profile' ? 'hidden' : 'block '
      } ml-5  mt-0 bg-bg-primary pr-6 dark:bg-bg-primary-dark`}>
      <div className={`hidden flex-1 md:inline-block`}>
        <RulesCard />
      </div>
    </div>
  )
}

export default RightSideBar

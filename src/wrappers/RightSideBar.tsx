import RulesCard from '@/components/Cards/RuleCard'
import { usePathname } from 'next/navigation'

function RightSideBar() {

  const pathname = usePathname()

  return (
    <div className={`${pathname === '/profile' ? 'hidden' : 'block'} mt-0`}>
      <div className={`hidden md:inline-block basis-1/4 ml-5 flex-1`}>
        <RulesCard />
      </div>
    </div>
  )
}

export default RightSideBar

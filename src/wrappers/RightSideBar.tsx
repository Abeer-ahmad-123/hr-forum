import RulesCard from '@/components/Cards/RuleCard'
import { usePathname } from 'next/navigation'

function RightSideBar() {

  const pathname = usePathname()

  return (
    <div className='hidden md:block'>
      <div className='mt-0  bg-bg-primary ml-5 pr-6 dark:bg-bg-primary-dark'>
        <div className={`hidden md:inline-block flex-1`}>
          <RulesCard />
        </div>
      </div>
    </div>
  )
}

export default RightSideBar

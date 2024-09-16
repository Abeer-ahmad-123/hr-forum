import RulesCard from '@/components/Cards/RuleCard'
import React from 'react'
interface RightSideBarProps {
  pathname: string
}

function RightSideBar({ pathname }: RightSideBarProps) {
  return (
    <div className={`${pathname === '/profile' ? 'hidden' : 'block'} mt-0`}>
      <div className={`hidden md:inline-block basis-1/4 ml-5 flex-1`}>
        <RulesCard />
      </div>
    </div>
  )
}

export default RightSideBar

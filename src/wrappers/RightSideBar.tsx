import RulesCard from '@/components/Cards/RuleCard'

interface RightSideBarProps {
  isProfilePage: boolean
}

const RightSideBar = ({ isProfilePage }: RightSideBarProps) => {
  return (
    <div
      className={`${
        isProfilePage ? 'hidden' : 'block'
      } ml-5  mt-0 bg-bg-primary pr-6 dark:bg-bg-primary-dark`}>
      <div className={`hidden flex-1 md:inline-block`}>
        <RulesCard isProfilePage={isProfilePage} />
      </div>
    </div>
  )
}

export default RightSideBar

import Link from 'next/link'
import { GiCheckedShield } from 'react-icons/gi'
import { useSelector } from 'react-redux'

const Logo = () => {
  const darkMode = useSelector((state: any) => state.colorMode.darkMode)

  return (
    <div className="w-20 flex-shrink-0 cursor-pointer text-center max-sm:w-10 md:w-40">
      <Link href="/feeds">
        <GiCheckedShield
          data-testid="logo-icon"
          className="inline-block h-7 w-8 align-middle"
          fill={'#5141df'}
        />
        <span className="hidden align-middle dark:text-white md:inline-block">
          HR FORUM
        </span>
      </Link>
    </div>
  )
}

export default Logo

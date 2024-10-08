import { RenderChildrenProps } from '@/utils/interfaces/renderChildren'
import LeftSidebar from './LeftSidebar'
import RightSideBar from './RightSideBar'
import { getUserFromCookie } from '@/utils/cookies'
import ChildWrapper from './ChildWrapper'

const RenderChildren = async ({
  isError,
  pathname,
  children,
}: RenderChildrenProps) => {
  const isRegisterPage = pathname === '/register'
  const isLoginPage = pathname === '/login'
  const { token, user } = await getUserFromCookie()
  return (
    <div
      className={
        pathname?.includes('/login') || pathname?.includes('/register')
          ? 'p-0'
          : pathname?.includes('/profile') ||
            pathname?.includes('/user-activities')
          ? 'px-0 pt-4 lg:p-0'
          : `p-4 lg:p-0 ` +
            `mx-auto max-w-[1512px] transition-all duration-700 ease-in-out `
      }>
      <div
        className={
          isError
            ? 'mt-0'
            : pathname?.includes('/login') || pathname?.includes('/register')
            ? 'mt-0 h-[100vh]'
            : pathname?.includes('/popular')
            ? 'mt-[101px] lg:mt-[81px]'
            : pathname?.includes('/profile') ||
              pathname?.includes('/user-activities')
            ? 'mt-[70px] md:mt-[101px]'
            : 'mt-[81px] md:mt-[101px]'
        }>
        <div className="flex max-w-[100vw]">
          {pathname?.includes('/login') || pathname?.includes('/register') ? (
            <>
              <ChildWrapper>{children}</ChildWrapper>
            </>
          ) : (
            <>
              <LeftSidebar token={token} user={user} />
              <ChildWrapper>{children}</ChildWrapper>
              <RightSideBar />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default RenderChildren

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
      className={`m-auto max-w-[1512px] p-[16px] transition-all duration-700 ease-in-out lg:p-0 
                    ${
                      isRegisterPage || isLoginPage
                        ? 'flex items-center justify-center'
                        : ''
                    }
                `}>
      <div
        className={isError ? 'mt-0' : 'mt-[81px] md:mt-[101px] lg:mt-[81px]'}>
        <div className="w-full lg:flex ">
          <LeftSidebar token={token} user={user} />
          <ChildWrapper>{children}</ChildWrapper>
          <RightSideBar />
        </div>
      </div>
    </div>
  )
}

export default RenderChildren

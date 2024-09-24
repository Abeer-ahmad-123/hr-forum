import { RenderChildrenProps } from '@/utils/interfaces/renderChildren'
import LeftSidebar from './LeftSidebar'
import RightSideBar from './RightSideBar'
import { getUserFromCookie } from '@/utils/cookies'

const RenderChildren = async ({
  isError,
  pathname,
  children,
}: RenderChildrenProps) => {
  const isRegisterPage = pathname === '/register'
  const isLoginPage = pathname === '/login'
  const isProfilePage = pathname === '/profile'
  const { token, user } = await getUserFromCookie()
  return (
    <div
      className={`m-auto max-w-[1512px] transition-all duration-700 ease-in-out max-md:py-5 max-sm:p-[10px] 
                    ${
                      isRegisterPage || isLoginPage
                        ? 'flex items-center justify-center'
                        : ''
                    }
                `}>
      <div className={isError ? 'mt-0' : 'mt-[101px]'}>
        <div className="flex w-full flex-row">
          <LeftSidebar token={token} user={user} />

          <div
            className={`md:basis-1/2 ${
              isProfilePage ? 'flex-1' : ''
            }  md:w-full`}>
            {children}
          </div>

          <RightSideBar isProfilePage={isProfilePage} />
        </div>
      </div>
    </div>
  )
}

export default RenderChildren

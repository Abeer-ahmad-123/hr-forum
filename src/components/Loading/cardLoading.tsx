import ChannelCardSkelton from '../ChannelCardSkelton'
import ProfileCardSkelton from '../ProfileCardSkelton'
import RulesCardSkelton from '../RuleCardSkelton'
import Skelton from '../ui/skelton'
import RenderFeedLoading from './renderFeedLoading'
import { headers } from 'next/headers'
import { getUserFromCookie } from '@/utils/cookies'

const CardLoading = async () => {
  const { user } = await getUserFromCookie()
  const renderTimes = 5
  const pathName = headers().get('x-pathname')

  const slug = pathName?.split('/')[2]

  return (
    <div
      className={`mt-4 flex justify-center max-md:mt-5  max-md:block max-md:w-full`}>
      <div className={`flex flex-col items-start  ${!user?.id ? ' pr-4' : ''}`}>
        {user?.id && <ProfileCardSkelton className={'max-md:hidden'} />}

        <div
          className={`${
            user?.id ? 'top-[40px]' : 'top-[70px] mt-[10px]'
          } sticky max-h-screen max-md:static`}>
          <ChannelCardSkelton className={'max-md:hidden'} />
        </div>
        <div
          className={`sticky ${
            user?.id ? 'top-[315px]' : 'top-[360px] mt-[20px]'
          }  max-h-screen`}></div>
      </div>

      <div className="flex w-full max-w-screen-md flex-col">
        {pathName?.includes(`/${slug}/`) ? (
          <div className="mb-4 mt-[25px] rounded-xl bg-white py-2 dark:bg-slate-800">
            <Skelton className="ml-4 h-8 w-24 rounded-sm bg-skelton" />
            <div className="mt-2 flex items-center">
              <div className="ml-4">
                <div className="flex flex-row gap-x-2">
                  <Skelton className="h-8 w-24 rounded-sm bg-skelton" />
                  <Skelton className="h-8 w-24  rounded-sm bg-skelton" />
                  <Skelton className="h-8 w-24 rounded-sm bg-skelton" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-5 mt-[10px]">
            <Skelton
              className={`${
                pathName == '/saved' || pathName?.includes('/channels')
                  ? 'h-[200px]'
                  : 'h-12'
              }  mt-[15px] w-full rounded-md bg-skelton`}
            />
          </div>
        )}

        {Array.from({ length: renderTimes }, (_, index) => (
          <RenderFeedLoading key={index} />
        ))}
      </div>

      <RulesCardSkelton className={'max-md:hidden'} user={user?.id} />
    </div>
  )
}

export default CardLoading

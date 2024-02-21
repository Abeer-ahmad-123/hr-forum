'use client'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import ChannelCardSkelton from '../ChannelCardSkelton'
import ProfileCardSkelton from '../ProfileCardSkelton'
import RulesCardSkelton from '../RuleCardSkelton'
import Skelton from '../ui/skelton'
import RenderFeedLoading from './renderFeedLoading'

function CardLoading() {
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const renderTimes = 5
  const pathName = usePathname()

  const slug = pathName.split('/')[2]

  return (
    <div
      className={`mt-8 flex justify-center max-md:mt-5  max-md:block max-md:w-full`}>
      <div className={`flex flex-col items-start  ${!token ? ' pr-4' : ''}`}>
        {token && <ProfileCardSkelton className={'max-md:hidden'} />}

        <div
          className={`${
            token ? 'top-[40px]' : 'top-[70px] mt-[10px]'
          } sticky max-h-screen max-md:static`}>
          <ChannelCardSkelton token={token} className={'max-md:hidden'} />
        </div>
        <div
          className={`sticky ${
            token ? 'top-[315px]' : 'top-[340px] mt-[20px]'
          }  max-h-screen`}>
          <RulesCardSkelton className={'max-md:hidden'} token={token} />
        </div>
      </div>

      <div className="flex w-full max-w-screen-md flex-col">
        {pathName.includes(`/${slug}/`) ? (
          <div className="mb-4 mt-[10px] rounded-xl bg-white py-2 dark:bg-slate-800">
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
                pathName == '/saved' || pathName.includes('/channels')
                  ? 'h-[200px]'
                  : 'h-12'
              }  w-full rounded-md bg-skelton`}
            />
          </div>
        )}

        {Array.from({ length: renderTimes }, (_, index) => (
          <RenderFeedLoading key={index} />
        ))}
      </div>
    </div>
  )
}

export default CardLoading

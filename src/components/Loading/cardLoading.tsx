'use client'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChannelCardSkelton from '../ChannelCardSkelton'
import ProfileCardSkelton from '../ProfileCardSkelton'
import RulesCardSkelton from '../RuleCardSkelton'
import Skelton from '../ui/skelton'
import RenderFeedLoading from './renderFeedLoading'

function CardLoading() {
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const renderTimes = 5
  const [hidden, setHidden] = useState<boolean>(false)
  const pathName = usePathname()
  const componentsArray = Array.from({ length: renderTimes }, (_, index) => (
    <RenderFeedLoading key={index} />
  ))
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  useEffect(() => {
    if (!token) {
      setHidden(true)
    }
  }, [token])
  return (
    <div>
      <div
        className={`mt-8 flex justify-center max-md:mt-5  max-md:block max-md:w-full`}>
        <div className={`flex flex-col ${hidden ? ' pr-4' : ''}`}>
          {token && <ProfileCardSkelton className={'max-md:hidden'} />}
          <Skelton className="mx-auto mb-2 hidden h-6 w-60  self-start  rounded-sm bg-skelton max-md:block" />

          <div
            className={`${
              token ? 'top-[40px]' : 'top-[70px]'
            } sticky max-h-screen max-md:static`}>
            <ChannelCardSkelton token={token} className={'max-md:hidden'} />
          </div>
          <div
            className={`sticky ${
              token ? 'top-[315px] ' : 'top-[335px] mt-[20px]'
            }  max-h-screen`}>
            <RulesCardSkelton className={'max-md:hidden'} token={token} />
          </div>
        </div>

        <div className="flex w-full max-w-screen-md flex-col">
          {pathName.includes(`/${userData.username}`) ? (
            <div className="mb-4 rounded-xl  bg-white py-2 dark:bg-slate-800">
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
            <div className="mb-5">
              <Skelton className="h-12 w-full rounded-md bg-skelton" />
            </div>
          )}

          <div> {componentsArray}</div>
        </div>
      </div>
    </div>
  )
}

export default CardLoading

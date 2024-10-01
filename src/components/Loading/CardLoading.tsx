'use client'
import { usePathname } from 'next/navigation'
import Skelton from '../ui/skelton'
import RenderFeedLoading from './renderFeedLoading'
import { useCallback, useEffect, useState } from 'react'
import { getTokens } from '@/utils/local-stroage'

const CardLoading = () => {
  const renderTimes = 5
  const pathName = usePathname()
  const slug = pathName?.split('/')[2]

  return (
    <div
      className={`mt-4 flex flex-col justify-center max-md:mt-5  max-md:block max-md:w-full`}>
      {!pathName.includes('user-activity') && (
        <div className="w-full rounded-xl">
          <Skelton className="h-24 w-full  rounded-xl bg-skelton" />
        </div>
      )}

      <div className="flex w-full max-w-full flex-col lg:max-w-screen-md">
        {pathName.includes(`/${slug}/`) ? (
          <div className="mb-4 mt-[25px] rounded-xl bg-white py-2 dark:bg-bg-primary-dark">
            <Skelton className="ml-4 h-8 w-24 rounded-sm bg-skelton" />
            <div className="mt-2 flex items-center ">
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
            {pathName == '/saved' || pathName.includes('/feeds') ? (
              <Skelton
                className={`h-104 mt-[15px] w-full rounded-md bg-skelton`}
              />
            ) : (
              <BannerCardLoading />
            )}
          </div>
        )}

        {Array.from({ length: renderTimes }, (_, index) => (
          <RenderFeedLoading key={index} />
        ))}
      </div>

      {/* <RulesCardSkelton className={'max-md:hidden'} token={token} /> */}
    </div>
  )
}

export default CardLoading

const BannerCardLoading = () => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedTokens = getTokens()
    if (storedTokens) {
      setToken(storedTokens?.accessToken)
    }
  }, [])

  if (!token) return

  return (
    <div className="h-[266px] rounded-xl bg-bg-primary px-2 dark:bg-bg-primary-dark">
      <Skelton className="mt-[15px] h-[190px] w-full rounded-md" />

      <div className="flex items-center justify-center px-5 pt-3">
        <Skelton className="mr-3 flex h-11 w-11 items-center justify-center rounded-full bg-bg-tertiary text-black dark:bg-dark-grey" />

        <div className="flex flex-1 justify-between">
          <Skelton className="h-11 w-28 rounded-md" />
          <Skelton className="h-11 w-24 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

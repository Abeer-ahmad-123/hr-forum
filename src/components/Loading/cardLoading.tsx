'use client'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
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
      className={`mt-4 flex justify-center max-md:mt-5  max-md:block max-md:w-full`}>

      <div className="flex w-full max-w-screen-md flex-col">
        {pathName.includes(`/${slug}/`) ? (
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
         {
         pathName == '/saved' || pathName.includes('/feeds') ?   <Skelton
              className={`h-12 mt-[15px] w-full rounded-md bg-skelton`}
            /> : <BannerCardLoading />
}
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


function BannerCardLoading() {
  return (
    <div className='bg-bg-primary rounded-xl'>
      <Skelton className='h-[200px] mt-[15px] w-full rounded-md bg-skelton' />

      <div className='flex my-5 pb-4 px-4'>

      <div className='flex text-black h-11 w-11 bg-bg-tertiary rounded-full items-center justify-center mr-3 dark:bg-dark-grey'>
      </div>

          <div className='flex justify-between flex-1'>
            <Skelton className='h-11  w-28 rounded-md bg-skelton' />
            <Skelton className='h-11 w-24 rounded-2xl bg-skelton' />
          </div>

      </div>

    </div>
  )
}
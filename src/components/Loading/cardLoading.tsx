'use client'
import { usePathname } from 'next/navigation'
import Skelton from '../ui/skelton'
import RenderFeedLoading from './renderFeedLoading'

function CardLoading() {
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
          <div className="mb-5">
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
    <div className='h-[266px] bg-bg-primary rounded-xl dark:bg-bg-primary-dark px-2'>
      <Skelton className='h-[190px] mt-[15px] w-full rounded-md' />

      <div className='flex items-center justify-center px-5 pt-3'>

        <Skelton className='flex text-black h-11 w-11 bg-bg-tertiary rounded-full items-center justify-center mr-3 dark:bg-dark-grey' />

        <div className='flex justify-between flex-1'>
          <Skelton className='h-11  w-28 rounded-md' />
          <Skelton className='h-11 w-24 rounded-2xl' />
        </div>

      </div>

    </div>
  )
}
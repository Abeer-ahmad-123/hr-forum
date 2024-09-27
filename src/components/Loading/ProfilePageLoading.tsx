'use client'
import PostLoadingSkelton from '../PostLoadingSkelton'
import { usePathname } from 'next/navigation'
import Skelton from '../ui/skelton'

const ProfilePageLoading = () => {
  const pathName = usePathname()
  return (
    <div>
      {!pathName.includes('user-activity') && (
        <div className="relative h-[350px] w-full max-w-[1105px]">
          <Skelton className="h-[245px] w-full rounded-2xl" />
          <div className="absolute bottom-0 left-0 right-0 top-[16rem]  h-[98px] w-full rounded-md   max-md:w-full">
            {/* edit button */}
            <div className="">
              <div className="absolute right-0 top-0 max-md:left-[180px] max-md:top-[80px]">
                <Skelton className="mt-[10px] h-[40px] w-[119px] rounded-[20px] md:mt-[78px] lg:mt-[10px]"></Skelton>
              </div>

              <div className="absolute right-[140px] top-0 max-md:left-[0px] max-md:top-[80px]">
                <Skelton className="mt-[10px] h-[40px] w-[154px] rounded-[20px] md:mt-[78px] lg:mt-[10px]"></Skelton>
              </div>
            </div>
            <div className="flex gap-[16px] px-4">
              {/* profile picture */}
              <Skelton className="ml-[70px] mt-[-11px] h-[60px] w-[98px] rounded-b-full max-md:ml-[16px] max-md:h-[66px] max-md:w-[112px]"></Skelton>
              <div className="mt-5 flex flex-col gap-3 max-md:mt-6">
                {/*name */}
                <Skelton className="h-[27px] w-[132px] rounded"></Skelton>
                {/* userman*/}

                {/* email*/}

                <Skelton className="h-[16px] w-[200px] rounded"></Skelton>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-[30px] flex max-w-[1105px] items-start justify-start">
        <div className="flex h-[88%] w-full gap-[20px] rounded-md max-md:w-full max-md:flex-col-reverse max-md:gap-[20px]">
          {/*right card */}
          <div className="flex w-full max-w-[759px] flex-col gap-[5px]">
            <div
              className={`max-w-[759px] cursor-pointer rounded-xl bg-bg-primary px-5 py-5 shadow-lg dark:bg-bg-primary-dark dark:text-gray-300 max-md:mt-4`}>
              <Skelton className="ml-4 h-8 w-24 rounded-sm bg-skelton" />
              <div className="mb-[20px] mt-[20px] flex items-center rounded-md bg-bg-secondary p-[5px] dark:bg-bg-tertiary-dark">
                <div className="ml-4">
                  <div className="flex flex-row gap-x-2">
                    <Skelton className="h-8 w-24 rounded-sm bg-skelton" />
                    <Skelton className="h-8 w-24  rounded-sm bg-skelton" />
                    <Skelton className="h-8 w-24 rounded-sm bg-skelton" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-5"></div>
              {/* <div>
                <Skelton className="w-54 ml-4 mt-4 h-10 rounded-md pl-[85px] pr-3 max-md:pl-6" />
                <Skelton className="w-54 ml-4 mt-4 h-10 rounded-md pl-[85px] pr-3 max-md:pl-6" />
                <Skelton className="w-54 ml-4 mt-4 h-10 rounded-md pl-[85px] pr-3 max-md:pl-6" />
                <Skelton className="w-54 ml-4 mt-4 h-10 rounded-md pl-[85px] pr-3 max-md:pl-6" />

                <Skelton className="ml-42 mx-auto mt-4 h-10 w-20 self-center rounded-md pl-[85px] pr-3 max-md:pl-6" />
              </div> */}
              {[1, 2, 3, 4].map((_, i) => (
                <PostLoadingSkelton key={i} index={i} />
              ))}
            </div>
          </div>
          {/*Left card */}
          <div>
            <Skelton className="mt-[20px] hidden h-[60px] w-full rounded-sm bg-primary dark:bg-bg-tertiary-dark max-md:block" />
          </div>
          {!pathName.includes('user-activity') && (
            <div className="hidden h-full max-h-[304px] w-full max-w-[326px]  rounded-[10px] bg-bg-primary px-6 pb-5 pt-7 shadow-lg dark:bg-bg-tertiary-dark md:block  ">
              <Skelton className="h-[22px] w-full max-w-[170px] rounded-sm" />
              <div className="flex flex-col gap-[20px] px-6 pb-5 pt-7 max-md:hidden">
                <Skelton className="h-[22px] w-full max-w-[170px] rounded-sm" />
                <Skelton className="h-[22px] w-full max-w-[170px] rounded-sm" />
                <Skelton className="h-[22px] w-full max-w-[170px] rounded-sm" />
                <Skelton className="h-[22px] w-full max-w-[170px] rounded-sm" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePageLoading

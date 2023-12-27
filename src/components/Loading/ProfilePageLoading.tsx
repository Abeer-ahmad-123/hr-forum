import React from 'react'
import Skelton from '../ui/skelton'

const ProfilePageLoading = () => {
  return (
    <>
      <div>
        <div className=" h-[500px] w-full ">
          <Skelton className="h-[200px] w-full rounded-md " />
          <section>
            <div>
              <div className=" mx-auto flex min-h-[23vh] w-[80%] justify-center  rounded-md bg-white">
                <div className=" flex flex-col items-center  ">
                  <Skelton className="mt-0 h-[40px] w-[80px] rounded-bl-[150px] rounded-br-[150px]" />
                  <div className="flex flex-col items-center pt-5">
                    <div className=" flex flex-col items-center max-md:flex-row">
                      <Skelton className=" mt-2 h-8 w-44 rounded-md  max-md:w-24 max-[380px]:w-12" />
                      <Skelton className=" mt-2 h-6 w-36 rounded-md max-md:ml-2 max-md:w-28 max-[380px]:w-12" />
                    </div>
                    <div className="flex gap-x-3 max-[400px]:flex-col">
                      <Skelton className=" mt-2 h-4 w-44 rounded-sm max-md:w-20 max-[380px]:w-24" />
                      <Skelton className=" mt-2 h-4 w-44 rounded-sm max-md:w-24 max-[380px]:w-24" />
                      <Skelton className=" mt-2 h-4 w-44 rounded-sm max-md:w-24 max-[380px]:w-24" />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" max-md:-gap-[4rem] mx-auto mt-4 flex  w-[80%] gap-x-[4rem] max-md:flex-col">
                <div className=" flex min-w-[15rem] flex-row gap-x-2 rounded-md bg-white max-md:w-full max-[350px]:w-[8rem] ">
                  <div className=" flex flex-col gap-y-2 pl-4 pt-4">
                    <Skelton className="h-4 w-4 rounded-full" />
                    <Skelton className="h-4 w-4 rounded-full" />
                    <Skelton className="mb-4 h-4 w-4 rounded-full" />
                  </div>
                  <div className="flex w-full flex-col gap-y-2 pl-4 pt-4">
                    <Skelton className="h-4 w-[90%] rounded-sm" />
                    <Skelton className="h-4 w-[90%] rounded-sm" />
                    <Skelton className="mb-4  h-4 w-[90%] rounded-sm" />
                  </div>
                </div>

                <div className="w-full cursor-pointer rounded-xl bg-white px-5 py-5  shadow-lg dark:bg-slate-800 dark:text-gray-300 max-md:mt-4">
                  <div className=" flex">
                    <Skelton className="h-6 w-6  rounded-full" />
                    <Skelton className="ml-2 h-6  w-24 rounded-md" />
                  </div>
                  <div>
                    <Skelton className="w-54 ml-7 mt-2 h-10 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default ProfilePageLoading

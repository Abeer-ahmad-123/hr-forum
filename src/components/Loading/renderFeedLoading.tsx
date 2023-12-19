import Skelton from '@/components/ui/skelton'

const RenderFeedLoading = () => {
  return (
    <div className="">
     <div className="mx-auto mb-5 max-w-screen-md cursor-pointer rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
      
          <div className="px-4 py-4">

            <div className="flex items-center justify-between max-md:block">
              <div className="flex items-center">
                <div className="-z-2">
                 
                  <Skelton className="h-8 w-8 rounded-full bg-skelton" />

                 
                </div>


                <div className="ml-2 flex flex-col align-baseline items-start">
                 <div> 
                  <div className='flex flex-row gap-x-2'>
                  <Skelton className="h-6 w-24 rounded-sm bg-skelton" />
                  <Skelton className="h-4 w-20  rounded-sm bg-skelton" />
                  </div>
                  <Skelton className=" mt-2 h-4 w-20  rounded-sm bg-skelton" />
                  </div>

                  
                </div>

              </div>

         
            </div>


            <div className="flex flex-col">
              <div className="my-3 text-justify text-[28px] font-semibold dark:text-white">
              <Skelton className="h-12 w-full rounded-md  bg-skelton" />

              </div>
              <div
                className="text-justify text-gray-700 text-[15px] dark:text-gray-300"
                
              >           <Skelton className="h-32 w-full rounded-md bg-skelton" />
              </div>
            </div>
          </div>
        
        <hr />

        <div className="py-1 mx-5">
          <div className='flex items-center  justify-around flex-row  '>
          <Skelton className="h-7 mx-1 w-24 rounded-md bg-skelton" />
          <Skelton className="h-7  mx-1 w-24 rounded-md bg-skelton" />
          <Skelton className="h-7  mx-1 w-24 rounded-md bg-skelton" />
          <Skelton className="h-7  mx-1 w-24 rounded-md bg-skelton" />

          </div>
        </div>
      </div >
    </div>
  )
}

export default RenderFeedLoading

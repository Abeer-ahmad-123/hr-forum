import Skelton from '@/components/ui/skelton'

const RenderFeedLoading = () => {
  return (
    <div className="">
     <div className="mx-auto mb-5 max-w-screen-md cursor-pointer rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
      
          <div className="px-10 py-4">

            <div className="flex items-center justify-between max-md:block">
              <div className="flex items-center">
                <div className="-z-2">
                 
                  <Skelton className="h-8 w-8 rounded-full bg-skelton" />

                 
                </div>


                <div className="ml-2 flex flex-col align-baseline items-start">
                  <div className='flex flex-row'>
                  <Skelton className="h-10 w-40 rounded-md bg-skelton" />


                  </div>

                  
                </div>

              </div>

         
            </div>


            <div className="flex flex-col">
              <div className="my-3 text-justify text-[28px] font-semibold dark:text-white">
              <Skelton className="h-28 w-full rounded-md  bg-skelton" />

              </div>
              <div
                className="text-justify text-gray-700 text-[15px] dark:text-gray-300"
                
              >           <Skelton className="h-40 w-full rounded-md bg-skelton" />
              </div>
            </div>
          </div>
        
        <hr />

        <div className="py-2">
          <div className='flex items-center  justify-center flex-row gap-x-4 '>
          <Skelton className="h-12 w-40 rounded-md bg-skelton" />
          <Skelton className="h-12 w-40 rounded-md bg-skelton" />
          <Skelton className="h-12 w-40 rounded-md bg-skelton" />
          <Skelton className="h-12 w-40 rounded-md bg-skelton" />

          </div>
        </div>
      </div >
    </div>
  )
}

export default RenderFeedLoading

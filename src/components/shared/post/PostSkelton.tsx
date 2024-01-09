import Skelton from '../../ui/skelton'
import CommentSkelton from '../CommentSkelton'

async function PostSkelton({ isDialogPost = false }) {
  return (
    <div className="mx-auto my-5 h-screen max-w-5xl rounded-full">
      <div
        className={`mx-auto mb-5 flex max-w-screen-lg cursor-pointer rounded-xl bg-white
      ${!isDialogPost && 'shadow-lg'} 
      dark:bg-dark-primary dark:text-gray-300`}>
        <div className="flex w-full flex-col items-center p-10 pl-4 pt-0">
          <div className="mb-5 h-fit w-full  cursor-pointer rounded-xl bg-white  dark:bg-slate-800 dark:text-gray-300">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between max-md:block">
                <div className="flex items-center">
                  <div className="-z-2">
                    <Skelton className="h-8 w-8 rounded-full  bg-skelton" />
                  </div>

                  <div className="ml-2 flex flex-col items-start align-baseline">
                    <div>
                      <div className="flex flex-row gap-x-2">
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
                <div className="text-justify text-[15px] text-gray-700 dark:text-gray-300">
                  {' '}
                  <Skelton className="h-32 w-full rounded-md bg-skelton" />
                </div>
              </div>
            </div>

            <hr />

            <div className="mx-5 py-1">
              <div className="flex flex-row  items-center justify-around  ">
                <Skelton className="mx-1 h-7 w-24 rounded-md bg-skelton" />
                <Skelton className="mx-1  h-7 w-24 rounded-md bg-skelton" />
                <Skelton className="mx-1  h-7 w-24 rounded-md bg-skelton" />
                <Skelton className="mx-1  h-7 w-24 rounded-md bg-skelton" />
              </div>
            </div>
          </div>
          <div className="w-full">{<CommentSkelton />}</div>
        </div>
      </div>
    </div>
  )
}

export default PostSkelton

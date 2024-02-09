import Skelton from '@/components/ui/skelton'

interface PostLoadingSkeltonProps {
  index: number
}

const PostLoadingSkelton = ({ index }: PostLoadingSkeltonProps) => {
  return (
    <div
      className={`'my-2' w-full ${
        index == 3 ? 'rounded-b-xl' : ''
      } cursor-pointer bg-white px-5 py-5 dark:bg-slate-800 dark:text-gray-300 max-md:mt-4`}>
      <div className="flex items-center">
        <Skelton className="h-12 w-12  rounded-full" />
        <div className="ml-4">
          <div className="flex flex-row gap-x-2">
            <Skelton className="h-6 w-24 rounded-sm bg-skelton" />
            <Skelton className="h-4 w-20  rounded-sm bg-skelton" />
          </div>
          <Skelton className=" mt-3 h-4 w-20  rounded-sm bg-skelton" />
        </div>
      </div>
      <div className="ml-4 flex flex-col items-start align-baseline"></div>
      <div className="ml-16 flex flex-col">
        <Skelton className="w-54 mb-2 mt-2 h-10 rounded-md pl-[85px] pr-3 max-md:pl-6" />
        <Skelton className="h-6 w-24 rounded-sm bg-skelton pb-4" />
      </div>
    </div>
  )
}

export default PostLoadingSkelton

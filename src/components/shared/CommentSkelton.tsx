import Skelton from '@/components/ui/skelton'
import ReplySkelton from './ReplySkelton'

function CommentSkelton() {
  return (
    <div className="mt-4  rounded-lg">
      <div className="flex items-center px-5 pt-5">
        <div className="flex  ">
          <Skelton className="h-12 w-12 rounded-full bg-skelton" />
          <div className="w-60">
            <Skelton className="ml-2  h-20 rounded-md bg-skelton" />
          </div>
        </div>
      </div>
      <ReplySkelton />
      <ReplySkelton />
    </div>
  )
}

export default CommentSkelton

import UpdownButton from '../ui/updownButton'
// import Image from 'next/image'
// import picture from '@/assets/avatars/img.jpeg'
// import { MoreHorizontal } from 'lucide-react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import Skelton from '@/components/ui/skelton'
import ReplySkelton from './ReplySkelton'
import { Button } from '@/components/ui/button'
import UpdownButtonSkelton from './UpDownButtonSkelton'

function CommentSkelton() {
  return (
    <div className="mt-4  rounded-lg">
      <div className="flex items-center px-5 pt-5">
        <div className="flex  ">
          <Skelton className="h-8 w-8 rounded-full bg-skelton" />
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

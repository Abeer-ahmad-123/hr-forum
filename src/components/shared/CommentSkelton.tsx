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
    <div className="mt-4 w-full rounded-lg bg-slate-100">
      <div className="flex pl-5 pr-5 pt-5">
        <div className="flex flex-col items-center">
          <Skelton className="h-8 w-8 rounded-full bg-skelton" />

          {/* UpDown Button */}
          <div className="ml-6">
            <UpdownButtonSkelton />
          </div>
          {/* End of Button */}
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between">
            <Skelton className="w-32 rounded-lg" />
            <Skelton className="h-8 w-24 rounded-lg  pr-5" />
          </div>
          <Skelton className="mt-10 h-32 w-full rounded-lg  p-7 pl-0 text-left" />
          <div className="flex  justify-between pr-5">
            <div className="flex space-x-5 ">
              <Skelton className=" mt-4 h-8 w-12 rounded-lg " />
              <Skelton className="mt-4 h-8 w-12 rounded-lg " />
              <Skelton className="mt-4 h-8 w-12 rounded-lg  " />
            </div>

            <Skelton className="mt-4 h-8 w-12 rounded-lg " />
          </div>
        </div>
      </div>
      <ReplySkelton />
      <ReplySkelton />
    </div>
  )
}

export default CommentSkelton

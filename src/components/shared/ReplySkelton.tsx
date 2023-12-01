import UpdownButton from '../ui/updownButton'
import Image from 'next/image'
import picture from '@/assets/avatars/img.jpeg'
import { MoreHorizontal } from 'lucide-react'
import Skelton from '@/components/ui/skelton'
import UpdownButtonSkelton from './UpDownButtonSkelton'
function ReplySkelton() {
  return (
    <div className="ml-16 mt-4 rounded-lg">
      <div className="flex pl-5 pr-5 pt-5">
        <div className="flex  flex-col items-center">
          <Skelton className="h-8 w-8 rounded-full bg-skelton" />
          <div className="ml-6">
            <UpdownButtonSkelton />
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between">
            <Skelton className=" w-32 rounded-lg" />
            <Skelton className="h-8 w-24 rounded-lg pr-5" />
          </div>

          <Skelton className="mr-2 mt-10 h-32 w-full rounded-lg p-7 pl-0 text-left" />
          <div className="flex  justify-between pb-5 pr-5">
            <div className="flex space-x-5 ">
              <Skelton className="mt-4 h-8 w-12 rounded-lg " />
              <Skelton className="mt-4 h-8 w-12 rounded-lg " />
              <Skelton className="mt-4 h-8 w-12 rounded-lg  " />
            </div>

            <Skelton className="mt-4 h-8 w-12 rounded-lg " />
          </div>
        </div>

        {/*  */}

        {/*  */}
      </div>
    </div>
  )
}

export default ReplySkelton

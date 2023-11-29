
import UpdownButton from '../ui/updownButton';
// import Image from 'next/image'
// import picture from '@/assets/avatars/img.jpeg'
// import { MoreHorizontal } from 'lucide-react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import Skelton from '@/components/ui/skelton';
import ReplySkelton from './ReplySkelton'
import { Button } from '@/components/ui/button'
import UpdownButtonSkelton from './UpDownButtonSkelton';

function CommentSkelton() {

    return (
        <div className='bg-slate-100 w-full rounded-lg mt-4'>
            <div className="flex pt-5">
                <div className='flex flex-col items-center'>
                    <Skelton className='rounded-full bg-skelton h-8 w-8' />
                    <div className='pl-5'>

                        {/* UpDown Button */}

                        <UpdownButtonSkelton />

                        {/* End of Button */}

                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex justify-between w-full'>
                        <Skelton className='w-32' />
                        <Skelton className='w-24 h-8 pr-5' />
                    </div>
                    <Skelton className='w-full p-7 pl-0 h-32 mt-10 text-left'
                    />
                    <div className="flex  pr-5 justify-between">
                        <div className='flex space-x-5 '>
                            <Skelton className=" h-8 w-12 mt-4 " />
                            <Skelton className=" h-8 w-12 mt-4 " />
                            <Skelton className=" h-8 w-12 mt-4  " />
                        </div>

                        <Skelton className=" h-8 w-12 mt-4 " />
                    </div>
                </div>
            </div>
            <ReplySkelton />
            <ReplySkelton />


        </div>
    )
}

export default CommentSkelton

import UpdownButton from '../ui/updownButton';
import Image from 'next/image'
import picture from '@/assets/avatars/img.jpeg'
import { MoreHorizontal } from 'lucide-react'
import Skelton from '@/components/ui/skelton';
import UpdownButtonSkelton from './UpDownButtonSkelton';
function ReplySkelton() {

    return (
        <div className='rounded-lg mt-4 ml-16'>

            <div className="flex pt-5">

                <div className='flex  flex-col items-center'>
                    
                    <Skelton className='rounded-full bg-skelton h-8 w-8' />
                    
                    <div className='pl-5'>
                        <UpdownButtonSkelton />
                    </div>
                </div>
                <div className='flex flex-col w-full'>


                    <div className='flex justify-between w-full'>
                    <Skelton className='w-32'/>
                        <Skelton className='w-24 h-8 pr-5' />
                    </div>

                    <Skelton className='w-full p-7 pl-0 h-32 mt-10 text-left'
          />
                    <div className="flex  pr-5 pb-5 justify-between">
                        <div className='flex space-x-5 '>
                        <Skelton className=" h-8 w-12 mt-4 " />
                            <Skelton className=" h-8 w-12 mt-4 " />
                            <Skelton className=" h-8 w-12 mt-4  " />
                        </div>

                        <Skelton className=" h-8 w-12 mt-4 " />
                    </div>



                </div>

                {/*  */}

                {/*  */}


            </div>


        </div>
    )
}

export default ReplySkelton
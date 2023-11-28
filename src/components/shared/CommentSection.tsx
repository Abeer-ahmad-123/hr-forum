
import UpdownButton from '../ui/updownButton';
import Image from 'next/image'
import picture from '@/assets/avatars/img.jpeg'
import { MoreHorizontal } from 'lucide-react'
import Reply from './Reply'
function CommentSection() {

    return (
        <div className='bg-slate-100 w-full rounded-lg mt-4'>

            <div className="flex pt-5">

                <div className='flex  flex-col items-center'>
                    <div className=''>
                        <img src='https://avatar.iran.liara.run/public/boy' className='h-8 w-8 rounded-full' />
                    </div>
                    <div className='pl-5'>
                        <UpdownButton />
                    </div>
                </div>
                <div className='flex flex-col w-full'>


                    <div className='flex justify-between w-full'>
                        <div className='text-accent'>Nischal Kharel</div>
                        <div className='text-gray-500 italic pr-5'>12hr ago</div>
                    </div>

                    <div className='w-full p-7 pl-0 pt-3 mt-0 text-gray-600 dark:text-white leading-loose h-full'>
                        adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo odio aenea
                    </div>
                    <div className="flex  pr-5 justify-between">
                        <div className='flex space-x-5 '>
                            <button className="text-gray-400 text-sm ">Reply</button>
                            <button className="text-gray-400  text-sm">Share</button>
                            <button className="text-gray-400 text-sm">Report</button>
                        </div>

                        <MoreHorizontal
                            className='text-gray-400'
                        />
                    </div>
                </div>



            </div>

            <Reply />
            <Reply />


        </div>
    )
}

export default CommentSection
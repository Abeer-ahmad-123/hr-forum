'use client'
import { useState, useRef, useEffect } from 'react';
import UpdownButton from '../ui/updownButton';
import ReplyTextArea from './ReplyTextArea';
import { useSearchParams } from 'next/navigation';
function Reply({ reply, commentLength }) {

    const replyRef = useRef(null);
    const searchParams = useSearchParams();
    console.log(searchParams?.get('replyId'))
    const replyIdFromUrl = searchParams?.get('replyId')
    const [highlighted, setHighlighted] = useState(false);

    useEffect(() => {
        console.log("Id from url", typeof replyIdFromUrl)
        console.log("Id from reply", typeof reply.id)

        if ((commentLength === 1) && replyIdFromUrl && replyIdFromUrl === reply.id.toString()) {

            replyRef.current.scrollIntoView({ behavior: 'smooth' })


            setHighlighted(true);
            setTimeout(() => setHighlighted(false), 1000);
        }
    }, [replyIdFromUrl, reply.id]);


    const convertDate = (date: Date) => {
        const providedDateTime = new Date(date);
        const currentDateTime = new Date();
        const timeDifference = currentDateTime.getTime() - providedDateTime.getTime();

        // Convert the time difference to days, hours, and minutes
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursAgo = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesAgo = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        // Return the result
        if (daysAgo > 0) {
            return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
        } else if (hoursAgo > 0) {
            return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
        } else if (minutesAgo > 0) {
            return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`;
        } else {
            return 'just now';
        }
    };

    return (
        <div
            ref={replyRef}
            id={`reply-${reply.id}`}
            className={`rounded-lg mt-4 ml-16 ${highlighted ? 'animate-pulse border-2 border-primary' : ''}`}>
            <div className="flex pt-5">

                <div className='flex  flex-col items-center'>
                    <div className=''>
                        <img src={reply['author_details'].profile_picture_url} className='h-8 w-8 rounded-full' />
                    </div>
                    <div className='pl-5'>
                        <UpdownButton count={reply['reaction_summary']['like_count']} />
                    </div>
                </div>
                <div className='flex flex-col w-full'>


                    <div className='flex justify-between w-full'>
                        <div className='text-accent'>{reply['author_details'].name}</div>
                        <div className='text-gray-500 italic pr-5'>{convertDate(reply.created_at)}</div>
                    </div>

                    <div className='w-full text-left p-7 pl-0 pt-3 mt-0 text-gray-600 dark:text-white leading-loose h-full'>
                        {reply.content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reply
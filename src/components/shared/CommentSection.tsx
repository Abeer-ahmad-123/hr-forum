import UpdownButton from '../ui/updownButton';
import ReplyTextArea from './ReplyTextArea';
import { Send } from 'lucide-react'
import Reply from './Reply'
function CommentSection({ comment }: any) {


    const convertDate = (date: string) => {
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

        <div>

            <div className={`flex mb-2 items-center`}>

                <textarea
                    rows={1} style={{
                        caretColor: 'gray',
                    }}
                    className={`w-full h-24  pl-1 mr-4 border border-gray-300 rounded-lg`} />
                <button className='bg-primary text-white px-2 h-8 rounded-lg'>
                    <Send
                        size={20} /> </button>
            </div>


            <div className='bg-slate-100 w-full rounded-lg mt-4'>
                <div className="flex pt-5">
                    <div className='flex  flex-col items-center'>
                        <div className=''>
                            <img src={comment['author_details'].profile_picture_url} className='h-8 w-8 rounded-full' />
                        </div>
                        <div className='pl-5'>
                            {/* To be implemented */}
                            <UpdownButton count={comment['reaction_summary']['like_count']} />
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>

                        <div className='flex justify-between w-full'>
                            <div className='text-accent'>{comment['author_details'].name}</div>
                            <div className='text-gray-500 italic pr-5'>{convertDate(comment.created_at)}</div>
                        </div>

                        <div className='w-full p-7 pl-0 pt-3 mt-0 text-left text-gray-600 dark:text-white leading-loose h-full'>
                            {comment.content}
                        </div>


                        {/* <div className="flex  pr-5 justify-between">
                    <div className='flex space-x-5 '>
                        <button className="text-gray-400 text-sm ">Reply</button>
                        <button className="text-gray-400  text-sm">Share</button>
                        <button className="text-gray-400 text-sm">Report</button>
                    </div>

                    <MoreHorizontal
                        className='text-gray-400'
                    />
                </div> */}

                        <ReplyTextArea />
                    </div>
                </div>

                {comment.replies.length !== 0 &&
                    comment.replies.map((reply: any) => {
                        return <Reply key={reply.id} reply={reply} />
                    })}
            </div>
        </div>
    )
}

export default CommentSection
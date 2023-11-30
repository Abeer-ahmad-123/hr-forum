import UpdownButton from '../ui/updownButton';
import ReplyTextArea from './ReplyTextArea';
function Reply({ reply }) {

    const convertDate = (date) => {
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
        <div className='rounded-lg mt-4 ml-16'>
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

                    <ReplyTextArea />

                </div>
            </div>
        </div>
    )
}

export default Reply
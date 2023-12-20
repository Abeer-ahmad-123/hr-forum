import Image from 'next/image'
import CommentActions from './CommentActions'

const CommentCard = ({ comment }: any) => {
  if (!comment) {
    return
  }

  return (
    <div className="mb-4 rounded-lg bg-white dark:bg-dark-primary">
      <div className="mt-[38px] flex items-start space-x-4">
        <Image
          className="rounded-full object-cover"
          width={40}
          height={40}
          src={comment.user.image.webp}
          alt="comment-avatar"
        />
        <div className="flex-grow">
          <span className="mr-2 text-base font-medium ">
            {comment.user.username}
          </span>
          <span className="text-sm text-gray-600 dark:text-white">
            {comment.content}
          </span>
          <CommentActions />
        </div>
        <div className="ml-auto"></div>
      </div>
    </div>
  )
}

export default CommentCard

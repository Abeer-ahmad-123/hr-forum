import { Reply } from 'lucide-react'

const LoadMoreReplyButton = ({
  total_replies,
  repliesLength,
  commentId,
  getAllReplies,
}: any) => {
  const remianingReplies = total_replies - repliesLength
  return (
    <>
      {total_replies > 2 && repliesLength < total_replies && (
        <button
          className="mb-3 mt-3 flex w-full items-center gap-2.5 rounded-lg px-2 py-1 text-start text-sm text-gray-500"
          id={commentId}
          onClick={getAllReplies}>
          <span className="rotate-180">
            <Reply />
          </span>
          View
          {remianingReplies === 1 ? ' 1 reply' : ` ${remianingReplies} replies`}
        </button>
      )}
    </>
  )
}

export default LoadMoreReplyButton

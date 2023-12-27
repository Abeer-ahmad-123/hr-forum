import React from 'react'

const LoadMoreReplyButton = ({
  total_replies,
  repliesLength,
  commentId,
  getAllReplies,
}: any) => {
  return (
    <>
      {total_replies > 2 && repliesLength < total_replies && (
        <button
          className="mt-4 rounded-lg px-2 py-1 text-sm uppercase text-accent"
          id={commentId}
          onClick={getAllReplies}>
          Load More Replies
        </button>
      )}
    </>
  )
}

export default LoadMoreReplyButton

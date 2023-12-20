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
          className="mt-4 rounded-lg bg-accent bg-opacity-50 p-2 text-white hover:bg-opacity-30"
          id={commentId}
          onClick={getAllReplies}
        >
          Load More
        </button>
      )}
    </>
  )
}

export default LoadMoreReplyButton

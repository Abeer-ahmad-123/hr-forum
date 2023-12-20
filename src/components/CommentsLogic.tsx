'use client'

import PostActionBar from '@/components/shared/PostActionBar'
import Comments from './shared/post/Comments'
import { useRef, useState } from 'react'

function CommentsLogic({ postId, commentResult, paginationResult }) {
  const inputRef = useRef(null)

  return (
    <div>
      <PostActionBar
        linkToFeed={`/feeds/feed/${postId}`}
        postId={postId}
        inputRef={inputRef}
      />
      <Comments
        postId={postId}
        initialComments={commentResult}
        pagination={paginationResult}
        inputRef={inputRef}
      />
    </div>
  )
}

export default CommentsLogic

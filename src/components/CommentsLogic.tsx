'use client'

import PostActionBar from '@/components/shared/PostActionBar'
import Comments from './shared/post/Comments'
import { useRef, useState } from 'react'

function CommentsLogic({
  postId,
  commentResult,
  paginationResult,
  bookmark,
  user_reaction,
}: any) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div>
      <PostActionBar
        bookmark={bookmark}
        linkToFeed={`/feeds/feed/${postId}`}
        postId={postId}
        inputRef={inputRef}
        user_reaction={user_reaction}
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

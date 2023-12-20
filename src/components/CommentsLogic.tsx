'use client'

import PostActionBar from '@/components/shared/PostActionBar'
import Comments from './shared/post/Comments'
import { useState } from 'react'

function CommentsLogic({ postId, commentResult, paginationResult }) {
  const [shouldFocusInput, setShouldFocusInput] = useState(false)

  const handleShouldFocusInput = () => {
    console.log('about to focus input')
    setShouldFocusInput((pre) => !pre)
  }
  return (
    <div>
      <PostActionBar
        linkToFeed={`/feeds/feed/${postId}`}
        postId={postId}
        handleFocus={handleShouldFocusInput}
      />
      <Comments
        postId={postId}
        initialComments={commentResult}
        pagination={paginationResult}
        shouldFocus={shouldFocusInput}
      />
    </div>
  )
}

export default CommentsLogic

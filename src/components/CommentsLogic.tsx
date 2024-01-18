'use client'

import PostActionBar from '@/components/shared/PostActionBar'
import { useRef } from 'react'
import Comments from './shared/post/Comments'

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
        userReaction={user_reaction}
        setUserReaction={() => {}}
        setBookmarkupdated={() => {}}
        updateReactionArray={() => {}}
        reactionSummary={{
          like_count: 0,
          love_count: 0,
          clap_count: 0,
          celebrate_count: 0,
        }}
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

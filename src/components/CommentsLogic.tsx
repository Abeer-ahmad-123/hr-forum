'use client'

import PostActionBar from '@/components/shared/PostActionBar'
import { useRef } from 'react'
import Comments from './shared/post/Comments'

const CommentsLogic = ({
  postId,
  commentResult,
  paginationResult,
  bookmark,
  user_reaction,
  getPostCommets,
  getPost,
}: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div>
      <PostActionBar
        postId={postId}
        inputRef={inputRef}
        userReaction={user_reaction}
        setUserReaction={() => {}}
        updateReactionArray={() => {}}
        reactionSummary={{
          like_count: 0,
          love_count: 0,
          clap_count: 0,
          celebrate_count: 0,
        }}
        getPost={getPost}
        disableReactionButton={false}
        setDisableReactionButton={() => {}}
      />
      <Comments
        postId={postId}
        initialComments={commentResult}
        pagination={paginationResult}
        inputRef={inputRef}
        getPostCommets={getPostCommets}
      />
    </div>
  )
}

export default CommentsLogic

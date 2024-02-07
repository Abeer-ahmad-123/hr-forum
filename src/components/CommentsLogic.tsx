'use client'

import PostActionBar from '@/components/shared/PostActionBar'
import { useRef, useState } from 'react'
import Comments from './shared/post/Comments'

const CommentsLogic = ({
  postId,
  commentResult,
  paginationResult,
  bookmark,
  user_reaction,
  getPostCommets,
  getPost,
  setCommentCount,
}: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [disableReactionButton, setDisableReactionButton] =
    useState<boolean>(false)

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
        disableReactionButton={disableReactionButton}
        setDisableReactionButton={setDisableReactionButton}
        setCommentCount={setCommentCount}
        userComment={{ id: '' }}
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

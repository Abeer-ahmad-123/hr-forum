'use client'

import PostActionBar from '@/components/shared/PostActionBar'
import { useEffect, useRef, useState } from 'react'
import Comments from './shared/post/Comments'
import { EmojiActionInterface, ReactionSummary } from '@/utils/interfaces/card'

const CommentsLogic = ({
  postId,
  commentResult,
  paginationResult,
  user_reaction,
  reaction_summary,
  getPostCommets,
  reactionSummary,
  setReactionSummary,
  user,
  token,
}: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [disableReactionButton, setDisableReactionButton] =
    useState<boolean>(false)
  const [userReaction, setUserReaction] = useState('')
  const updateReactionArray = (
    reactionArray: ReactionSummary,
    reactionObject: EmojiActionInterface,
  ) => {
    if (reactionObject.action === 'post') {
      incrementReactionCount(
        `${reactionObject.value}_count`,
        reactionObject.value,
      )
    } else if (reactionObject.action === 'update') {
      updateReactions(
        `${reactionObject.value}_count`,
        `${reactionObject.previousAction}_count`,
        reactionObject.value,
      )
    } else if (reactionObject.action === 'delete') {
      deleteReaction(`${reactionObject.value}_count`, reactionObject.value)
    }
  }

  const updateReactions = (
    increment: string,
    decrement: string,
    value: string,
  ) => {
    setReactionSummary({
      ...reactionSummary,
      [increment]: reactionSummary[increment as keyof ReactionSummary] + 1,
      [decrement]: reactionSummary[decrement as keyof ReactionSummary] - 1,
    })
  }

  const incrementReactionCount = (increment: string, value: string) => {
    setReactionSummary({
      ...reactionSummary,
      [increment]: reactionSummary[increment as keyof ReactionSummary] + 1,
    })
  }
  const deleteReaction = (decrement: string, value: string) => {
    setReactionSummary({
      ...reactionSummary,
      [decrement]: reactionSummary[decrement as keyof ReactionSummary] - 1,
    })
  }

  useEffect(() => {
    setUserReaction(user_reaction)
  }, [user_reaction])

  useEffect(() => {
    if (reaction_summary) {
      setReactionSummary(reaction_summary)
    }
  }, [reaction_summary])

  return (
    <div className="flex flex-col gap-[20px]">
      <PostActionBar
        postId={postId}
        inputRef={inputRef}
        userReaction={userReaction}
        setUserReaction={setUserReaction}
        updateReactionArray={updateReactionArray}
        reactionSummary={reactionSummary}
        disableReactionButton={disableReactionButton}
        setDisableReactionButton={setDisableReactionButton}
        userComment={{ id: '' }}
        updatePosts={() => {}}
        posts={[]}
        totalComments={0}
        getUserSpecificDetailFunc={() => {}}
        userFlag={user ? true : false}
        token={token}
      />
      <Comments
        postId={postId}
        initialComments={commentResult}
        pagination={paginationResult}
        inputRef={inputRef}
        getPostCommets={getPostCommets}
        user={user}
        token={token}
      />
    </div>
  )
}

export default CommentsLogic

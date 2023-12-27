'use client'
import React, { useState, useCallback, useEffect, MouseEvent } from 'react'
import { reactionOptions } from '@/utils/data'
import { useScreenSize } from '@/hooks/responsiveness/useScreenSize'
import { ReactionEmoji } from '.'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useSelector } from 'react-redux'

const ReactionButton = ({
  onReact,
  post,
  userReaction,
  loading,
  handleLikeWrapper,
}: any) => {
  const { isLargeScreen } = useScreenSize(1024)
  const [currentReaction, updateCurrentReaction] = useState(userReaction)
  const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''

  const handleLikeWrapperExtended = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!handleLikeWrapper()) {
      handleReactionEmoji()
    }
  }

  const selectReaction = useCallback(
    (reactionName: any) => {
      updateCurrentReaction((prevReaction: string) =>
        prevReaction === reactionName ? 'none' : reactionName,
      )
      onReact(reactionName, reactionName !== 'none')
    },
    [onReact], // Removed currentReaction and post
  )

  const toggleHeartReaction = useCallback(() => {
    const newReaction = currentReaction === 'none' ? 'love' : 'none'
    updateCurrentReaction(newReaction)
    onReact(newReaction, newReaction !== 'none')
  }, [onReact, currentReaction]) // Removed post
  const handleReactionEmoji = () => {
    if (tokenInRedux) {
      !loading && isLargeScreen && toggleHeartReaction()
    }
  }
  const currentReactionEmoji = reactionOptions.find(
    (reaction) => reaction.name === currentReaction,
  )

  const mouseEnter = () => {
    if (tokenInRedux) !loading && setEmojiPopoverVisible(true)
  }

  useEffect(() => {
    if (userReaction?.reactionType)
      updateCurrentReaction(userReaction?.reactionType?.toLowerCase())
  }, [userReaction?.reactionType])

  return (
    <Popover open={emojiPopoverVisible} onOpenChange={setEmojiPopoverVisible}>
      <PopoverTrigger asChild>
        <button
          onMouseEnter={mouseEnter}
          className="dark:text-icon-dark flex basis-1/4 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-300 dark:text-gray-300 dark:hover:text-slate-800"
          onClick={handleLikeWrapperExtended}>
          <div className="flex flex-col items-center">
            {/* Align the children in the center */}
            <ReactionEmoji
              reactionName={currentReactionEmoji?.name || 'none'}
              emojiCharacter={currentReactionEmoji?.emoji || '♡'}
              isReactionSelected={false}
              onEmojiClick={handleReactionEmoji}
            />
            {/* Add a small number under the heart emoji */}
            <span className=" text-xs text-gray-600 dark:text-white">
              {post?.totalReactionCount}
            </span>
          </div>
          <div className="font-light max-custom-sm:hidden">Like</div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="-mt-2 border-0 shadow-none">
        {' '}
        <React.Fragment>
          <div className="flex w-fit flex-row gap-4 rounded-xl bg-[#cecece] shadow-2xl shadow-black dark:bg-slate-800">
            <div onMouseEnter={mouseEnter} className="flex flex-row gap-2 p-1">
              {reactionOptions.slice(1).map((reaction, i) => (
                <span
                  className="rounded-xl hover:bg-[#F5F5F5] dark:bg-slate-800"
                  key={i}>
                  <ReactionEmoji
                    key={reaction.name}
                    reactionName={reaction.name}
                    emojiCharacter={reaction.emoji}
                    isReactionSelected={currentReaction === reaction.name}
                    onEmojiClick={() =>
                      !loading && selectReaction(reaction.name)
                    }
                  />
                </span>
              ))}
            </div>
          </div>
        </React.Fragment>
      </PopoverContent>
    </Popover>
  )
}

export default ReactionButton

'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useScreenSize } from '@/hooks/responsiveness/useScreenSize'
import { reactionOptions } from '@/utils/data'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ReactionEmoji } from '.'

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

  const mouseLeft = () => {
    if (tokenInRedux) !loading && setEmojiPopoverVisible(false)
  }

  useEffect(() => {
    if (userReaction?.reactionType)
      updateCurrentReaction(userReaction?.reactionType?.toLowerCase())
  }, [userReaction?.reactionType])

  return (
    <Popover open={emojiPopoverVisible} onOpenChange={setEmojiPopoverVisible}>
      <div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeft}
        className="flex basis-1/4 items-center justify-center hover:bg-gray-300 dark:hover:text-slate-800">
        <PopoverTrigger asChild>
          <button
            className="dark:text-icon-dark pointer flex items-center justify-center rounded-sm dark:text-gray-300 "
            onClick={handleLikeWrapperExtended}>
            <div className="flex flex-col items-center">
              {/* Align the children in the center */}
              <ReactionEmoji
                reactionName={currentReactionEmoji?.name || 'none'}
                emojiCharacter={currentReactionEmoji?.emoji || '♡'}
                isReactionSelected={false}
                isReactionOnLike={true}
                // onEmojiClick={handleReactionEmoji}
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
              <div className="flex flex-row gap-2 p-1">
                {reactionOptions.slice(1).map((reaction, i) => (
                  <span key={i}>
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
      </div>
    </Popover>
  )
}

export default ReactionButton

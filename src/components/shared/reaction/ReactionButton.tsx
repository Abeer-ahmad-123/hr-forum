'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useScreenSize } from '@/hooks/responsiveness/useScreenSize'
import { reactionOptions } from '@/utils/data'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ReactionEmoji } from '.'

const ReactionButton = ({
  onReact,
  post,
  userReaction,
  loading,
  handleLikeWrapper,
  disableReactionButton,
  setDisableReactionButton,
}: any) => {
  const { isLargeScreen } = useScreenSize(1024)
  const [currentReaction, updateCurrentReaction] = useState(userReaction)
  const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''

  const handleLikeWrapperExtended: React.MouseEventHandler<HTMLDivElement> = (
    e,
  ) => {
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
      onReact(reactionName)
    },
    [onReact], // Removed currentReaction and post
  )

  const toggleHeartReaction = useCallback(() => {
    const newReaction =
      currentReaction == '' || currentReaction == 'none' ? 'love' : 'none'
    updateCurrentReaction(newReaction)
    onReact(newReaction)
  }, [onReact, currentReaction]) // Removed post

  const handleReactionEmoji = () => {
    if (tokenInRedux && !disableReactionButton && !loading && isLargeScreen) {
      setDisableReactionButton(true)
      toggleHeartReaction()
      setEmojiPopoverVisible(false)
    }
  }
  const currentReactionEmoji = reactionOptions.find(
    (reaction) => reaction.name === currentReaction,
  )
  const mouseEnter = () => {
    if (tokenInRedux && !disableReactionButton)
      !loading && setEmojiPopoverVisible(true)
  }

  const mouseLeft = () => {
    if (tokenInRedux) !loading && setEmojiPopoverVisible(false)
  }

  const onEmojiClick = (e: ChangeEvent<HTMLInputElement>) => {
    !loading && selectReaction(e.target.id)
  }

  useEffect(() => {
    updateCurrentReaction(userReaction?.toLowerCase())
  }, [userReaction])

  return (
    <Popover open={emojiPopoverVisible} onOpenChange={setEmojiPopoverVisible}>
      <div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeft}
        className="flex basis-1/4 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-300 dark:hover:text-slate-800">
        <PopoverTrigger asChild>
          <div
            className="dark:text-icon-dark pointer flex items-center justify-center  dark:text-gray-300 "
            onClick={handleLikeWrapperExtended}>
            <div className="flex flex-col items-center">
              <ReactionEmoji
                reactionName={currentReactionEmoji?.name || 'none'}
                emojiCharacter={currentReactionEmoji?.emoji || '♡'}
                isReactionSelected={false}
                isReactionOnLike={true}
              />
              {/* Add a small number under the heart emoji */}
              <span className=" text-xs text-gray-600 dark:text-white">
                {post?.totalReactionCount}
              </span>
            </div>
            <div className="font-light max-custom-sm:hidden">Like</div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="-mt-2 border-0 shadow-none">
          {' '}
          <React.Fragment>
            <div className="flex w-fit flex-row gap-4 rounded-xl bg-[#cecece] shadow-2xl shadow-black dark:bg-slate-800">
              <div className="flex flex-row gap-2 p-1">
                {reactionOptions.slice(1).map((reaction, i) => (
                  <span key={i}>
                    <ReactionEmoji
                      reactionName={reaction.name}
                      emojiCharacter={reaction.emoji}
                      isReactionSelected={currentReaction === reaction.name}
                      onEmojiClick={onEmojiClick}
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

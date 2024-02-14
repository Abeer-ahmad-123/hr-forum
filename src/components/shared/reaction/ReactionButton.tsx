'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useScreenSize } from '@/hooks/responsiveness/useScreenSize'
import { reactionOptions } from '@/utils/data'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Heart } from 'lucide-react'
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
  const [currentReaction, updateCurrentReaction] = useState('')
  const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)
  const [currentReactionEmoji, setCurrentReactionEmoji] = useState({
    name: '',
    emoji: '',
  })
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

  const toggleHeartReaction = () => {
    const newReaction =
      currentReaction == '' || currentReaction == 'none' ? 'love' : 'none'
    updateCurrentReaction(newReaction)
    onReact(newReaction)
  }

  const handleReactionEmoji = () => {
    if (tokenInRedux && !disableReactionButton && !loading && isLargeScreen) {
      setDisableReactionButton(true)
      toggleHeartReaction()
      setEmojiPopoverVisible(false)
    }
  }

  const mouseEnter = () => {
    if (tokenInRedux && !disableReactionButton)
      !loading && setEmojiPopoverVisible(true)
  }

  const mouseLeft = () => {
    if (tokenInRedux) !loading && setEmojiPopoverVisible(false)
  }

  const onEmojiClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (!loading && !disableReactionButton) {
      setDisableReactionButton(true)
      selectReaction(e.target.id)
    }
  }
  useEffect(() => {
    if (currentReaction) {
      setCurrentReactionEmoji(
        reactionOptions.find(
          (reaction) => reaction.name === currentReaction,
        ) ?? { name: '', emoji: '' },
      )
    }
  }, [currentReaction])

  useEffect(() => {
    updateCurrentReaction(userReaction?.toLowerCase())
  }, [userReaction])

  return (
    <Popover open={emojiPopoverVisible} onOpenChange={setEmojiPopoverVisible}>
      <div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeft}
        className="group flex basis-1/4 cursor-pointer items-center justify-center rounded-sm  hover:bg-gray-100 dark:hover:bg-dark-background">
        <PopoverTrigger asChild>
          <div
            className="dark:text-icon-dark pointer flex items-center justify-center"
            onClick={handleLikeWrapperExtended}>
            <div className="flex flex-col items-center">
              <ReactionEmoji
                reactionName={currentReactionEmoji?.name || 'none'}
                emojiCharacter={
                  currentReactionEmoji?.emoji || (
                    <Heart
                      strokeWidth={1}
                      // color={color}
                      className="text-black dark:text-white"
                    />
                  )
                }
                isReactionSelected={false}
                isReactionOnLike={true}
              />
              {/* Add a small number under the heart emoji */}
              <span className=" text-xs text-black">
                {post?.totalReactionCount}
              </span>
            </div>
            <div className="font-light max-custom-sm:hidden">Like</div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="-mt-2 border-0 shadow-none">
          {' '}
          <React.Fragment>
            <div className="flex w-fit flex-row gap-4 rounded-xl bg-[#cecece] shadow-2xl shadow-black dark:bg-dark-background">
              <div className="flex flex-row gap-2 p-1">
                {reactionOptions.slice(1).map((reaction, i) => (
                  <span
                    key={i}
                    className="dark:text-white dark:hover:text-black">
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

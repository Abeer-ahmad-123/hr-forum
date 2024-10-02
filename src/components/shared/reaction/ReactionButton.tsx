'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useScreenSize } from '@/hooks/responsiveness/useScreenSize'
import { reactionOptions } from '@/utils/data'
import HeartIcon from '@/assets/icons/heartIcon'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { ReactionEmoji } from '.'

const ReactionButton = ({
  onReact,
  userReaction,
  handleLikeWrapper,
  disableReactionButton,
  setDisableReactionButton,
  reactionCountToUse,
  accessToken,
}: any) => {
  const { isLargeScreen } = useScreenSize(1024)
  const [currentReaction, updateCurrentReaction] = useState('')
  const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)
  const [currentReactionEmoji, setCurrentReactionEmoji] = useState({
    name: '',
    emoji: '',
  })

  // const tokenInRedux =
  //   useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''

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
    if (accessToken && !disableReactionButton && isLargeScreen) {
      setDisableReactionButton(true)
      toggleHeartReaction()
      setEmojiPopoverVisible(false)
    }
  }

  const mouseEnter = () => {
    if (accessToken && !disableReactionButton) setEmojiPopoverVisible(true)
  }

  const mouseLeft = () => {
    if (accessToken) setEmojiPopoverVisible(false)
  }

  const onEmojiClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disableReactionButton) {
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
        <PopoverTrigger
          asChild
          name="reaction option button"
          aria-label="reaction option"
          aria-labelledby="reactionOptionLabel"
          role="button">
          <div
            className="dark:text-icon-dark pointer flex  items-center justify-center gap-2"
            onClick={handleLikeWrapperExtended}>
            <div className="flex items-center gap-2">
              <ReactionEmoji
                reactionName={currentReactionEmoji?.name || 'none'}
                emojiCharacter={
                  currentReactionEmoji?.emoji || (
                    <HeartIcon className="mb-[2px] h-[16px] w-[16px] text-black dark:text-white md:h-[20px] md:w-[20px]" />
                  )
                }
                isReactionSelected={false}
                isReactionOnLike={true}
              />
              {/* Add a small number under the heart emoji */}
              <span className="text-xs font-[900] text-black dark:text-white md:text-base">
                {reactionCountToUse}
              </span>
            </div>
            <div className="hidden  text-sm font-light text-[#666666] dark:text-white custom-mid-sm:block">
              Like
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="-mt-2 rounded-[30px] border-0  shadow-none">
          {' '}
          <React.Fragment>
            <div className="flex h-[44px] w-[144px] flex-row items-center justify-between  gap-4 rounded-[30px] bg-[#FAFAFA] shadow-2xl shadow-black dark:bg-bg-primary-dark">
              <div className="flex flex-row  gap-2 p-1">
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

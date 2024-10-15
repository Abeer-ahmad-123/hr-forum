'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useScreenSize } from '@/hooks/responsiveness/useScreenSize'
import { reactionOptions } from '@/utils/data'
import HeartIcon from '@/assets/icons/heartIcon'
import React, { useCallback, useEffect, useState } from 'react'
import { ReactionEmoji } from '.'
import EmptyHeartIcon from '@/assets/icons/EmptyHEart'

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
  const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)
  const [currentReaction, updateCurrentReaction] = useState('')
  const [currentReactionEmoji, setCurrentReactionEmoji] = useState({
    name: '',
    Emoji: (
      <EmptyHeartIcon className="w-[16px]text-black mb-[3px] h-[16px] dark:text-white md:h-[18px] md:w-[18px] " />
    ),
  })

  const handleLikeWrapperExtended: React.MouseEventHandler<HTMLDivElement> = (
    e,
  ) => {
    e.stopPropagation()
    e.preventDefault()
    if (!handleLikeWrapper()) {
      handleReactionEmoji()
    }
  }

  const selectReaction = useCallback(
    (reactionName: string) => {
      updateCurrentReaction((prevReaction: string) =>
        prevReaction === reactionName ? 'none' : reactionName,
      )
      onReact(reactionName)
    },
    [onReact],
  )

  const toggleHeartReaction = () => {
    const newReaction =
      currentReaction === '' || currentReaction === 'none' ? 'love' : 'none'
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

  const mouseLeave = () => {
    if (accessToken) setEmojiPopoverVisible(false)
  }

  const onEmojiClick = (reactionName: string) => {
    if (!disableReactionButton) {
      setDisableReactionButton(true)
      selectReaction(reactionName)
      setEmojiPopoverVisible(false) // Optionally close the popover after selection
    }
  }

  useEffect(() => {
    if (currentReaction) {
      const foundEmoji = reactionOptions.find(
        (reaction) => reaction.name === currentReaction,
      )
      setCurrentReactionEmoji(
        foundEmoji ?? {
          name: '',
          Emoji: (
            <EmptyHeartIcon className="w-[16px]text-black mb-[3px] h-[16px] dark:text-white md:h-[18px] md:w-[18px] " />
          ),
        }, // Fallback emoji
      )
    }
  }, [currentReaction])

  useEffect(() => {
    updateCurrentReaction(userReaction?.toLowerCase() || 'none') // Handle default reaction correctly
  }, [userReaction])

  return (
    <Popover open={emojiPopoverVisible} onOpenChange={setEmojiPopoverVisible}>
      <div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        className="group flex basis-1/4 cursor-pointer items-center justify-center rounded-sm  ">
        <PopoverTrigger
          asChild
          name="reaction option button"
          aria-label="reaction option"
          aria-labelledby="reactionOptionLabel"
          role="button">
          <div
            className="dark:text-icon-dark pointer flex items-center justify-center gap-2"
            onClick={handleLikeWrapperExtended}>
            <div className="flex items-center gap-2">
              {reactionOptions.map((item) =>
                item.name === currentReaction ? item.Emoji : null,
              )}

              {/* <ReactionEmoji
                reactionName={currentReaction || 'none'}
                emojiCharacter={
                  currentReactionEmoji?.Emoji || (
                    <HeartIcon className="mb-[2px] h-[16px] w-[16px] text-black dark:text-white md:h-[20px] md:w-[20px]" />
                  )
                }
                isReactionSelected={false}
                isReactionOnLike={true}
              /> */}
              <span className="text-xs font-[900] text-black dark:text-white md:text-base">
                {reactionCountToUse}
              </span>
            </div>
            <div className="hidden text-sm font-light text-[#666666] dark:text-white custom-mid-sm:block">
              Like
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="-mt-2 rounded-[30px] border-0 shadow-none">
          <div className="flex h-[44px] w-[135px]  flex-row items-center justify-center gap-2 rounded-[30px] bg-[#FAFAFA] shadow-2xl shadow-black dark:bg-[#202020]">
            {reactionOptions.slice(1).map((reaction, i) => (
              <span
                key={i}
                className="flex gap-2 dark:text-white dark:hover:text-black">
                <ReactionEmoji
                  reactionName={reaction.name}
                  EmojiCharacter={reaction.Emoji}
                  isReactionSelected={currentReaction === reaction.name}
                  onEmojiClick={() => onEmojiClick(reaction.name)}
                />
              </span>
            ))}
          </div>
        </PopoverContent>
      </div>
    </Popover>
  )
}

export default ReactionButton

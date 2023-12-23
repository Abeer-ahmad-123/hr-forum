'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useScreenSize } from '@/hooks/responsiveness/useScreenSize'
import { reactionOptions } from '@/utils/data'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ReactionEmoji } from '.'

const ReactionButton = ({ onReact, post, userReaction, loading }: any) => {
  const { isLargeScreen } = useScreenSize(1024)
  const [currentReaction, updateCurrentReaction] = useState(userReaction)
  const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
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
    const newReaction = currentReaction === 'none' ? 'love' : 'none'
    updateCurrentReaction(newReaction)
    onReact(newReaction)
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
  const mouseLeave = () => {
    const delayForMouseToReach = setTimeout(() => {
      setEmojiPopoverVisible(false)
      clearTimeout(delayForMouseToReach)
    }, 200)
  }

  useEffect(() => {
    if (userReaction?.reactionType)
      updateCurrentReaction(userReaction?.reactionType?.toLowerCase())
  }, [userReaction?.reactionType])

  return (
    <Popover open={emojiPopoverVisible} onOpenChange={setEmojiPopoverVisible}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          className="flex flex-col items-center">
          {' '}
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
      </PopoverTrigger>
      <PopoverContent className="-mt-2 border-0 shadow-none">
        {' '}
        <React.Fragment>
          <div className="flex w-fit flex-row gap-4 rounded-xl bg-white shadow-2xl shadow-black">
            <div onMouseEnter={mouseEnter} className="flex flex-row gap-2 ">
              {reactionOptions.slice(1).map((reaction, i) => (
                <span className="rounded-xl hover:bg-[#F5F5F5]" key={i}>
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

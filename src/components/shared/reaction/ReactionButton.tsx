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
import HeartIcon from '@/assets/icons/heartIcon'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  CommentCount,
  CommentCountStore,
  PostReactionBarProps,
  ReactionCounts,
} from '@/utils/interfaces/posts'
import { ReactionEmoji } from '.'

const ReactionButton = ({
  onReact,
  post,
  userReaction,
  loading,
  handleLikeWrapper,
  disableReactionButton,
  setDisableReactionButton,
  reaction_summary,
}: any) => {
  const { isLargeScreen } = useScreenSize(1024)
  const [currentReaction, updateCurrentReaction] = useState('')
  const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)
  const [countofAll, setCountofAll] = useState<number>(0)
  const [reactionArray, setReactionArray] = useState<[string, number][]>([])
  const getAllPostData = () => {
    const reactionEntries = Object?.entries(reaction_summary as ReactionCounts)

    const sortedReactions = reactionEntries.sort((a, b) => b[1] - a[1])
    setReactionArray(sortedReactions)
  }
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
        <PopoverTrigger
          asChild
          name="reaction option button"
          aria-label="reaction option"
          aria-labelledby="reactionOptionLabel"
          role="button">
          <div
            className="dark:text-icon-dark pointer flex  items-center justify-center gap-[8px]"
            onClick={handleLikeWrapperExtended}>
            <div className="flex flex-col items-center">
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
              <span className=" text-xs text-black">
                {post?.totalReactionCount}
              </span>
            </div>
            <div className="text-sm font-light text-[#666666] dark:text-white">
              Like
            </div>
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

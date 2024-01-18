'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { reactionOptions } from '@/utils/data'
import { getEmojisAsArray } from '@/utils/reactionDetails'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CustomLink } from './customLink/CustomLink'

interface PostReactionBarProps {
  postId: string
  reaction_summary: any
  total_comments: number
}
export type ReactionCounts = {
  [key: string]: number
}
const PostReactionBar = ({
  postId,
  reaction_summary,
  total_comments,
}: PostReactionBarProps) => {
  const pathName = usePathname()
  const [reactionSummary, setReactionSummary] = useState<string>('')
  const [countofAll, setCountofAll] = useState<number>(0)
  const [emojis, setEmojis] = useState<Array<string>>()
  const [reactionArray, setReactionArray] = useState<[string, number][]>([])
  const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)

  const getAllPostData = () => {
    const reactionEntries = Object?.entries(reaction_summary as ReactionCounts)

    const sortedReactions = reactionEntries.sort((a, b) => b[1] - a[1])
    setReactionArray(sortedReactions)
  }

  const getEmojis = (
    countArray: [string, number][],
    options: { name: string; emoji: string }[],
  ): string[] => {
    // Sort the reaction_summary based on count in descending order
    const sortedReactions = countArray.sort((a, b) => b[1] - a[1])

    // Map the emojis from reactionOptions for non-zero counts
    return sortedReactions
      .filter(([_, count]) => count > 0)
      .map(([reactionName, _]) => {
        const { emoji } = options.find(
          (option) => option.name === reactionName.replace('_count', ''),
        )!
        return emoji
      })
  }

  const addCountOfAll = (arr: [string, number][]): number => {
    return arr.reduce((acc, [, count]) => acc + count, 0)
  }
  const mouseEnter = () => {
    setEmojiPopoverVisible(true)
  }
  const mouseLeave = () => {
    setEmojiPopoverVisible(false)
  }
  const isExceptOneZero = (obj: ReactionCounts) => {
    let nonZeroCount = 0

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== 0) {
        nonZeroCount++
        if (nonZeroCount > 1) {
          return false
        }
      }
    }

    return true
  }

  const generateReactionSummary = () => {
    const reactionCount = addCountOfAll(reactionArray)
    let result = ''

    if (isExceptOneZero(reaction_summary) && reactionCount > 1) {
      result = `and ${reactionCount - 1} more`
    } else if (reactionCount > 1) {
      result = `and ${reactionCount - 1} other${reactionCount > 2 ? 's' : ''}`
    }

    return result
  }

  useEffect(() => {
    if (reaction_summary) getAllPostData()
  }, [reaction_summary])

  useEffect(() => {
    if (reactionArray.length) {
      setCountofAll(addCountOfAll(reactionArray))
      setEmojis(getEmojis(reactionArray, reactionOptions))
      setReactionSummary(generateReactionSummary())
    }
  }, [reactionArray])

  return (
    <>
      <hr />
      <div className="flex items-center justify-between px-[3.2rem] py-1">
        <div className="felx gap-1">
          {emojis?.slice(0, countofAll).map((react, index) => (
            <span
              className={`${
                index === 0 ? 'sticky z-[1]' : 'ml-[-8px]'
              } rounded-full bg-white p-1 text-xs dark:bg-slate-800`}
              key={index}
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}>
              {react}
            </span>
          ))}
          <Popover
            open={emojiPopoverVisible}
            onOpenChange={setEmojiPopoverVisible}>
            <PopoverTrigger asChild>
              <span
                className="text-xs text-slate-400"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}>
                {reactionSummary}
              </span>
            </PopoverTrigger>
            <PopoverContent className="bg-white">
              <div className="flex w-fit flex-row gap-4 rounded-xl shadow-2xl shadow-black">
                {getEmojisAsArray(reaction_summary).map(
                  ({ emoji, count }, key) => {
                    return (
                      <div key={key} className="flex gap-1.5">
                        <p>{emoji}</p>
                        <p>{count}</p>
                      </div>
                    )
                  },
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CustomLink
          href={
            pathName.includes('/channels/')
              ? `feeds/feed/${postId}`
              : ` /feeds/feed/${postId}`
          }>
          <span className="text-xs text-slate-400">
            {total_comments} comments
          </span>
        </CustomLink>
      </div>
    </>
  )
}

export default PostReactionBar

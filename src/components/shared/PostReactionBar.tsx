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
}
export type ReactionCounts = {
  [key: string]: number
}
const PostReactionBar = ({
  postId,
  reaction_summary,
}: PostReactionBarProps) => {
  const pathName = usePathname()
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
    return countArray
      .filter(([name]) => options.some((option) => name.includes(option.name)))
      .map(
        ([name]) =>
          options.find((option) => name.includes(option.name))?.emoji || '',
      )
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
  useEffect(() => {
    getAllPostData()
  }, [])

  return addCountOfAll(reactionArray) ? (
    <>
      <hr className="mx-10" />
      <div className="flex items-center justify-between px-[3.2rem] py-1">
        <div className="felx gap-1">
          {getEmojis(reactionArray, reactionOptions)
            .slice(0, addCountOfAll(reactionArray))
            .map((react, index) => (
              <span
                className={`${
                  index === 0 ? 'sticky z-[1]' : 'ml-[-8px]'
                } rounded-full bg-white p-1 text-xs dark:bg-slate-800`}
                key={index}>
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
                {addCountOfAll(reactionArray) > 1
                  ? `name and ${addCountOfAll(reactionArray) - 1} others`
                  : 'name here'}
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
          <span className="text-xs text-slate-400">2 comments</span>
        </CustomLink>
      </div>
    </>
  ) : (
    <></>
  )
}

export default PostReactionBar

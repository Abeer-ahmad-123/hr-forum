'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { reactionOptions } from '@/utils/data'
import { getEmojisAsArray } from '@/utils/reactionDetails'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CustomLink } from './customLink/CustomLink'
import { useSelector } from 'react-redux'
import {
  CommentCount,
  CommentCountStore,
  PostReactionBarProps,
  ReactionCounts,
} from '@/utils/interfaces/posts'

const PostReactionBar = ({
  postId,
  reaction_summary,
  totalComments,
}: PostReactionBarProps) => {
  const pathName = usePathname()
  const [reactionSummary, setReactionSummary] = useState<string>('')
  const [countofAll, setCountofAll] = useState<number>(0)
  const [emojis, setEmojis] = useState<Array<string>>()
  const [reactionArray, setReactionArray] = useState<[string, number][]>([])
  const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)
  const [commentCount, setCommentCount] = useState<CommentCount>({})
  const commentCountInStore = useSelector(
    (state: CommentCountStore) => state.posts.commentCount,
  )
  const isFirstRef = useRef(true)

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

  const generateReactionSummary = (reactionArray: any) => {
    const reactionCount = addCountOfAll(reactionArray)
    // * Removed and x others on reactions for ambiguity.
    // * Instead the number of reactions will be displayed
    let result = reactionCount > 0 ? String(reactionCount) : ''

    return result
  }
  const getAllPostData = () => {
    const reactionEntries = Object.entries(reaction_summary as ReactionCounts)
    return reactionEntries.sort((a, b) => b[1] - a[1])
  }

  /**
   *Post Comments Count var instead of doing commentCount[Number(postId)] everywhere
   */
  const postCommentsCount = useMemo(() => {
    return commentCount[Number(postId)] || null
  }, [commentCount, postId])

  const processReactionData = () => {
    const reactionArray = reaction_summary ? getAllPostData() : []

    const countOfAll = reactionArray.length ? addCountOfAll(reactionArray) : 0

    const emojis = reactionArray.length
      ? getEmojis(reactionArray, reactionOptions)
      : []
    const reactionSummary = reactionArray.length
      ? generateReactionSummary(reactionArray)
      : {}

    return { countOfAll, emojis, reactionSummary }
  }

  const emojiVarToUse = isFirstRef.current
    ? processReactionData()?.emojis
    : emojis

  const countOfAllVarToUse = isFirstRef.current
    ? processReactionData()?.countOfAll
    : countofAll

  const commentCountToUse = isFirstRef.current
    ? totalComments
    : postCommentsCount

  const reactionSummaryToUse = isFirstRef.current
    ? (processReactionData()?.reactionSummary as number)
    : reactionSummary

  useEffect(() => {
    if (reaction_summary) setReactionArray(getAllPostData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reaction_summary])

  useEffect(() => {
    if (reactionArray.length) {
      setCountofAll(addCountOfAll(reactionArray))
      setEmojis(getEmojis(reactionArray, reactionOptions))
      setReactionSummary(generateReactionSummary(reactionArray))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactionArray])

  useEffect(() => {
    setCommentCount(commentCountInStore)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentCountInStore])

  useEffect(() => {
    isFirstRef.current = false
  }, [])

  return (
    <>
      {/* IF ONLY THE REACTIONS OR THE COMMENTS EXIST THEN ADD EXTRA <HR/> */}
      {/* {!pathName.includes('/profile') && (countofAll || postCommentsCount) ? (
        <hr />
      ) : null} */}
      <div className="flex items-center justify-between px-10 py-1">
        {/* * Fixed issue with reactions buttons overlapping and using less width. */}
        <div className="flex gap-1">
          {emojiVarToUse?.map((react, index) => (
            <span
              className={`${index === 0 ? 'sticky z-[1]' : 'ml-[-8px]'
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
            <PopoverTrigger
              asChild
              name="reaction summary button"
              aria-label="reaction summary"
              aria-labelledby="reactionSummaryLabel"
              role="button">
              <span
                className="flex items-center text-xs text-slate-400 max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px]"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}>
                {reactionSummaryToUse}
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
            pathName.includes('channels')
              ? `${pathName}/feed/${postId}`
              : ` /feeds/feed/${postId}`
          }>
          <span className="text-xs text-slate-400 max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px]">
            {commentCountToUse
              ? commentCountToUse > 1
                ? `${commentCountToUse} comments`
                : `${commentCountToUse} comment`
              : null}
          </span>
        </CustomLink>
      </div>
    </>
  )
}

export default PostReactionBar

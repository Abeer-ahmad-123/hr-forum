import React from 'react'
import { reactionOptions } from '@/utils/data'

interface ReactionDetailsInterface {
  reactionSummary: {
    [key: string]: number
    like_count: number
    love_count: number
    clap_count: number
    celebrate_count: number
  }
}
interface ResultItem {
  emoji: string
  count: number
}

const ReactionDetails = ({ reactionSummary }: ReactionDetailsInterface) => {
  const getEmojisAsArray = (): ResultItem[] => {
    const result: ResultItem[] = []

    for (const key in reactionSummary) {
      const count = reactionSummary[key]

      if (count > 0) {
        const matchingEmoji = reactionOptions.find(
          (emoji) => emoji.name.toLowerCase() === key.replace('_count', ''),
        )
        if (matchingEmoji) {
          result.push({
            emoji: matchingEmoji.emoji,
            count: count,
          })
        }
      }
    }

    return result
  }
  return (
    <div className="mt-2.5 flex w-full gap-6">
      {getEmojisAsArray().map(({ emoji, count }, key) => {
        return (
          <div key={key} className="flex gap-1.5">
            <p>{emoji}</p>
            <p>{count}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ReactionDetails

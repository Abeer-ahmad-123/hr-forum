import React from 'react'
import { getEmojisAsArray } from '@/utils/reactionDetails'

export interface ReactionDetailsInterface {
  reactionSummary: {
    [key: string]: number
    like_count: number
    love_count: number
    clap_count: number
    celebrate_count: number
  }
}

const ReactionDetails = ({ reactionSummary }: ReactionDetailsInterface) => {
  return (
    <div className="mt-2.5 flex w-full gap-6">
      {getEmojisAsArray(reactionSummary).map(({ emoji, count }, key) => {
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

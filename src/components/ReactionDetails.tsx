import { getEmojisAsArray } from '@/utils/reactionDetails'

export interface ReactionDetailsInterface {
  reactionSummary: any
}

const ReactionDetails = ({ reactionSummary }: ReactionDetailsInterface) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="w-content mt-2.5 flex gap-6">
        {getEmojisAsArray(reactionSummary).map(({ Emoji, count }, key) => {
          return (
            <div key={key} className="flex gap-1.5">
              <p>{Emoji}</p>
              <p>{count}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReactionDetails

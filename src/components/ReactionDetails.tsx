import { getEmojisAsArray } from '@/utils/reactionDetails'

export interface ReactionDetailsInterface {
  reactionSummary: any
  total_comments: number
}

const ReactionDetails = ({
  reactionSummary,
  total_comments,
}: ReactionDetailsInterface) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="w-content mt-2.5 flex gap-6">
        {getEmojisAsArray(reactionSummary).map(({ emoji, count }, key) => {
          return (
            <div key={key} className="flex gap-1.5">
              <p>{emoji}</p>
              <p>{count}</p>
            </div>
          )
        })}
      </div>

      <span
        className="w-content text-xs text-slate-400 max-custom-sm:text-[11px] 
                      max-[392px]:text-[10px] max-custom-sx:text-[8px]">
        {total_comments} comments
      </span>
    </div>
  )
}

export default ReactionDetails

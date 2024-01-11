import { reactionOptions } from './data'
interface ResultItem {
  emoji: string
  count: number
}

interface ReactionDetailsInterface {
  [key: string]: number
  like_count: number
  love_count: number
  clap_count: number
  celebrate_count: number
}
export const getEmojisAsArray = (
  reactionSummary: ReactionDetailsInterface,
): ResultItem[] => {
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

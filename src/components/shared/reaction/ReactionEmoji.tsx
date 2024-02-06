import clsx from 'clsx'
import { Heart } from 'lucide-react'

const ReactionEmoji = ({
  emojiCharacter,
  reactionName,
  isReactionSelected,
  onEmojiClick,
  isReactionOnLike = false,
}: any) => {
  const styles = isReactionSelected
    ? 'scale-150'
    : isReactionOnLike
    ? ''
    : 'transition-all duration-200 ease-in-out hover:scale-150'

  return (
    <div
      onClick={onEmojiClick}
      className={clsx(
        'flex cursor-pointer items-center rounded-lg border-none px-3',
        styles,
      )}
      id={reactionName}
      aria-label={`select ${reactionName} emoji`}>
      <span className="text-xl text-black dark:text-gray-300" id={reactionName}>
        {emojiCharacter === '♡' ? (
          <Heart
            strokeWidth={1}
            className="text-black group-hover:text-black dark:text-white dark:hover:text-black"
          />
        ) : (
          emojiCharacter
        )}
      </span>
    </div>
  )
}

export default ReactionEmoji

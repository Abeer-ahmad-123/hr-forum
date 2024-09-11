import clsx from 'clsx'
import HeartIcon from '@/assets/icons/heartIcon'
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
        'flex cursor-pointer items-center gap-[8px] rounded-lg border-none',
        styles,
      )}
      id={reactionName}
      aria-label={`select ${reactionName} emoji`}>
      <span className="text-xl text-black dark:text-gray-300" id={reactionName}>
        {emojiCharacter === '♡' ? <HeartIcon className="" /> : emojiCharacter}
      </span>
    </div>
  )
}

export default ReactionEmoji

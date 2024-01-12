import clsx from 'clsx'

const ReactionEmoji = ({
  emojiCharacter,
  reactionName,
  isReactionSelected,
  onEmojiClick,
  className,
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
        'flex cursor-pointer items-center rounded-lg border-none px-3  dark:hover:text-slate-800',
        styles,
      )}
      id={reactionName}
      aria-label={`select ${reactionName} emoji`}>
      <span
        className="text-xl text-black dark:text-gray-300 dark:hover:text-slate-800"
        id={reactionName}>
        {emojiCharacter}
      </span>
    </div>
  )
}

export default ReactionEmoji

import clsx from 'clsx'

const ReactionEmoji = ({
  emojiCharacter,
  reactionName,
  isReactionSelected,
  onEmojiClick,
  className,
}: any) => {
  const styles = isReactionSelected
    ? 'scale-150'
    : 'transition-all duration-200 ease-in-out hover:scale-150'

  return (
    <div
      onClick={onEmojiClick}
      className={clsx(
        'flex cursor-pointer items-center rounded-lg border-none px-3  dark:hover:text-slate-800',
        styles,
      )}
      role="button"
      aria-label={`select ${reactionName} emoji`}>
      <span className="text-xl text-black dark:text-gray-300 dark:hover:text-slate-800">
        {emojiCharacter}
      </span>
    </div>
  )
}

export default ReactionEmoji

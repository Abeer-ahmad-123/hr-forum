import clsx from 'clsx'

const ReactionEmoji = ({
  emojiCharacter,
  reactionName,
  isReactionSelected,
  onEmojiClick,
}: any) => {
  const styles = isReactionSelected ? 'scale-150' : 'transform hover:scale-105'

  return (
    <div
      onClick={onEmojiClick}
      className={clsx(
        'flex cursor-pointer items-center rounded-lg border-none px-3 py-2',
        styles,
      )}
      role="button"
      aria-label={`select ${reactionName} emoji`}>
      <span className="text-xl text-black dark:text-white">
        {emojiCharacter}
      </span>
    </div>
  )
}

export default ReactionEmoji

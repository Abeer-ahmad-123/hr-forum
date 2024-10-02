import clsx from 'clsx'
import HeartIcon from '@/assets/icons/heartIcon'

const ReactionEmoji = ({
  EmojiCharacter,
  reactionName,
  isReactionSelected,
  onEmojiClick,
  isReactionOnLike = false,
}: any) => {
  const styles = isReactionSelected
    ? ''
    : isReactionOnLike
    ? ''
    : 'transition-all duration-200 ease-in-out '

  return (
    <div
      onClick={onEmojiClick}
      className={clsx(
        'flex cursor-pointer items-center gap-[8px] rounded-lg border-none hover:h-9 hover:w-9 hover:scale-125 hover:items-center hover:justify-center hover:rounded-full hover:bg-bg-tertiary hover:dark:bg-bg-tertiary-dark',
        styles,
      )}
      id={reactionName}
      aria-label={`select ${reactionName} Emoji`}>
      <span className="text-xl text-black dark:text-gray-300" id={reactionName}>
        {isReactionSelected === 'none' ? (
          <HeartIcon className="" />
        ) : (
          EmojiCharacter
        )}
      </span>
    </div>
  )
}

export default ReactionEmoji

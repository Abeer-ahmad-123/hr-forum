import { reactionOptions } from '@/utils/data'
import { useState } from 'react'

const Reaction = () => {
  const [reaction, setReaction] = useState('')

  const styles = (key: string) => {
    return reaction === key ? 'bg-blue-200' : 'bg-white'
  }

  const handleReactionClick = (selectedReaction: string) => {
    if (selectedReaction === reaction) {
      setReaction('')
    } else {
      setReaction(selectedReaction)
    }
  }

  return (
    <div>
      <h3 className="mb-2 text-lg font-bold">Reactions:</h3>
      <div className="flex gap-4">
        {reactionOptions.map((react) => (
          <div
            key={react.name}
            onClick={() => handleReactionClick(react.name)}
            className={`flex cursor-pointer items-center rounded-lg px-3 py-2 ${styles(
              react.name,
            )}`}>
            <span className="mr-2 text-lg">{react.emoji}</span>
            <span className="text-sm">{react.name}</span>
          </div>
        ))}
      </div>
      {reaction && (
        <p className="mt-4">
          You selected:{' '}
          {reactionOptions.find((react) => react.name === reaction)?.emoji}
          {reaction}
        </p>
      )}
    </div>
  )
}

export default Reaction

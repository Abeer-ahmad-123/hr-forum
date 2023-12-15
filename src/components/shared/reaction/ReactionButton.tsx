// import React, { useState, useCallback, useEffect } from 'react'
// import { reactionOptions } from '@/utils/data'
// import { useScreenSize } from '@/hooks/responsiveness/useScreenSize'
// import { ReactionEmoji } from '.'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'

// const ReactionButton = ({ onReact, post, userReaction, loading }: any) => {
//   const { isLargeScreen } = useScreenSize(1024)
//   const [currentReaction, updateCurrentReaction] = useState('none')
//   const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)

//   const selectReaction = useCallback(
//     (reactionName: any) => {
//       updateCurrentReaction((prevReaction) =>
//         prevReaction === reactionName ? 'none' : reactionName,
//       )
//       onReact(reactionName)
//     },
//     [onReact], // Removed currentReaction and post
//   )

//   const toggleHeartReaction = useCallback(() => {
//     const newReaction = currentReaction === 'none' ? 'love' : 'none'
//     updateCurrentReaction(newReaction)
//     onReact(newReaction)
//   }, [onReact, currentReaction]) // Removed post

//   const currentReactionEmoji = reactionOptions.find(
//     (reaction) => reaction.name === currentReaction,
//   )

//   const mouseEnter = () => {
//     !loading && setEmojiPopoverVisible(true)
//   }
//   const mouseLeave = () => {
//     setEmojiPopoverVisible(false)
//   }

//   useEffect(() => {
//     if (userReaction?.reactionType)
//       updateCurrentReaction(userReaction?.reactionType?.toLowerCase())
//   }, [userReaction?.reactionType])

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <div className="flex flex-col items-center">
//           {' '}
//           {/* Align the children in the center */}
//           <ReactionEmoji
//             reactionName={currentReactionEmoji?.name || 'none'}
//             emojiCharacter={currentReactionEmoji?.emoji || '♡'}
//             isReactionSelected={false}
//             onEmojiClick={() =>
//               !loading && isLargeScreen && toggleHeartReaction()
//             }
//           />
//           {/* Add a small number under the heart emoji */}
//           <span className=" text-xs text-gray-600 dark:text-white">
//             {post?.totalReactionCount}
//           </span>
//         </div>
//       </PopoverTrigger>
//       <PopoverContent className="border-0 shadow-none">
//         {' '}
//         <React.Fragment>
//           <div className="flex w-fit flex-row gap-4 rounded-xl bg-white shadow-2xl shadow-black">
//             <div className="flex flex-row gap-2 ">
//               {reactionOptions.slice(1).map((reaction, i) => (
//                 <span className="rounded-xl hover:bg-[#F5F5F5]" key={i}>
//                   <ReactionEmoji
//                     key={reaction.name}
//                     reactionName={reaction.name}
//                     emojiCharacter={reaction.emoji}
//                     isReactionSelected={currentReaction === reaction.name}
//                     onEmojiClick={() =>
//                       !loading && selectReaction(reaction.name)
//                     }
//                   />
//                 </span>
//               ))}
//             </div>
//           </div>
//         </React.Fragment>
//       </PopoverContent>
//     </Popover>
//   )
// }

// export default ReactionButton



'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { reactionOptions } from '@/utils/data'
import { useScreenSize } from '@/hooks/responsiveness/useScreenSize'
import { ReactionEmoji } from '.'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SlLike } from "react-icons/sl";

const ReactionButton = ({ onReact, post, userReaction, loading }: any) => {
  const { isLargeScreen } = useScreenSize(1024)
  const [currentReaction, updateCurrentReaction] = useState('none')
  const [emojiPopoverVisible, setEmojiPopoverVisible] = useState(false)
  const selectReaction = useCallback(
    (reactionName: any) => {
      updateCurrentReaction((prevReaction) =>
        prevReaction === reactionName ? 'none' : reactionName,
      )
      onReact(reactionName)
    },
    [onReact], // Removed currentReaction and post
  )

  const toggleHeartReaction = useCallback(() => {
    const newReaction = currentReaction === 'none' ? 'love' : 'none'
    updateCurrentReaction(newReaction)
    onReact(newReaction)
  }, [onReact, currentReaction]) // Removed post

  const currentReactionEmoji = reactionOptions.find(
    (reaction) => reaction.name === currentReaction,
  )

  const mouseEnter = () => {
    !loading && setEmojiPopoverVisible(true)
  }
  const mouseLeave = () => {
    const delayForMouseToReach = setTimeout(() => {
      setEmojiPopoverVisible(false)
      clearTimeout(delayForMouseToReach)
    }, 2000)
  }

  useEffect(() => {
    if (userReaction?.reactionType)
      updateCurrentReaction(userReaction?.reactionType?.toLowerCase())
  }, [userReaction?.reactionType])

  return (
    <Popover open={emojiPopoverVisible} onOpenChange={setEmojiPopoverVisible}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          className="flex flex-col items-center">
          {' '}
          {/* Align the children in the center */}


          <ReactionEmoji
            reactionName={currentReactionEmoji?.name || 'none'}
            emojiCharacter={currentReactionEmoji?.emoji || '♡'}
            isReactionSelected={false}
            onEmojiClick={() =>
              !loading && isLargeScreen && toggleHeartReaction()
            }
          />
          {/* Add a small number under the heart emoji */}
          <span className=" text-xs text-gray-600 dark:text-white">
            {post?.totalReactionCount}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="-mt-2 border-0 shadow-none">
        {' '}
        <React.Fragment>
          <div className="flex w-fit flex-row gap-4 rounded-xl bg-white shadow-2xl shadow-black">
            <div onMouseEnter={mouseEnter} className="flex flex-row gap-2 ">
              {reactionOptions.slice(1).map((reaction, i) => (
                <span className="rounded-xl hover:bg-[#F5F5F5]" key={i}>
                  <ReactionEmoji
                    key={reaction.name}
                    reactionName={reaction.name}
                    emojiCharacter={reaction.emoji}
                    isReactionSelected={currentReaction === reaction.name}
                    onEmojiClick={() =>
                      !loading && selectReaction(reaction.name)
                    }
                  />
                </span>
              ))}
            </div>
          </div>
        </React.Fragment>
      </PopoverContent>
    </Popover>
  )
}

export default ReactionButton
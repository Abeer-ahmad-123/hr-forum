import { reactions } from '@/utils/data'

const ReactionOverlap = () => {
  // console.log('props', props)
  // const reactionsObject = reactions.reduce(
  //   (obj, reaction) => ({ ...obj, [reaction.name]: reaction.emoji }),
  //   {},
  // )

  return (
    <div className="relative">
      {/* <div className="flex items-center">
        <div className="flex">
          {props?.reactions.map((reaction, index) => {
            return (
              <div
                key={index}
                className={`relative z-[${
                  props?.reactions.length - index
                }] mx-[-6px] flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-gray-800 shadow-md hover:shadow-lg`}>
                {reactionsObject[reaction]}
              </div>
            )
          })}
        </div>
        <div className="ml-4 text-sm text-gray-400">
          {props?.likes} Reactions
        </div>
      </div> */}
    </div>
  )
}

export default ReactionOverlap

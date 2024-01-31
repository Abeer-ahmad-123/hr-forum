'use client'

import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { MessageSquare, Plus, SmilePlus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const ActivityButtons = () => {
  const [profileNav, setProfileNav] = useState<{
    isComment: boolean
    isReaction: boolean
    isPost: boolean
  }>({
    isComment: false,
    isReaction: false,
    isPost: true,
  })
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  const routeTo = `/feeds/${userData?.username}/feed`
  const pathName = usePathname()
  console.log(pathName)

  const router = useRouter()
  const commentOnClick = () => {
    nProgress.start()
    router.push(`${routeTo}/comment`)
  }
  const reactionOnClick = () => {
    nProgress.start()
    router.push(`${routeTo}/reaction`)
  }

  const handlePost = () => {
    nProgress.start()
    router.push(`${routeTo}`)
  }
  return (
    <div className="justify-start rounded-t-xl bg-white pl-10 pt-2">
      <div className="text-start text-xl font-normal">Activity</div>
      <div className="flex cursor-pointer items-start justify-start max-md:text-sm">
        <div
          onClick={handlePost}
          className={`flex w-[100px] items-center gap-[8px] p-2 ${
            pathName === `${routeTo}`
              ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out'
              : 'opacity-50'
          }`}>
          <Plus size={20} />
          <button> Post</button>
        </div>
        <div
          onClick={commentOnClick}
          className={`ml-2 flex w-[130px] cursor-pointer items-center gap-[8px] p-2 ${
            pathName.includes('/comment')
              ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out'
              : ' opacity-50'
          }`}>
          <MessageSquare size={20} />
          <button> Comment</button>
          <hr />
        </div>
        <div
          onClick={reactionOnClick}
          className={`ml-2 flex w-[130px] cursor-pointer items-center gap-[8px] p-2 ${
            pathName.includes('/reaction')
              ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out'
              : ' opacity-50'
          }`}>
          <SmilePlus size={20} />
          <button> Reactions</button>
          <hr />
        </div>
        <p className="!mb-[-5px] !mt-[-2px] ml-2 h-[2px] bg-[#eaecf0]"></p>
      </div>
    </div>
  )
}

export default ActivityButtons

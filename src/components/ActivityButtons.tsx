'use client'

import { ActivityButtonProps } from '@/utils/interfaces/userData'
import { Plus, SmilePlus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaRegComment } from 'react-icons/fa'
interface ProfileNavType {
  isComment: boolean
  isReaction: boolean
  isPost: boolean
}

const ActivityButtons = ({ slug }: ActivityButtonProps) => {
  const routeTo = `/user-activity/${slug}`
  const [profileNav, setProfileNav] = useState<ProfileNavType>({
    isComment: false,
    isReaction: false,
    isPost: true,
  })
  const pathName = usePathname()

  const router = useRouter()

  const activityStyles =
    'dark:text-white text-black bg-white dark:bg-black dark:text-white'

  const handlePost = () => {
    pathName.includes('/reported')
      ? router.push(`${routeTo}/reported/posts`)
      : router.push(`${routeTo}/posts`)
  }
  const commentOnClick = () => {
    setProfileNav((pre) => {
      return {
        ...pre,
        isPost: false,
        isComment: true,
        isReaction: false,
      }
    })
  }
  const reactionOnClick = () => {
    setProfileNav((pre) => {
      return {
        ...pre,
        isPost: false,
        isComment: false,
        isReaction: true,
      }
    })
  }

  return (
    <div className="justify-start rounded-lg dark:text-gray-300 max-custom-sm:px-6 max-[392px]:px-2">
      <div className="text-start text-xl font-normal max-[500px]:text-[16px]">
        {pathName.includes('reported') ? 'Reported Content' : 'Activity'}
      </div>
      <div className="mb-5 mt-5 flex h-[42px] w-full  cursor-pointer items-center justify-start rounded-[6px] bg-bg-tertiary p-[5px] dark:bg-bg-tertiary-dark">
        <div
          onClick={handlePost}
          className={`flex h-[32px] w-[67px] items-center justify-center gap-[8px]  rounded-[3px] px-[16px] py-[6px] 
           ${profileNav.isPost ? activityStyles : 'text-white'}
          `}>
          <div
            className={`gap-2  text-black  hover:text-black dark:text-white dark:hover:text-white `}>
            <button name="post button" className="text-sm font-medium">
              Post
            </button>
          </div>
        </div>
        <div
          onClick={commentOnClick}
          className={`flex h-[32px] w-[103px] items-center justify-center gap-[8px]  rounded-[3px] px-[16px] py-[6px] 
            ${profileNav.isComment ? activityStyles : 'text-white'}`}>
          <div
            className={`flex items-center gap-2 font-semibold  text-black hover:text-black  dark:text-white  dark:hover:text-white max-custom-sm:text-xs   `}>
            {/* <FaRegComment
                size={20}
                className="max-custom-sm:h-4 max-custom-sm:w-4"
              /> */}
            <button name="comment button">
              <span className="text-sm font-medium">Comment</span>{' '}
            </button>
            <hr />
          </div>
        </div>

        {!pathName.includes('/reported') && (
          <div
            onClick={reactionOnClick}
            className={`flex h-[32px] w-[96px] items-center justify-center gap-[8px]  rounded-[3px] px-[16px] py-[6px] 
                ${profileNav.isReaction ? activityStyles : ''}
            `}>
            <div
              className={`flex gap-2 font-semibold  text-black hover:text-black  dark:text-white  dark:hover:text-white  max-custom-sm:text-xs
           
              `}>
              {/* <SmilePlus
                size={20}
                className="max-custom-sm:h-4 max-custom-sm:w-4"
              /> */}
              <button name="reaction button ">
                {' '}
                <span className="text-sm font-medium">Reactions</span>
              </button>
              <hr />
            </div>
          </div>
        )}

        <p className="!mb-[-5px] !mt-[-2px] ml-2 h-[2px] bg-[#eaecf0]"></p>
      </div>
    </div>
  )
}

export default ActivityButtons

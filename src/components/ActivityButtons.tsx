'use client'

import { ActivityButtonProps } from '@/utils/interfaces/userData'
import { Plus, SmilePlus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { FaRegComment } from 'react-icons/fa'

const ActivityButtons = ({ slug }: ActivityButtonProps) => {
  const routeTo = `/user-activity/${slug}`
  const pathName = usePathname()

  const router = useRouter()
  const commentOnClick = () => {
    pathName.includes('/reported')
      ? router.push(`${routeTo}/reported/comments`)
      : router.push(`${routeTo}/comments`)
  }
  const reactionOnClick = () => {
    router.push(`${routeTo}/reactions`)
  }

  const handlePost = () => {
    pathName.includes('/reported')
      ? router.push(`${routeTo}/reported/posts`)
      : router.push(`${routeTo}/posts`)
  }
  return (
    <div className="bg-whitedark:bg-bg-tertiary-dark justify-start rounded-lg dark:text-gray-300 max-custom-sm:px-6 max-[392px]:px-2">
      <div className="text-start text-xl font-normal max-[500px]:text-[16px]">
        {pathName.includes('reported') ? 'Reported Content' : 'Activity'}
      </div>
      <div className="mb-5 mt-5 flex h-[42px] w-full  cursor-pointer items-center justify-start rounded-[6px] bg-bg-tertiary p-[5px] dark:bg-bg-tertiary-dark">
        <div
          onClick={handlePost}
          className={`flex h-[32px] w-[67px] items-center justify-center gap-[8px] py-2`}>
          <div
            className={`gap-2  text-black  hover:text-black dark:text-white dark:hover:text-white `}>
            <button name="post button" className="text-sm font-medium">
              Post
            </button>
          </div>
        </div>
        <div
          onClick={commentOnClick}
          className={`flex h-[32px] w-[103px] items-center justify-center gap-[8px] py-2`}>
          <div
            className={`flex items-center gap-2 font-semibold  text-black hover:text-black  dark:text-white  dark:hover:text-white max-custom-sm:text-xs `}>
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
            className={`flex h-[32px] w-[96px] items-center justify-center gap-[8px] py-2`}>
            <div
              className={`flex gap-2 font-semibold  text-black hover:text-black  dark:text-white  dark:hover:text-white  max-custom-sm:text-xs`}>
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

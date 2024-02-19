'use client'

import { SlugProps } from '@/utils/interfaces/userData'
import { Plus, SmilePlus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { FaRegComment } from 'react-icons/fa'

const ActivityButtons = ({ slug }: SlugProps) => {
  const routeTo = `/user-activity/${slug}`
  const pathName = usePathname()

  const router = useRouter()
  const commentOnClick = () => {
    nProgress.start()

    pathName.includes('/reported')
      ? router.push(`${routeTo}/reported/comments`)
      : router.push(`${routeTo}/comments`)
  }
  const reactionOnClick = () => {
    nProgress.start()
    router.push(`${routeTo}/reactions`)
  }

  const handlePost = () => {
    nProgress.start()
    pathName.includes('/reported')
      ? router.push(`${routeTo}/reported/posts`)
      : router.push(`${routeTo}/posts`)
  }
  return (
    <div className="mb-4 justify-start rounded-xl bg-white px-10 py-2 dark:bg-slate-800 dark:text-gray-300 max-custom-sm:px-6 max-[392px]:px-2">
      <div className="text-start text-xl font-normal max-[500px]:text-[16px]">
        {pathName.includes('reported') ? 'Reported Content' : 'Activity'}
      </div>
      <div className="flex cursor-pointer items-start justify-start max-md:text-sm">
        <div
          onClick={handlePost}
          className={`-ml-[3px] flex w-[80px] gap-[8px] py-2`}>
          <div
            className={`flex gap-2  max-custom-sm:text-xs ${
              pathName.includes('posts')
                ? 'z-10 border-b-2 border-[#571ce0]  pb-2 text-[#571ce0] transition duration-500 ease-in-out dark:border-white dark:text-white'
                : ' opacity-50'
            }
              `}>
            <Plus size={20} className="max-custom-sm:h-4 max-custom-sm:w-4" />
            <button name="post button"> Post</button>
          </div>
        </div>
        <div
          onClick={commentOnClick}
          className={`ml-0 flex w-[130px] cursor-pointer gap-[8px] py-2 pl-0 `}>
          <div
            className={`flex gap-2  max-custom-sm:text-xs ${
              pathName.includes('/comment')
                ? 'z-10 border-b-2 border-[#571ce0]  pb-2 text-[#571ce0] transition duration-500 ease-in-out dark:border-white dark:text-white'
                : ' opacity-50'
            }`}>
            <FaRegComment
              size={20}
              className="max-custom-sm:h-4 max-custom-sm:w-4"
            />
            <button name="comment button"> Comment</button>
            <hr />
          </div>
        </div>

        {!pathName.includes('/reported') && (
          <div
            onClick={reactionOnClick}
            className={`flex w-[130px] cursor-pointer items-center gap-[8px] py-2  `}>
            <div
              className={`flex gap-2 max-custom-sm:text-xs ${
                pathName.includes('/reaction')
                  ? 'z-10 border-b-2 border-[#571ce0] pb-2 text-[#571ce0] transition duration-500 ease-in-out dark:border-white dark:text-white'
                  : ' opacity-50'
              } `}>
              <SmilePlus
                size={20}
                className="max-custom-sm:h-4 max-custom-sm:w-4"
              />
              <button name="reaction button"> Reactions</button>
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

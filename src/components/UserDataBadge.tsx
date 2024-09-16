'use client'
import { UserDataBadgeProps } from '@/utils/interfaces/userData'
import { AlertOctagon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CommentIcon from '@/assets/icons/commentProfileIcon'
import { useEffect, useState } from 'react'
import { BsPostcard } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa6'
import ArrowDown from '@/assets/icons/profileArrowDown'
import { GoReport } from 'react-icons/go'
import ProfileOverView from './ProfileOverView'

const UserDataBadge = ({
  postCount,
  commentCount,
  userName,
  userId,
  reportedPostCount,
  reportedCommentCount,
}: UserDataBadgeProps) => {
  const router = useRouter()
  const [showDropDown, setShowDropDown] = useState(false)

  const routeTo = `/user-activity/${userName
    ?.toLowerCase()
    .replace(/ /g, '-')}-${userId}`

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === 'post') router.push(`${routeTo}/posts`)
    else if (e.currentTarget.id === 'comment')
      router.push(`${routeTo}/comments`)
    else if (e.currentTarget.id === 'report-post')
      router.push(`${routeTo}/reported/posts`)
    else if (e.currentTarget.id === 'report-comment')
      router.push(`${routeTo}/reported/comments`)
  }
  let width = 0
  useEffect(() => {
    width = window.screen.width
  }, [width])
  return (
    <>
      <div
        className={
          `${width < 768 && !showDropDown ? 'mt-[16px] h-[56px]' : 'h-full '}` +
          `flex  max-h-[304px]  w-full flex-col gap-5  rounded-[16px] bg-bg-primary p-4 text-left dark:bg-bg-primary-dark dark:text-white custom-mid-lg:mt-0 custom-mid-lg:min-w-[326px] custom-mid-lg:max-w-[326px]  custom-mid-lg:px-6  custom-mid-lg:pb-[20px] custom-mid-lg:pt-7`
        }>
        <div className="flex  items-center justify-between">
          <h1 className="text-sm text-black dark:text-white custom-mid-sm:text-lg">
            Overview
          </h1>
          <button
            className="block md:hidden"
            onClick={() => setShowDropDown((prev) => !prev)}>
            <ArrowDown
              className={`h-[18px] w-[18px] transform-gpu text-black dark:text-white ${
                showDropDown ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
        <div className="hidden md:block">
          <ProfileOverView
            commentCount={commentCount}
            postCount={postCount}
            reportedCommentCount={reportedCommentCount}
            reportedPostCount={reportedPostCount}
            userId={userId}
            userName={userName}
          />
        </div>

        <div className="block md:hidden">
          {showDropDown && (
            <ProfileOverView
              commentCount={commentCount}
              postCount={postCount}
              reportedCommentCount={reportedCommentCount}
              reportedPostCount={reportedPostCount}
              userId={userId}
              userName={userName}
              showDropDown={showDropDown}
            />
          )}
        </div>
      </div>
    </>
  )
}
export default UserDataBadge

'use client'
import { UserDataBadgeProps } from '@/utils/interfaces/userData'
import { useEffect, useRef, useState } from 'react'
import ArrowDown from '@/assets/icons/profileArrowDown'
import ProfileOverView from './ProfileOverView'
import { usePathname } from 'next/navigation'

const UserDataBadge = ({
  postCount,
  commentCount,
  userName,
  userId,
  reportedPostCount,
  reportedCommentCount,
}: UserDataBadgeProps) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const pathName = usePathname()

  const handleOpenOverview = () => {
    if (setShowDropDown) {
      setShowDropDown((prev) => !prev)
    } else {
      return null
    }
  }
  const routeTo = `/user-activity/${userName
    ?.toLowerCase()
    .replace(/ /g, '-')}-${userId}`

  return (
    <>
      <div
        className={
          pathName.includes('/user-activies')
            ? 'mt-[50px] lg:mt-0'
            : 'mt-[20px] lg:mt-0' +
              `h-[56px]flex w-full flex-col gap-5  rounded-[16px] bg-bg-primary  p-4 text-left dark:bg-bg-primary-dark dark:text-white lg:h-[350] custom-lg:mt-0 custom-lg:w-full custom-lg:p-6 `
        }>
        <div
          className={`
            ${'flex items-center justify-between'}
            `}
          onClick={handleOpenOverview}>
          <h1 className="text-sm text-black dark:text-white custom-mid-sm:text-lg">
            Overview
          </h1>
          <button
            className="block cursor-pointer  lg:hidden"
            onClick={handleOpenOverview}>
            <ArrowDown
              onClick={handleOpenOverview}
              className={`h-[18px] w-[18px] transform-gpu text-black dark:text-white ${
                showDropDown ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
        <div className="hidden lg:block">
          <ProfileOverView
            commentCount={commentCount}
            postCount={postCount}
            reportedCommentCount={reportedCommentCount}
            reportedPostCount={reportedPostCount}
            userId={userId}
            userName={userName}
          />
        </div>

        <div className="block lg:hidden">
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

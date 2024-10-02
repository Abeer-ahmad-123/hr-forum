'use client'
import { UserDataBadgeProps } from '@/utils/interfaces/userData'
import { useEffect, useRef, useState } from 'react'
import ArrowDown from '@/assets/icons/profileArrowDown'
import ProfileOverView from './ProfileOverView'

const UserDataBadge = ({
  postCount,
  commentCount,
  userName,
  userId,
  reportedPostCount,
  reportedCommentCount,
}: UserDataBadgeProps) => {
  const [showDropDown, setShowDropDown] = useState(false)

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

  let width = useRef<number>()
  useEffect(() => {
    width.current = window.screen.width
  }, [width])
  return (
    <>
      <div
        className={
          `${
            width.current
              ? width.current < 1024 && !showDropDown
                ? 'mt-[16px] h-[56px]'
                : 'mt-[16px] h-full '
              : ''
          }` +
          `flex w-full flex-col gap-5  rounded-[16px] bg-bg-primary p-4 text-left dark:bg-bg-primary-dark dark:text-white custom-mid-lg:mt-0 custom-mid-lg:w-full   custom-mid-lg:px-6  custom-mid-lg:pb-[20px] custom-mid-lg:pt-7`
        }>
        <div
          className="flex items-center justify-between"
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

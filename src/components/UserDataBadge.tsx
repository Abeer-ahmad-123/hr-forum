'use client'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { UserDataBadgeProps } from '@/utils/interfaces/userData'
import { AlertOctagon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { BsPostcard } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa6'
import { GoReport } from 'react-icons/go'
import { useSelector } from 'react-redux'

const UserDataBadge = ({
  postCount,
  commentCount,
  userName,
  userId,
  reportedPostCount,
  reportedCommentCount,
}: UserDataBadgeProps) => {
  const router = useRouter()
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  const routeTo = `/feeds/${userName + '-' + userId}/feed`

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    nProgress.start()

    if (e.currentTarget.id === 'post') router.push(`${routeTo}`)
    else if (e.currentTarget.id === 'comment') router.push(`${routeTo}/comment`)
    else if (e.currentTarget.id === 'report-post')
      router.push(`${routeTo}/reported/posts`)
    else if (e.currentTarget.id === 'report-comment')
      router.push(`${routeTo}/reported/comments`)
  }

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])
  return (
    <>
      <div className="flex min-h-[168px] min-w-[15rem] flex-col items-center justify-center rounded-[10px] bg-white  px-[5px] pb-2 pt-3 text-left shadow-lg dark:bg-slate-800 dark:text-white">
        <div className="flex flex-col py-3 leading-[50px]">
          <div
            id="post"
            className="flex cursor-pointer items-center hover:text-accent"
            onClick={handleClick}>
            <span className="pr-2">
              <BsPostcard size={18} />
            </span>
            <span className="hover:underline">
              {`${postCount ?? 0} ${
                postCount > 1 ? 'posts' : 'post'
              } published`}
            </span>
          </div>

          <div
            id="comment"
            className="flex cursor-pointer items-center hover:text-accent"
            onClick={handleClick}>
            <span className="pr-2">
              <FaRegComment size={18} />
            </span>
            <span className="hover:underline">
              {`${commentCount ?? 0} ${
                commentCount > 1 ? 'comments' : 'comment'
              } written`}
            </span>{' '}
          </div>

          <div
            id="report-post"
            className="flex cursor-pointer items-center hover:text-accent"
            onClick={handleClick}>
            <span className="pr-2">
              <AlertOctagon className=" h-4 w-4 cursor-pointer max-custom-sm:w-[14px] max-[380px]:w-3 max-custom-sx:w-[10px]" />
            </span>
            <span className="hover:underline">
              {`${reportedPostCount ?? 0} ${
                reportedPostCount > 1 ? 'posts' : 'post'
              } reported`}
            </span>
          </div>

          <div
            id="report-comment"
            className="flex cursor-pointer items-center hover:text-accent"
            onClick={handleClick}>
            <span className="pr-2">
              <GoReport className=" h-4 w-4 cursor-pointer  max-custom-sm:w-[14px] max-[380px]:w-3 max-custom-sx:w-[10px]" />
            </span>
            <span className="hover:underline">
              {`${reportedCommentCount ?? 0} ${
                reportedCommentCount > 1 ? 'comments' : 'comment'
              } reported`}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
export default UserDataBadge

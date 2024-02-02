'use client'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { AlertOctagon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { BsPostcard } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

interface UserDataBadgeProps {
  postCount: number
  commentCount: number
}

const UserDataBadge = ({ postCount, commentCount }: UserDataBadgeProps) => {
  const router = useRouter()
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  const routeTo = `/feeds/${userData?.username}/feed`

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    nProgress.start()
    e.currentTarget.id === 'post'
      ? router.push(`${routeTo}`)
      : router.push(`${routeTo}/comment`)
  }

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])
  return (
    <>
      <div className="flex min-h-[168px] min-w-[14rem] flex-col items-center justify-center rounded-[10px] bg-white  px-[5px] pb-2 pt-3 text-left shadow-lg dark:bg-slate-800 dark:text-white">
        <div className="flex flex-col py-3 leading-[50px]">
          <div
            id="post"
            className="flex cursor-pointer items-center"
            onClick={handleClick}>
            <span className="pr-2">
              <BsPostcard size={18} />
            </span>
            {`${postCount ? postCount : 0} post published`}
          </div>

          <div
            id="comment"
            className="flex cursor-pointer items-center"
            onClick={handleClick}>
            <span className="pr-2">
              <FaRegComment size={18} />
            </span>
            {`${commentCount ? commentCount : 0} ${
              commentCount === 0 || commentCount === 1 ? 'comment' : 'comments'
            } written`}
          </div>

          <div
            id="report-post"
            className="flex cursor-pointer items-center"
            onClick={handleClick}>
            <span className="pr-2">
              <AlertOctagon className=" h-4 w-4 cursor-pointer max-custom-sm:w-[14px] max-[380px]:w-3 max-custom-sx:w-[10px]" />
            </span>
            {`${commentCount ? commentCount : 0} ${
              commentCount === 0 || commentCount === 1 ? 'post' : 'posts'
            } reported`}
          </div>
        </div>
      </div>
    </>
  )
}
export default UserDataBadge

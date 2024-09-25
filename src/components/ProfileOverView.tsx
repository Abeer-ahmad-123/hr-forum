import { useRouter } from 'next/navigation'
import ReportIcon from '@/assets/icons/reportedPostIcon'
import PublishPostIcon from '@/assets/icons/publishPost'
import CommentReportedIcon from '@/assets/icons/commentReportedIcon'
import CommentIcon from '@/assets/icons/commentProfileIcon'

import { UserDataBadgeProps } from '@/utils/interfaces/userData'

const ProfileOverView = ({
  postCount,
  commentCount,
  userName,
  userId,
  reportedPostCount,
  reportedCommentCount,
}: UserDataBadgeProps) => {
  const router = useRouter()

  console.log(reportedPostCount)

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
  return (
    <div className="flex flex-col pb-[10px] ">
      <div
        id="post"
        className="flex cursor-pointer items-center gap-3 border-b border-bg-tertiary px-4  py-[10px] text-white hover:text-white dark:border-bg-tertiary-dark"
        onClick={handleClick}>
        <span className="">
          <PublishPostIcon className="h-[18px] w-[18px] text-black dark:text-white" />
        </span>
        <span className="text-black hover:underline dark:text-white">
          {`${postCount ?? 0} ${postCount > 1 ? 'posts' : 'post'} published`}
        </span>
      </div>

      <div
        id="comment"
        className="flex cursor-pointer items-center gap-3 border-b border-bg-tertiary px-4 py-[10px] text-white hover:text-white dark:border-bg-tertiary-dark"
        onClick={handleClick}>
        <span className="">
          <CommentIcon className="h-[18px] w-[18px] text-black dark:text-white" />
        </span>
        <span className="text-black hover:underline dark:text-white">
          {`${commentCount ?? 0} ${
            commentCount > 1 ? 'comments' : 'comment'
          } written`}
        </span>{' '}
      </div>

      <div
        id="report-post"
        className="flex cursor-pointer items-center gap-3 border-b border-bg-tertiary px-4 py-[10px] text-white hover:text-white dark:border-bg-tertiary-dark"
        onClick={handleClick}>
        <span>
          <ReportIcon className="h-[18px] w-[18px] text-black dark:text-white" />
        </span>
        <span className="text-black hover:underline dark:text-white">
          {`${reportedPostCount ?? 0} ${
            reportedPostCount > 1 ? 'posts' : 'post'
          } reported`}
        </span>
      </div>

      <div
        id="report-comment"
        className="flex cursor-pointer items-center gap-3  border-b border-bg-tertiary px-4 py-[10px] text-white hover:text-white dark:border-bg-tertiary-dark"
        onClick={handleClick}>
        <span>
          <CommentReportedIcon className="h-[18px] w-[18px] text-black dark:text-white" />
        </span>
        <span className="text-black hover:underline dark:text-white">
          {`${reportedCommentCount ?? 0} ${
            reportedCommentCount > 1 ? 'comments' : 'comment'
          } reported`}
        </span>
      </div>
    </div>
  )
}

export default ProfileOverView

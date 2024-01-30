import { timeFormatInHours } from '@/utils/helper'

const ProfileComment = ({ comment }: any) => {
  return (
    <>
      <div className="mb-4">
        <div className="mb-2 flex flex-col items-start align-baseline">
          <div className="flex flex-row items-center">
            <p
              className="text-sm font-normal leading-none text-gray-900 dark:text-gray-300 max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px]"
              aria-label="user-name"
              onClick={() => {}}>
              {comment.author_details.name}
            </p>
            <p className="pl-1 text-xs font-light text-slate-500 dark:text-gray-400">
              commented on a post
            </p>
          </div>
          <p className="justify-start text-[0.70rem] font-light text-slate-500 dark:text-gray-400 max-custom-sm:text-[9px] max-[392px]:text-[9px] max-custom-sx:text-[7px]">
            {timeFormatInHours(comment.created_at)}
          </p>
        </div>

        <div className="text-left text-[14px] font-light">
          {comment.content}
        </div>
      </div>
      <hr className="mx-3" />
    </>
  )
}

export default ProfileComment

import { timeFormatInHours } from '@/utils/helper'
import { noProfilePicture } from '@/assets/images'

const ProfileComment = ({ comment, index }: any) => {
  return (
    <div>
      <div>
        <div className="flex flex-col items-start align-baseline">
          <div className="flex flex-row items-center gap-2">
            <img
              alt="avatar"
              src={
                comment?.author_details?.profile_picture_url ||
                noProfilePicture.src
              }
              className="h-full max-h-[40px] w-full max-w-[40px] cursor-pointer rounded-full  "
              height={8}
              width={8}
            />
            <p
              className="text-base font-semibold leading-none text-black dark:text-white max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px]"
              aria-label="user-name"
              onClick={() => {}}>
              {comment?.author_details?.name}
            </p>
            <p className="pl-1 text-xs font-light text-slate-500 dark:text-gray-400">
              <div className="flex items-center justify-center gap-2 ">
                <div className="dot h-[5px] w-[5px] rounded-full bg-black opacity-60 dark:bg-white"></div>
                <div className="text-xs opacity-60">
                  {timeFormatInHours(comment.created_at)}
                </div>
              </div>
            </p>
          </div>
        </div>
        <div className="break-all pl-10 text-left text-[14px] font-light">
          {comment.content}
        </div>
      </div>
      <hr className="mt-4 h-[1px] bg-[#202020] opacity-60 dark:bg-bg-tertiary-dark" />
    </div>
  )
}

export default ProfileComment

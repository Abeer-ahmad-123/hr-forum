import { BsPostcard } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa6'

interface UserDataBadgeProps {
  postCount: number
  commentCount: number
}

const UserDataBadge = ({ postCount, commentCount }: UserDataBadgeProps) => {
  return (
    <>
      <div className="flex min-h-[168px] min-w-[14rem] flex-col items-center justify-center rounded-[10px] bg-white  px-[5px] pb-2 pt-3 text-left shadow-lg dark:bg-slate-800 dark:text-white">
        <div className="flex flex-col py-3 leading-[50px]">
          <div className="flex items-center">
            <span className="pr-2">
              <BsPostcard size={18} />
            </span>
            {`${postCount ? postCount : 0} post published`}
          </div>
          <div className="flex items-center">
            <span className="pr-2">
              <FaRegComment size={18} />
            </span>
            {`${commentCount ? commentCount : 0} ${
              commentCount === 0 || commentCount === 1 ? 'comment' : 'comments'
            } written`}
          </div>
        </div>
      </div>
    </>
  )
}
export default UserDataBadge

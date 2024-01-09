import { BsPostcard } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa6'

interface UserDataBadgeProps {
  postCount: number
  commentCount: number
}

const UserDataBadge = ({ postCount, commentCount }: UserDataBadgeProps) => {
  return (
    <>
      <div className="h-auto max-h-screen min-w-[14rem] rounded-[10px] bg-white  pb-2 pt-3 text-left shadow-lg dark:bg-slate-800 dark:text-white  ">
        <div className="flex flex-col py-3 pl-5 leading-[50px]">
          <div className=" flex items-center text-gray-400">
            {' '}
            <span className="pr-2">
              <BsPostcard />{' '}
            </span>
            {`${postCount} post published`}
          </div>
          <div className=" flex items-center text-gray-400">
            {' '}
            <span className="pr-2">
              <FaRegComment />{' '}
            </span>
            {`${commentCount} comment written`}
          </div>
        </div>
      </div>
    </>
  )
}
export default UserDataBadge

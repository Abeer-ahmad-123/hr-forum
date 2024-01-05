import { BiHash } from 'react-icons/bi'
import { BsPostcard } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa6'

const UserDataBadge = () => {
  return (
    <>
      <div className="h-auto max-h-screen min-w-[14rem] rounded-[10px] bg-white  pb-2 pt-3 text-left shadow-lg dark:bg-slate-800 dark:text-white  ">
        <div className="flex flex-col py-3 pl-5 leading-[50px]">
          <div className=" flex items-center text-gray-400">
            {' '}
            <span className="pr-2">
              <BsPostcard />{' '}
            </span>{' '}
            post published
          </div>
          <div className=" flex items-center text-gray-400">
            {' '}
            <span className="pr-2">
              <FaRegComment />{' '}
            </span>{' '}
            comment written
          </div>
          <div className="flex items-center  text-gray-400">
            <span className="pr-2">
              <BiHash />{' '}
            </span>{' '}
            tags followed
          </div>
        </div>
      </div>
    </>
  )
}
export default UserDataBadge

import { noProfilePicture } from '@/assets/images'
import { PostBarProps } from '@/utils/interfaces/newPost'

const PostBar = ({ setAddPost, user }: PostBarProps) => {
  const handleStart = () => {
    setAddPost(true)
  }
  return (
    <div className="border-grey-300 mb-0  flex min-h-[104px] w-full max-w-full cursor-pointer flex-wrap items-center justify-end gap-[16px] rounded-xl border border-solid bg-white px-4 py-[19px] dark:border-[#202020] dark:bg-bg-primary-dark dark:text-white md:flex-nowrap md:justify-between lg:mb-5 lg:max-w-[759px] lg:px-[24px] lg:pt-5">
      <div className="relative h-[44px] w-[44px] overflow-hidden rounded-full">
        <img
          className="h-full w-full rounded-full border-[2px] border-bg-green object-cover"
          src={user?.profilePictureURL || noProfilePicture.src}
          height={44}
          width={44}
          alt="User"
        />
      </div>
      <input
        type="text"
        placeholder="What's on your mind?"
        onBlur={handleStart}
        onFocus={handleStart}
        className="h-[64px]  flex-1 border-b border-gray-300 bg-white text-sm text-gray-400 focus:outline-none dark:border-[#202020] dark:bg-bg-primary-dark "
      />
      <button
        onClick={handleStart}
        className="h-[44px] min-w-[175px] cursor-pointer rounded-[20px] bg-bg-green px-[25px] py-[8px] font-[550] text-black">
        Start new thread
      </button>
    </div>
  )
}

export default PostBar

import { noProfilePicture } from '@/assets/images'
import { PostBarProps } from '@/utils/interfaces/newPost'

const PostBar = ({ setAddPost, user }: PostBarProps) => {
  const handleStart = () => {
    setAddPost(true)
  }
  return (
    <div className="border-grey-300 flex min-h-[104px] w-full max-w-[759px] cursor-pointer flex-wrap items-center justify-between gap-[16px] rounded-xl border border-solid bg-white px-[24px] py-[19px] dark:bg-bg-primary-dark dark:text-white md:flex-nowrap md:justify-between">
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
        className="h-[64px]  flex-1 border-b border-gray-300 bg-white text-sm text-gray-400 focus:border-b focus:border-blue-500 focus:outline-none dark:bg-bg-primary-dark dark:text-white"
      />
      <button
        onClick={handleStart}
        className="h-[44px] min-w-[175px] cursor-pointer rounded-[20px] bg-bg-green px-[25px] py-[8px] font-[550]">
        Start new thread
      </button>
    </div>
  )
}

export default PostBar

'use client'
import { Dialog } from '@/components/ui/Dialog/simpleDialog'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Suspense, useState } from 'react'
import { useSelector } from 'react-redux'
import NewPostForm from './NewPostForm'
import SignInDialog from './SignInDialog'
import { noProfilePicture } from '@/assets/images'
import { usePathname } from 'next/navigation'
import ChannelsBanner from '@/components/ChannelsBanner'
import { ChannelByIdInterface } from '@/utils/interfaces/channels'

interface NewPostProps {
  addPost: boolean
  setAddPost: (arg0: boolean) => void
  path: string
  channels: ChannelByIdInterface[]
}
interface startNewPostProps {
  addPost: boolean
  setAddPost: (arg0: boolean) => void
  path: string
  channels: ChannelByIdInterface[]
}
export default function NewPost({
  setAddPost,
  addPost,
  path,
  channels
}: NewPostProps) {
  const [openDilog, setOpenDilog] = useState(false)
  const data = useSelector((state: LoggedInUser) => state.loggedInUser.token)
  

  const handleOpenDialog = () => {
    setOpenDilog(true)
  }
  const handleClosedialog = () => {
    setOpenDilog(false)
  }

  return (
    <>
      <Dialog open={openDilog} onOpenChange={handleClosedialog}>
        <div className="w-full max-w-screen-md" onClick={handleOpenDialog}>
          {!addPost && <PostBar setAddPost={setAddPost} addPost={addPost} path={path} channels={channels} />}
        </div>
        <Suspense>
          {data ? (
            addPost ? (
              <NewPostForm open={setOpenDilog} setAddPost={setAddPost} />
            ) : null
          ) : (
            <SignInDialog setShowSignModal={() => {}} />
          )}
        </Suspense>
      </Dialog>
    </>
  )
}

export const PostBar = ({
  setAddPost,
  path,
  channels
}: startNewPostProps): JSX.Element => {
  const user = useSelector((state: any) => state.loggedInUser.userData)
  const { profilePictureURL } = user
  const pathname = usePathname()
  const handleStart = () => {
    setAddPost(true)
  }

  if (pathname.includes('/channels'))
    return <ChannelsBanner
      channelSlug={pathname.split('/')[2]}
      path={path}
      setAddPost={setAddPost}
      channels={channels}
    />

  return (
    <div className="border-grey-300 flex min-h-[104px] w-full max-w-[759px] cursor-pointer flex-wrap items-center justify-end gap-[16px] rounded-xl border border-solid bg-white px-[24px] py-[19px] dark:bg-slate-800 dark:text-white md:flex-nowrap md:justify-center">
      <div className="relative h-[44px] w-[44px] overflow-hidden rounded-full">
        <img
          className="h-full w-full rounded-full border-[2px] border-bg-green object-cover"
          src={profilePictureURL || noProfilePicture.src}
          height={44}
          width={44}
          alt="User"
        />
      </div>
      <input
        type="text"
        placeholder="What's on your mind?"
        className="h-[64px] flex-1 border-b border-gray-300 bg-white text-sm text-gray-400 focus:border-b focus:border-blue-500 focus:outline-none dark:bg-slate-800 dark:text-white"
      />
      <button
        onClick={handleStart}
        className="h-[44px] min-w-[175px] cursor-pointer rounded-[20px] bg-bg-green px-[28px] py-[8px] font-[550]">
        Start new thread
      </button>
    </div>
  )
}

'use client'
import { Dialog } from '@/components/ui/Dialog/simpleDialog'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Suspense, useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import NewPostForm from './NewPostForm'
import { noProfilePicture } from '@/assets/images'
import { usePathname } from 'next/navigation'
import ChannelsBanner from '@/components/ChannelsBanner'
import { ChannelByIdInterface } from '@/utils/interfaces/channels'
import { getTokens, getUserData } from '@/utils/local-stroage'
import SignInDialog from '../NewPost/SignInDialog'
import { userData } from '@/utils/interfaces/userData'

interface NewPostProps {
  addPost: boolean
  setAddPost: (arg0: boolean) => void
  path: string
  channels?: ChannelByIdInterface[]
}
interface startNewPostProps {
  addPost: boolean
  setAddPost: (arg0: boolean) => void
  path: string
  channels?: ChannelByIdInterface[]
}
export default function NewPost({
  setAddPost,
  addPost,
  path,
  channels,
}: NewPostProps) {
  const [openDilog, setOpenDilog] = useState(false)
  // const data = useSelector((state: LoggedInUser) => state.loggedInUser.token)
  const accessToken = getTokens()?.accessToken

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
          {!addPost && (
            <PostBar
              setAddPost={setAddPost}
              addPost={addPost}
              path={path}
              channels={channels}
            />
          )}
        </div>
        <Suspense>
          {accessToken ? (
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
  channels,
}: startNewPostProps): JSX.Element => {
  // const user = useSelector((state: any) => state.loggedInUser.userData)
  // const { profilePictureURL } = user
  const pathname = usePathname()
  const [userDetails, setUserDetails] = useState<userData>()

  const handleStart = () => {
    setAddPost(true)
  }
  useEffect(() => {
    setUserDetails(getUserData()?.user)
  }, [])
  if (pathname.includes('/channels'))
    return (
      <ChannelsBanner
        channelSlug={pathname.split('/')[2]}
        path={path}
        setAddPost={setAddPost}
      />
    )

  return (
    <div className="flex min-h-[104px] w-full max-w-[759px] cursor-pointer flex-col items-end justify-end  gap-[16px] rounded-xl  border  border-[#ECF0F5] bg-bg-primary  px-[24px] py-[19px] dark:border-[#202020] dark:bg-bg-primary-dark  dark:text-white md:flex-row md:items-center md:justify-between ">
      <div className="flex w-full items-center gap-4">
        <div className="relative h-[44px] w-[44px] overflow-hidden rounded-full">
          <img
            className="h-full w-full rounded-full border-[2px] border-bg-green object-cover"
            src={userDetails?.profilePictureURL ?? noProfilePicture.src}
            height={44}
            width={44}
            alt="User"
          />
        </div>
        <input
          onFocus={handleStart}
          type="text"
          placeholder="What's on your mind?"
          className="border-[#202020]-300 h-[64px] flex-1 border-b bg-bg-primary text-sm text-gray-400 focus:border-b  focus:outline-none dark:bg-bg-primary-dark dark:text-white"
        />
      </div>

      <button
        onClick={handleStart}
        className="h-[44px] min-w-[175px] cursor-pointer rounded-[20px] bg-bg-green px-[24px] py-[8px] font-[550] text-black">
        Start new thread
      </button>
    </div>
  )
}

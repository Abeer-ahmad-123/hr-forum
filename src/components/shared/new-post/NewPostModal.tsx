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
import PostBar from '../NewPost/Postbar'

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
export default function NewPost({ setAddPost, addPost }: NewPostProps) {
  const [openDilog, setOpenDilog] = useState(false)
  // const data = useSelector((state: LoggedInUser) => state.loggedInUser.token)
  const accessToken = getTokens()?.accessToken

  const handleOpenDialog = () => {
    setOpenDilog(true)
  }
  const handleClosedialog = () => {
    setOpenDilog(false)
  }

  const [user, setUser] = useState<userData>()
  useEffect(() => {
    setUser(getUserData())
  }, [])

  return (
    <>
      <Dialog open={openDilog} onOpenChange={handleClosedialog}>
        <div className="w-full max-w-screen-md" onClick={handleOpenDialog}>
          {!addPost && (
            <PostBar setAddPost={setAddPost} addPost={addPost} user={user} />
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

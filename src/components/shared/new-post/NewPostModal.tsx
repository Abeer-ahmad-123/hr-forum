'use client'
import { PlusButton } from '@/components/shared'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { Suspense, useState } from 'react'
import { useSelector } from 'react-redux'
import NewPostForm from './NewPostForm'
import SignInDialog from './SignInDialog'

interface NewPostProps {
  updatePosts: (arg0: Array<PostsInterface>) => void
}

export default function NewPost({ updatePosts }: NewPostProps) {
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
          <PostBar />
        </div>
        <Suspense>
          {data ? (
            <DialogContent
              className="border bg-white sm:max-w-screen-md"
              route="newpost">
              <NewPostForm updatePosts={updatePosts} open={setOpenDilog} />
            </DialogContent>
          ) : (
            <SignInDialog setShowSignModal={() => {}} />
          )}
        </Suspense>
      </Dialog>
    </>
  )
}

const PostBar = () => {
  return (
    <div className="border-grey-300 flex w-full cursor-pointer items-center justify-center rounded-xl border border-solid bg-white dark:bg-slate-800 dark:text-white">
      <div
        id="search"
        className="text-grey-400 block w-full rounded-bl-xl rounded-tl-xl bg-white py-3 pl-4 pr-3 text-left text-sm text-gray-400 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 dark:bg-slate-800 dark:text-white sm:leading-6">
        Add a new thread
      </div>
      <PlusButton />
    </div>
  )
}

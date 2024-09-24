'use client'
import { Dialog } from '@/components/ui/Dialog/simpleDialog'
import { Suspense, useState } from 'react'
import NewPostForm from './NewPostForm'
import SignInDialog from './SignInDialog'
import Postbar from './Postbar'
import { NewPostProps } from '@/utils/interfaces/newPost'

export default function NewPost({ setAddPost, addPost, user }: NewPostProps) {
  const [openDilog, setOpenDilog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDilog(true)
  }
  const handleClosedialog = () => {
    setOpenDilog(false)
  }

  return (
    <Dialog open={openDilog} onOpenChange={handleClosedialog}>
      <div className="w-full max-w-screen-md" onClick={handleOpenDialog}>
        {!addPost && <Postbar setAddPost={setAddPost} addPost={addPost} />}
      </div>
      <Suspense>
        {user ? (
          addPost ? (
            <NewPostForm open={setOpenDilog} setAddPost={setAddPost} />
          ) : null
        ) : (
          <SignInDialog setShowSignModal={() => {}} />
        )}
      </Suspense>
    </Dialog>
  )
}

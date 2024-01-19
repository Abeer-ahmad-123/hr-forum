'use client'
import { PlusButton } from '@/components/shared'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/Dialog/simpleDialog'
import NewPostForm from './NewPostForm'
import { useSelector } from 'react-redux'
import Signin from '@/components/Signin'
import SignInDialog from './SignInDialog'

export default function NewPost() {
  const [openDilog, setOpenDilog] = useState(false)
  const data = useSelector((state: any) => state.loggedInUser.token)

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
        {data ? (
          <DialogContent className="border bg-white sm:max-w-screen-md">
            <NewPostForm open={setOpenDilog} />
          </DialogContent>
        ) : (
          <SignInDialog setShowSignModal={() => {}} />
        )}
      </Dialog>
    </>
  )
}

const PostBar = () => {
  return (
    <div className=" flex w-full cursor-pointer items-center justify-center rounded-xl bg-white dark:bg-slate-800 dark:text-white">
      <div
        id="search"
        className="text-grey-400 block w-full rounded-bl-xl rounded-tl-xl bg-white py-3 pl-4 pr-3 text-left text-gray-400 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 dark:bg-slate-800 dark:text-white sm:text-sm sm:leading-6">
        Add a new thread
      </div>
      <PlusButton />
    </div>
  )
}

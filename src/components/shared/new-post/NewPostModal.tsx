'use client'
import { PlusButton } from '@/components/shared'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/Dialog/simpleDialog'
import NewPostForm from './NewPostForm'

export default function NewPost() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full">
            <PostBar />
          </button>
        </DialogTrigger>
        <DialogContent className="border bg-white sm:max-w-screen-md">
          <NewPostForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

const PostBar = () => {
  return (
    <div className="m-auto flex max-w-screen-md items-center rounded-xl bg-white dark:bg-dark-primary dark:text-white">
      {/* <div className="flex h-10 items-center p-1.5">
        <img
          src="https://avatar.iran.liara.run/public/boy"
          className="h-8 w-8"
        />
      </div> */}
      <div
        id="search"
        className="text-grey-400 block w-full cursor-pointer rounded-bl-xl rounded-tl-xl bg-white py-3 pl-4 pr-3 text-left text-gray-400 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 dark:bg-dark-primary dark:text-white sm:text-sm sm:leading-6">
        Add a new thread
      </div>
      <PlusButton />
    </div>
  )
}

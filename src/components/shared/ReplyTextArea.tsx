'use client'
import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import TextArea from '../ui/TextArea'
import { useParams, useSearchParams } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/Dialog/simpleDialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import SocialButtons from './SocialButtons'
import Report from '../Report/Report'

function ReplyTextArea({
  submitCallback,
  setIsLoading,
  isLoading,
  commentId,
  inputRef = null,
  author = '',
}: any) {
  const [showTextArea, setShowTextArea] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const params = useParams()
  const postId = params?.id as string

  const toggleTextArea = () => {
    setShowTextArea((pre) => !pre)
  }

  return (
    <div>
      <div className="flex gap-2.5 ">
        <button
          onClick={toggleTextArea}
          className="cursor-pointer text-sm text-gray-400 hover:underline">
          Reply
        </button>
        <Popover>
          <PopoverTrigger>
            <button className="flex items-center space-x-2 py-2 text-sm text-gray-400 hover:underline dark:text-gray-300">
              Share
            </button>
          </PopoverTrigger>

          <PopoverContent className="bg-white">
            <SocialButtons
              className="flex gap-3"
              postId={postId}
              commentId={commentId}
            />
          </PopoverContent>
        </Popover>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
         
        <button className="pointer text-sm text-gray-400 hover:underline">
                Report
              </button>
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[500px]">
        {/* <h2> this the dialogue content for this</h2> */}

        <Report/>
     

        </DialogContent>
      </Dialog>
      </div>

      <div className={` ${!showTextArea && 'hidden'} `}>
        <TextArea
          submitCallback={submitCallback}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          isCommentPage={true}
          inputRef={inputRef}
          placeholder={`Reply to ${author}`}
        />
      </div>
    </div>
  )
}

export default ReplyTextArea

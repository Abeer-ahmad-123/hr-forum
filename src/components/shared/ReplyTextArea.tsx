'use client'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Report from '../Report/Report'
import TextArea from '../ui/TextArea'
import SocialButtons from './SocialButtons'
import SignInDialog from './new-post/SignInDialog'

function ReplyTextArea({
  submitCallback,
  setIsLoading,
  isLoading,
  commentId,
  inputRef = null,
  author = '',
}: any) {
  const [showTextArea, setShowTextArea] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [showSignModal, setShowSignModal] = useState<boolean>(false)

  const params = useParams()
  const postId = params?.id as string
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''

  const toggleTextArea = () => {
    setShowTextArea((pre) => !pre)
  }

  const handleClick = () => {
    if (!tokenInRedux) {
      setShowSignModal(true)
    } else {
      setOpenDialog(true)
    }
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
          <button
            className="pointer text-sm text-gray-400 hover:underline"
            onClick={handleClick}>
            Report
          </button>

          <DialogContent className="bg-white sm:max-w-[500px]">
            <Report
              commentId={commentId}
              reportType="comment"
              setOpenDialog={setOpenDialog}
            />
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

      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog />
      </Dialog>
    </div>
  )
}

export default ReplyTextArea

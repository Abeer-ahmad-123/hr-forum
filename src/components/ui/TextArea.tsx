'use client'
import { useState, useEffect, useRef } from 'react'
import { SendHorizonal } from 'lucide-react'
import { useSelector } from 'react-redux'
import SignInDialog from '../shared/new-post/SignInDialog'
// import {useRouter} from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/Dialog/interceptDialog'
import Image from 'next/image'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { noProfilePicture } from '@/utils/ImagesLink'

function TextArea({
  submitCallback,
  isLoading,
  setIsLoading,
  className,
  btnClass,
  isCommentPage = false,
  shouldFocus = false,
  inputRef = null,
  placeholder = 'Write your comment...',
}: any) {
  const [textAreaValue, setTextAreaValue] = useState('')
  const [open, setIsopen] = useState(false)
  const reduxToken = !!useSelector((state: any) => state.loggedInUser.token)
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  const textareaStyle = {
    width: isCommentPage ? '30rem' : '100%',
    // add other styles as needed
  }

  // const router = useRouter()

  const handleTextAreaChange = (e: any) => {
    setTextAreaValue(e.target.value)
  }

  const handleClick = () => {
    if (reduxToken) {
      submitCallback(textAreaValue)
    } else {
      setIsopen(true)
    }
  }

  const handleClosedialog = () => {
    setIsopen(false)
  }

  const resetStatus = () => {
    if (isLoading.status === 'success') {
      setTextAreaValue('')
      setIsLoading({ loading: false, status: 'null' })
    }
  }

  useEffect(() => {
    resetStatus()
  }, [isLoading])

  return (
    <div className="flex items-center gap-2.5 px-[20px]">
      <Image
        src={userData.profilePictureURL || noProfilePicture}
        className="w-18 h-8 rounded-full border border-solid border-black"
        alt="avatar"
        width={32}
        height={32}
      />
      <div className={`flex ${className} `} style={textareaStyle}>
        <div className="border-grey-700 flex w-full rounded-lg border border-solid">
          <textarea
            ref={inputRef}
            rows={1}
            placeholder={placeholder}
            value={textAreaValue}
            onChange={handleTextAreaChange}
            className={`caret-gray mr-4 w-full resize-none rounded-lg border-none p-2 pl-2 text-left outline-none dark:bg-dark-background`}
          />

          <button
            onClick={handleClick}
            className={`${btnClass} rounded-lg px-3 text-white`}
            disabled={isLoading['loading'] || textAreaValue === ''}>
            <SendHorizonal
              size={25}
              color={
                isLoading['loading'] || textAreaValue === ''
                  ? 'lightgrey'
                  : '#571ce0'
              }
            />{' '}
          </button>
        </div>
      </div>

      {!reduxToken && (
        <Dialog open={open} onOpenChange={handleClosedialog}>
          <SignInDialog />
        </Dialog>
      )}
    </div>
  )
}

export default TextArea

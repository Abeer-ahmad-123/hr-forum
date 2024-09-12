'use client'
import { noProfilePicture } from '@/assets/images'
import { Dialog } from '@/components/ui/Dialog/interceptDialog'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { SendHorizonal } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SignInDialog from '../shared/new-post/SignInDialog'
import { deleteModalState } from '@/services/auth/authService'

const TextArea = ({
  submitCallback,
  isLoading,
  setIsLoading,
  className,
  btnClass,
  isCommentPage = false,
  inputRef = null,
  placeholder = 'Write your comment...',
  classNameOuter,
}: any) => {
  const [textAreaValue, setTextAreaValue] = useState('')
  const [open, setIsopen] = useState(false)
  const reduxToken = !!useSelector((state: any) => state.loggedInUser.token)
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  const pathName = usePathname()
  const router = useRouter()
  const textareaStyle = {
    width: isCommentPage ? '30rem' : '100%',
  }

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
  const handleImgClick = () => {
    router.push('/profile')
    deleteModalState()
  }

  useEffect(() => {
    resetStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <div
      className={` ${
        pathName === '/feeds' ||
        (pathName.includes(`${userData.username}`) && 'mb-4')
      }  ${classNameOuter} flex w-full cursor-pointer items-center gap-1 `}>
      {/* <img
        src={userData.profilePictureURL || noProfilePicture.src}
        className="w-18 h-8 rounded-full border border-solid border-black"
        alt="avatar"
        width={32}
        height={32}
        onClick={handleImgClick}
      /> */}
      <div
        className={`flex ${className} items-center  rounded-[20px] bg-bg-tertiary`}
        style={textareaStyle}>
        <div className="flex h-[44px] w-full  rounded-[20px] dark:bg-dark-background">
          <textarea
            ref={inputRef}
            rows={2}
            placeholder={placeholder}
            value={textAreaValue}
            onChange={handleTextAreaChange}
            style={{ placeContent: 'center' }}
            // * Removed extra spaces
            className={`caret-gray h-full w-full resize-none items-center  rounded-lg border-none bg-bg-tertiary p-2 pl-2 text-left text-[12px] outline-none dark:bg-dark-background max-custom-sx:text-[8px]`}
          />

          <button
            name="post comment button"
            onClick={handleClick}
            className={`${btnClass} rounded-lg px-3 text-white dark:bg-dark-background`}
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
          <SignInDialog setShowSignModal={setIsopen} />
        </Dialog>
      )}
    </div>
  )
}

export default TextArea

'use client'
import { Dialog } from '@/components/ui/Dialog/interceptDialog'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SignInDialog from '../shared/new-post/SignInDialog'
import { deleteModalState } from '@/services/auth/authService'
import StartIcon from '@/assets/icons/sentIcon'

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
  }, [isLoading])

  return (
    <div
      className={` ${
        pathName === '/feeds' ||
        (pathName.includes(`${userData.username}`) && 'mb-4')
      }  ${classNameOuter} flex w-full cursor-pointer items-center gap-1 `}>
      <div
        className={`m-[0px] flex h-[44px] ${className} items-center  rounded-[20px] bg-bg-tertiary px-[20px] py-[8px] dark:bg-dark-background `}
        style={textareaStyle}>
        <div className="flex h-[44px] w-full  rounded-[20px] dark:bg-dark-background ">
          <textarea
            ref={inputRef}
            rows={2}
            placeholder={placeholder}
            value={textAreaValue}
            onChange={handleTextAreaChange}
            className={`caret-gray h-full  w-full resize-none place-content-center items-center    border-none bg-bg-tertiary  text-left text-[12px] outline-none dark:bg-dark-background max-custom-sx:text-[8px]`}
          />

          <button
            name="post comment button"
            onClick={handleClick}
            className={`${btnClass} rounded-lg px-3 text-white dark:bg-dark-background  `}
            disabled={isLoading['loading'] || textAreaValue === ''}>
            <StartIcon className="text-black dark:text-white " />{' '}
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

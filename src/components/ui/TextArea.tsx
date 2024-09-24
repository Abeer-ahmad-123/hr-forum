'use client'
import { Dialog } from '@/components/ui/Dialog/interceptDialog'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import SignInDialog from '../shared/NewPost/SignInDialog'
import StartIcon from '@/assets/icons/sentIcon'
import { getUserData } from '@/utils/local-stroage'
import { userData } from '@/utils/interfaces/userData'

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
  accessToken,
}: any) => {
  const [textAreaValue, setTextAreaValue] = useState('')
  const [open, setIsopen] = useState(false)
  // const userData = useSelector(
  //   (state: LoggedInUser) => state.loggedInUser.userData,
  // )
  const [userData, setUserData] = useState<userData | null>(null)

  const pathName = usePathname()
  const textareaStyle = {
    width: isCommentPage ? '30rem' : '100%',
  }

  const handleTextAreaChange = (e: any) => {
    setTextAreaValue(e.target.value)
  }

  const handleClick = () => {
    if (accessToken) {
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

  useEffect(() => {
    setUserData(getUserData())
  }, [])

  return (
    <div
      className={` ${
        pathName === '/feeds' ||
        (pathName.includes(`${userData?.username}`) && 'mb-4')
      }  ${classNameOuter} flex w-full cursor-pointer items-center gap-1 `}>
      <div
        className={`m-[0px] flex h-[44px] ${className} items-center  rounded-[20px] bg-bg-tertiary px-[20px] py-[8px] dark:bg-bg-tertiary-dark `}
        style={textareaStyle}>
        <div className="flex h-[44px] w-full  rounded-[20px] dark:bg-bg-tertiary-dark ">
          <textarea
            ref={inputRef}
            rows={2}
            placeholder={placeholder}
            value={textAreaValue}
            onChange={handleTextAreaChange}
            className={`caret-gray h-full  w-full resize-none place-content-center items-center    border-none bg-bg-tertiary  text-left text-[12px] outline-none dark:bg-bg-tertiary-dark max-custom-sx:text-[8px]`}
          />

          <button
            name="post comment button"
            onClick={handleClick}
            className={`${btnClass} rounded-lg px-3 text-white dark:bg-bg-tertiary-dark  `}
            disabled={isLoading['loading'] || textAreaValue === ''}>
            <StartIcon className="text-black dark:text-white " />{' '}
          </button>
        </div>
      </div>

      {!accessToken && (
        <Dialog open={open} onOpenChange={handleClosedialog}>
          <SignInDialog setShowSignModal={setIsopen} />
        </Dialog>
      )}
    </div>
  )
}

export default TextArea

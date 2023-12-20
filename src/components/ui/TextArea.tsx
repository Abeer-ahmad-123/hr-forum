'use client'
import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useSelector } from 'react-redux'
import SignInDialog from '../shared/new-post/SignInDialog'
// import {useRouter} from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/Dialog/interceptDialog'

function TextArea({
  submitCallback,
  isLoading,
  setIsLoading,
  className,
  btnClass,
}: any) {
  const [textAreaValue, setTextAreaValue] = useState('')
  const [open, setIsopen] = useState(false)
  const reduxToken = !!useSelector((state: any) => state.loggedInUser.token)

  // const router = useRouter()

  const handleTextAreaChange = (e: any) => {
    setTextAreaValue(e.target.value)
    console.log(className, btnClass)
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
    <>
      <div className={`mb-2 flex ${className}`}>
        <textarea
          rows={1}
          style={{
            caretColor: 'gray',
            outline: 'none',
          }}
          placeholder={'Write your comment...'}
          value={textAreaValue}
          onChange={handleTextAreaChange}
          className={`mr-4 w-full rounded-lg border border-gray-300 p-2 pl-2 text-left dark:bg-dark-background`}
        />

        <button
          onClick={handleClick}
          className={`${btnClass} mr-5 rounded-lg ${
            isLoading['loading'] || textAreaValue === ''
              ? 'border border-gray-400 bg-[#CCCCCC]'
              : 'bg-accent'
          }  px-3 text-white`}
          disabled={isLoading['loading'] || textAreaValue === ''}
        >
          <Send size={20} />{' '}
        </button>
      </div>

      {!reduxToken && (
        <Dialog open={open} onOpenChange={handleClosedialog}>
          <SignInDialog />
        </Dialog>
      )}
    </>
  )
}

export default TextArea

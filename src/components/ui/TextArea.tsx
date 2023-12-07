'use client'
import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useSelector } from 'react-redux'
import SignInDialog from '../shared/new-post/SignInDialog';
// import {useRouter} from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/Dialog/interceptDialog'

function TextArea({ handleTextArea, isLoading }: any) {
  const [textAreaValue, setTextAreaValue] = useState('')
  const [open, setIsopen] = useState(false)
  const reduxToken = !!useSelector((state: any) => state.loggedInUser.token)

  // const router = useRouter()


  const handleTextAreaChange = (e: any) => {
    setTextAreaValue(e.target.value)

  }

  const handleClick = () => {

    if (reduxToken) {

      handleTextArea(textAreaValue)

    }
    else {
      setIsopen(true)
    }
  };

  const handleClosedialog = () => {
    setIsopen(false)
  }

  const setStatus = () => {

    if (isLoading.status === 'success') {
      setTextAreaValue('')
      isLoading.status = 'null'
    }
  }

  console.log(isLoading)
  useEffect(() => {
    setStatus()
    
  }, [isLoading])

  return (

    <>
      <div className="mb-2 flex">
        <textarea
          rows={1}
          style={{
            caretColor: 'gray',
            outline: 'none',
          }}
          placeholder={'Write your comment...'}
          value={textAreaValue}
          onChange={handleTextAreaChange}
          className={`mr-4 h-8 w-full rounded-lg border border-gray-300 p-1 pl-2 text-left dark:bg-dark-background`}
        />


        <button className={`mr-[20px] rounded-lg ${(isLoading['loading'] || textAreaValue === '') ? 'bg-[#CCCCCC] border border-gray-400' : 'bg-accent'}  px-2 text-white`}
          disabled={isLoading['loading'] || textAreaValue === ''}
        >
          <Send size={20} onClick={handleClick} />{' '}
        </button>
      </div>

      {!reduxToken && <Dialog open={open} onOpenChange={handleClosedialog}>
        <SignInDialog />
      </Dialog>
      }

    </>
  )
}

export default TextArea
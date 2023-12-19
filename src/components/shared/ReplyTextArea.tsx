'use client'
import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import TextArea from '../ui/TextArea'
import { useParams, useSearchParams } from 'next/navigation'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import SocialButtons from './SocialButtons'

function ReplyTextArea({
  submitCallback,
  setIsLoading,
  isLoading,
  commentId,
}: any) {
  const [showTextArea, setShowTextArea] = useState(false)

  const params = useParams()
  const postId = params?.id as string

  const toggleTextArea = () => {
    setShowTextArea((pre) => !pre)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center  justify-between  pr-5">
        <div className="flex space-x-5 ">
          <button
            onClick={toggleTextArea}
            className="cursor-pointer text-sm text-gray-400"
          >
            Reply
          </button>
          <Popover>
            <PopoverTrigger>
              <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300">
                <span className="text-sm text-gray-400">Share</span>
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

          <button className="text-sm text-gray-400">Report</button>
        </div>
        <div>
          <MoreHorizontal className="ml-5 text-gray-400" />
        </div>
      </div>

      <div className={`${!showTextArea && 'hidden'} `}>
        <TextArea
          submitCallback={submitCallback}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default ReplyTextArea

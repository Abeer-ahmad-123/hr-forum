'use client'
import { useState, useEffect } from 'react'
import { MoreHorizontal } from 'lucide-react'
import TextArea from '../ui/TextArea'

function ReplyTextArea({ submitCallback, setIsLoading, isLoading }: any) {
  const [showTextArea, setShowTextArea] = useState(false)

  const toggleTextArea = () => {
    setShowTextArea((pre) => !pre)
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between pb-5 pr-5">
        <div className="flex space-x-5 ">
          <button
            onClick={toggleTextArea}
            className="cursor-pointer text-sm text-gray-400">
            Reply
          </button>
          <button className="text-sm  text-gray-400">Share</button>
          <button className="text-sm text-gray-400">Report</button>
        </div>
        <MoreHorizontal className="text-gray-400" />
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

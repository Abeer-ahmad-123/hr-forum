'use client'
import { useState, useEffect } from 'react'
import { MoreHorizontal } from 'lucide-react'
import TextArea from '../ui/TextArea'

function ReplyTextArea({ handleTextArea, isLoading }: any) {
    const [showTextArea, setShowTextArea] = useState(false)

    const toggleTextArea = () => {
        setShowTextArea((pre) => !pre)
    }

    const handleText = (value: any) => {
        handleTextArea(value)
    }

    return (
        <div className='flex flex-col'>
            <div className="flex pr-5 pb-5 justify-between">
                <div className='flex space-x-5 '>
                    <button
                        onClick={toggleTextArea}
                        className="text-gray-400 cursor-pointer text-sm">Reply</button>
                    <button className="text-gray-400  text-sm">Share</button>
                    <button className="text-gray-400 text-sm">Report</button>
                </div>
                <MoreHorizontal className='text-gray-400' />
            </div>

            <div className={`${!showTextArea && 'hidden'} `}>
                <TextArea handleTextArea={handleText} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default ReplyTextArea
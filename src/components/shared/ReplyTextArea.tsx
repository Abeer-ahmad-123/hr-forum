'use client'
import { useState } from 'react'
import { MoreHorizontal, Send } from 'lucide-react'

function ReplyTextArea(){
    const [showTextArea, setShowTextArea] = useState(false)
    const [textAreaValue, setTextAreaValue] = useState('')

    const handleTextAreaChange = (e: any) => {
        console.log(e.target.value)
        setTextAreaValue(e.target.value)
    }

    const toggleTextArea = () => {
        setShowTextArea((pre) => !pre)
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

                        <div className={`flex mb-2 ${!showTextArea && 'hidden'} `}>

                            <textarea
                                rows={1} style={{
                                    caretColor: 'gray',
                               }}
                                value={textAreaValue}
                                onChange={handleTextAreaChange}
                                className={`w-full h-8  pl-1 mr-4 border border-gray-300 rounded-lg`} />



                            <button className='bg-primary text-white px-2 max-h-content rounded-lg mr-[20px]'>
                                <Send
                                    size={20} /> </button>
                        </div>
                    </div>
    )
} 

export default ReplyTextArea
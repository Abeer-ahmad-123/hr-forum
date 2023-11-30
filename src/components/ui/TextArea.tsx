'use client'
import { useState } from 'react'
import { Send } from 'lucide-react'

function TextArea() {
    const [textAreaValue, setTextAreaValue] = useState('')

    const handleTextAreaChange = (e: any) => {
        console.log(e.target.value)
        setTextAreaValue(e.target.value)
    }
    return (

        <div className='flex mb-2'>
            <textarea
                rows={1} style={{
                    caretColor: 'gray',
                }}
                placeholder={"Write your comment..."}
                value={textAreaValue}
                onChange={handleTextAreaChange}
                className={`w-full h-8 p-1 pl-2 text-left mr-4 h-4 border border-gray-300 rounded-lg`} />
            <button className='bg-primary text-white px-2 rounded-lg mr-[20px]'>
                <Send size={20} /> </button>
        </div>
    )
}

export default TextArea
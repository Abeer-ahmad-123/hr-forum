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
      <button className="mr-[20px] rounded-lg bg-accent px-2 text-white">
        <Send size={20} />{' '}
      </button>
    </div>
  )
}

export default TextArea

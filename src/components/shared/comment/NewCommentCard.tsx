import Image from 'next/image'
import { useState } from 'react'

const NewCommentCard = ({ onAdd }: any) => {
  const [text, setText] = useState<any>()

  const focusTextArea = (e: any) => {
    var val = e.target.value
    e.target.value = val
  }

  const handleText = () => {
    onAdd(text)
    setText('')
  }

  const handleChange = (e: any) => {
    setText(e.target.value)
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="flex rounded-md bg-white p-6 dark:bg-dark-primary">
          <Image
            alt="avatar"
            className="mr-4 h-10 w-10 rounded-full"
            src={`/images/avatars/image-juliusomo.webp`}
            height={10}
            width={10}
          />
          <textarea
            value={text}
            autoFocus={false}
            className="mr-4 h-24 w-full resize-none rounded-md border-[1px] px-4 py-2 dark:bg-dark-primary"
            placeholder="Add a comment..."
            onChange={handleChange}
            onFocus={focusTextArea}
          />
          <button
            autoFocus={false}
            className="h-12 w-36 rounded-lg bg-primary text-white hover:opacity-50"
            onClick={handleText}>
            SEND
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden">
        <div className="flex flex-col rounded-md bg-white p-4">
          <textarea
            value={text}
            autoFocus={false}
            className="mb-4 h-24 w-full resize-none rounded-md border-[1px] px-4 py-2"
            placeholder="Add a comment..."
            onChange={handleChange}
            onFocus={focusTextArea}
          />
          <div className="flex justify-between">
            <Image
              height={10}
              width={10}
              alt="avatar"
              className="mr-4 h-10 w-10 rounded-full"
              src={`/images/avatars/image-juliusomo.webp`}
            />

            <button
              autoFocus={false}
              className="h-12 w-28 rounded-lg fill-[#5357B6] text-white"
              onClick={handleText}>
              SEND
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewCommentCard

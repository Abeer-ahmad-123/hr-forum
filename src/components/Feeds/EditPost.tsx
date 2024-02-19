'use client'
import { useState } from 'react'
import { InputField } from '../shared'
import { Editor } from '../shared/editor'

export default function EditPost({ close, title, content, data }: any) {
  const [formValues, setFormValues] = useState({
    title: data?.title || '',
    content: data?.content || '',
  })

  const handleInputChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleEditorContentChange = (value: any) => {
    setFormValues({ ...formValues, content: value })
  }

  const handleEditPost = async () => {
    try {
      close({ isEdit: true })
    } catch (err) {
      throw err
    }
  }

  return (
    <>
      <InputField
        name="title"
        value={formValues.title}
        placeholder="title"
        onChange={handleInputChange}
      />

      <div className="h-[343px] min-h-[343px] border-2 border-gray-300">
        <Editor
          value={formValues.content}
          onContentChange={handleEditorContentChange}
        />
      </div>

      <div className="mt-6 flex justify-evenly">
        <button
          name="save button"
          onClick={handleEditPost}
          className="w-2/5 transform rounded-md bg-primary px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:outline-none ">
          save
        </button>
        <button
          name="cancel button"
          onClick={close}
          className="w-2/5 transform rounded-md bg-primary px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:outline-none ">
          cancel
        </button>
      </div>
    </>
  )
}

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
      // await api.editPost(formValues, data?.id)
      close({ isEdit: true })
    } catch (err) {
      console.log(err)
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

      <div className="border-2 border-gray-300">
        <Editor
          value={formValues.content}
          onContentChange={handleEditorContentChange}
        />
      </div>

      <div className="mt-6 flex justify-evenly">
        <button
          onClick={handleEditPost}
          className="w-2/5 transform rounded-md bg-primary px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:outline-none ">
          save
        </button>
        <button
          onClick={close}
          className="w-2/5 transform rounded-md bg-primary px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:outline-none ">
          cancel
        </button>
      </div>
    </>
  )
}

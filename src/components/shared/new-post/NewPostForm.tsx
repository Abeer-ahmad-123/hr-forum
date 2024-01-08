//@ts-nocheck
import {
  postCreatePostInChannel,
  feedImageCreateInChannel,
} from '@/services/posts'
import { useRef, useState } from 'react'
import { AiOutlineLink as LinkIcon } from 'react-icons/ai'
import { CiImageOn as ImageIcon } from 'react-icons/ci'
import { IoDocumentAttachOutline as AttachmentIcon } from 'react-icons/io5'
import { Editor } from '../editor'
import Dropdown from './Dropdown'
// import { useRouter } from 'next/navigation'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { document } from 'postcss'
import { LiaUserEditSolid } from 'react-icons/lia'
import { Image as iconImg } from 'lucide-react'

export default function NewPostForm({ open }) {
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    channelId: '',
  })

  const [postImage, setPostImage] = useState(false)

  const [selectedImage, setSelectedImage] = useState(null)
  const [image, setImage] = useState()

  const handleImageChange = (event: any) => {
    const content = 'image:'
    setFormValues({ ...formValues, content })
    setPostImage(true)
    const file = event.target.files[0]
    setImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
        console.log('imageeeeeee', selectedImage)
      }
      reader.readAsDataURL(file)
    }
  }

  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)

  const [loading, setLoading] = useState(false)

  const isDisabled =
    !formValues.channelId ||
    !formValues.title ||
    loading ||
    (postImage && !selectedImage)

  const handleEditorContentChange = (content: any) => {
    setFormValues({ ...formValues, content })
  }

  const handleDropDownValue = (value: any) => {
    setFormValues({ ...formValues, ['channelId']: value })
  }

  const imageOnClick = () => {
    setPostImage(true)
  }

  const handleFormChange = (e: any) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const createPost = async () => {
    try {
      setLoading(true)
      const { channelId, ...body } = formValues
      const result = await postCreatePostInChannel({
        channelID: channelId,
        body,
        token,
      })

      console.log('FormValues', formValues)

      if (result?.success) {
        console.log('result', result?.data?.post?.id)
        if (postImage) {
          console.log('here')
          try {
            const formData = new FormData()
            formData.append('file', image)
            const postId = result?.data?.post?.id
            console.log('postId', postId)
            const sendImage = await feedImageCreateInChannel({
              postId,
              formData,
              token,
            })
            if (sendImage?.success) {
              console.log('result', result?.data?.post?.id)
              showSuccessAlert('Post created successfully')
              setLoading(false)
            }
          } catch (err) {
            console.log('error', err)
          }
        }

        showSuccessAlert('Post has been created successfully')
        setLoading(false)
        open(false)
      } else {
        showErrorAlert(result.errors[0])
        setLoading(false)
      }
    } catch (err) {
      showErrorAlert('Something went wrong while creating post.')
      setLoading(false)
      open(false)
    }
    //  finally {

    // }
  }

  return (
    <div className="flex flex-col  space-y-6 rounded-xl bg-white p-2 dark:bg-dark-background">
      <div className="flex w-full justify-between">
        <h3 className="w-content mb-4 flex-shrink-0 text-xl font-medium text-gray-700 dark:text-white">
          Ask for help from the community...
        </h3>
        <Dropdown
          value={formValues.channelId}
          onSelect={handleFormChange}
          handleDropDownValue={handleDropDownValue}
        />
      </div>

      <input
        className="mb-3 w-full rounded-lg p-2 text-xl placeholder-gray-500 ring-1 ring-gray-300 transition duration-200 ease-in-out  focus:outline-none  focus:ring-purple-100 dark:bg-dark-primary dark:text-white dark:placeholder-white"
        type="text"
        placeholder="Add a title"
        name="title"
        onChange={handleFormChange}
        value={formValues.title}
      />

      <div className="flex items-start justify-start">
        <button
          onClick={() => {
            setPostImage(false)
            setSelectedImage('')
          }}
          className={`ml-2 w-[100px] rounded-md p-2 ${
            !postImage
              ? 'bg-blue-500 text-white transition duration-200 hover:bg-blue-600'
              : ' bg-stone-200'
          }`}>
          Post{' '}
        </button>
        <button
          onClick={imageOnClick}
          className={`ml-2 w-[100px] rounded-md p-2 ${
            postImage
              ? 'bg-blue-500 text-white transition duration-200 hover:bg-blue-600'
              : ' bg-stone-200'
          }`}>
          Image{' '}
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageInput"
        />
      </div>

      {postImage ? (
        <>
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="uploadImage"
          /> */}
          <div className="mx-auto flex h-[350px] w-[400px] items-center justify-center rounded-lg border-2 border-gray-200 p-2">
            <label
              htmlFor="changeBackgroundImage"
              className=" w-fit rounded-md p-2">
              {selectedImage ? (
                <img
                  src={selectedImage || ''}
                  // alt="Upload Image"
                  className=" mx-auto h-[350px] w-[400px] rounded-md border-0 hover:cursor-pointer"
                  id="uploadedImage"
                />
              ) : (
                <ImageIcon className="h-[250px] w-[250px] cursor-pointer text-gray-500" />
              )}
            </label>

            <input
              className="hidden"
              id="changeBackgroundImage"
              // ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {/* <label htmlFor="uploadedImage">
              <img
                src={selectedImage || ''}
                // alt="Upload Image"
                className=" mx-auto h-[350px] w-[400px] rounded-md border-0 hover:cursor-pointer"
                id="uploadedImage"
              />
            </label> */}
          </div>

          {/* <div className="flex items-center justify-between">
            <button
              onClick={createPost}
              disabled={isDisabled}
              className={`rounded-md ${
                isDisabled ? 'bg-stone-200' : 'bg-blue-500'
              } p-2 text-white transition duration-200 hover:${
                isDisabled ? 'bg-stone-200' : 'bg-blue-600'
              }`}>
              {loading ? 'Loading...' : 'Next'}
            </button>
          </div> */}
        </>
      ) : (
        <>
          <div className=" ">
            <Editor
              value={formValues.content}
              onContentChange={handleEditorContentChange}
            />
          </div>
        </>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <AttachmentIcon className="h-6 w-6 text-gray-700 transition duration-200 hover:text-blue-500" />
          <ImageIcon className="h-6 w-6 text-gray-700 transition duration-200 hover:text-blue-500" />
          <LinkIcon className="h-6 w-6 text-gray-700 transition duration-200 hover:text-blue-500" />
        </div>
        <button
          onClick={createPost}
          disabled={isDisabled}
          className={`rounded-md ${
            isDisabled ? 'bg-stone-200' : 'bg-blue-500'
          } p-2 text-white transition duration-200 hover:${
            isDisabled ? 'bg-stone-200' : 'bg-blue-600'
          }`}>
          {loading ? 'Loading...' : 'Next'}
        </button>
      </div>
    </div>
  )
}

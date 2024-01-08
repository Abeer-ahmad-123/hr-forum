import {
  postCreatePostInChannel,
  feedImageCreateInChannel,
} from '@/services/posts'
import { useState } from 'react'
import { CiImageOn as ImageIcon } from 'react-icons/ci'
import { Editor } from '../editor'
import Dropdown from './Dropdown'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useSelector } from 'react-redux'
import { Plus, Image } from 'lucide-react'

interface newPostFormInterface {
  open: (arg0: boolean) => void
}

export default function NewPostForm({ open }: newPostFormInterface) {
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    channelId: '',
  })

  const [postImage, setPostImage] = useState(false)

  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null | undefined
  >(null)
  const [image, setImage] = useState<string | Blob>()

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
          try {
            const formData = new FormData()
            if (image) formData.append('file', image)
            const postId = result?.data?.post?.id
            const sendImage = await feedImageCreateInChannel({
              postId: postId,
              file: formData,
              token: token,
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
  }

  const handlePost = () => {
    setPostImage(false)
    setSelectedImage('')
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
        <div
          onClick={handlePost}
          className={`ml-2 flex w-[100px] items-center gap-[8px]  p-2 ${
            !postImage
              ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out'
              : 'opacity-50'
          }`}>
          <Plus size={20} />
          <button>Post</button>
        </div>
        <div
          onClick={imageOnClick}
          className={`ml-2 flex w-[100px] items-center gap-[8px]  p-2 ${
            postImage
              ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out'
              : ' opacity-50'
          }`}>
          <Image size={20} />
          <button>Image</button>
          <hr />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageInput"
        />
      </div>
      <p className="!mb-[35px] !mt-[-2px] ml-2 h-[2px] bg-[#eaecf0]"></p>

      {postImage ? (
        <>
          <div
            className={`mx-auto flex h-[343px] w-[400px] items-center justify-center rounded-lg border-[3px] border-gray-200 ${
              postImage ? 'w-full max-w-[702px] border-dotted' : ''
            }`}>
            <label
              htmlFor="changeBackgroundImage"
              className=" w-fit cursor-pointer rounded-md">
              {selectedImage ? (
                <img
                  src={typeof selectedImage === 'string' ? selectedImage : ''}
                  alt="Upload Image"
                  className=" mx-auto h-[343px] w-[400px] rounded-md border-0 object-contain"
                  id="uploadedImage"
                />
              ) : (
                <>
                  <ImageIcon className="h-[250px] w-[250px]  text-gray-500" />
                  <p>Browser Files to Upload</p>
                </>
              )}
            </label>

            <input
              className="hidden"
              id="changeBackgroundImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </>
      ) : (
        <>
          <div className="h-[343px] min-h-[343px]">
            <Editor
              value={formValues.content}
              onContentChange={handleEditorContentChange}
            />
          </div>
        </>
      )}

      <div className="flex items-center justify-between">
        <div />
        <button
          onClick={createPost}
          disabled={isDisabled}
          className={`w-[100px] rounded-md ${
            isDisabled ? 'bg-stone-200' : 'bg-accent'
          } p-2 text-white transition duration-200`}>
          {loading ? 'Loading...' : 'Next'}
        </button>
      </div>
    </div>
  )
}

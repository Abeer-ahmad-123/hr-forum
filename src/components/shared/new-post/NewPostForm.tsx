import { useInterceptor } from '@/hooks/interceptors'
import {
  feedImageCreateInChannel,
  postCreatePostInChannel,
} from '@/services/posts'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { StoreChannels } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Image as IconImage, Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CiImageOn as ImageIcon } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { Editor } from '../editor'
import Dropdown from './Dropdown'

interface newPostFormInterface {
  open: (arg0: boolean) => void
  setPosts: (arg0: any) => void
}

export default function NewPostForm({ open, setPosts }: newPostFormInterface) {
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    channelId: '',
  })
  const [buttonValue, setButtonValue] = useState('Select a Channel')
  const channels = useSelector(
    (state: StoreChannels) => state.channels.channels,
  )
  const [postImage, setPostImage] = useState(false)

  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null | undefined
  >(null)
  const [image, setImage] = useState<string | Blob>()

  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const userDetails = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )
  const pathname = usePathname()
  const refreshToken = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.refreshToken,
  )
  const { customFetch } = useInterceptor()

  const [loading, setLoading] = useState(false)

  const handleImageChange = (event: any) => {
    const maxAllowedSize = 5 * 1024 * 1024
    if (event.target.files[0].size > maxAllowedSize) {
      event.target.value = ''
      showErrorAlert('Please upload image upto 5mb')
    } else {
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
  }

  const isDisabled =
    !formValues.channelId ||
    !buttonValue ||
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
        customFetch,
        token,
        refreshToken,
      })

      if (result?.success) {
        result.data.post.author_details = {
          name: userDetails.name,
          username: userDetails.username,
          profile_picture_url: userDetails.profilePictureURL,
        }

        result.data.post.reaction_summary = {
          celebrate_count: 0,
          clap_count: 0,
          like_count: 0,
          love_count: 0,
        }

        if (postImage) {
          try {
            const formData = new FormData()
            if (image) formData.append('file', image)
            const postId = result?.data?.post?.id
            const sendImage = await feedImageCreateInChannel({
              postId: postId,
              file: formData,
              customFetch,
              token,
              refreshToken,
            })

            if (sendImage?.success) {
              result.data.post.image_url = sendImage?.data?.url

              setLoading(false)
            }
          } catch (err) {}
        }

        setPosts((prev: LoggedInUser[]) => [result?.data?.post, ...prev])
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

  const checkChannel = () => {
    if (pathname.includes('/channels/')) {
      const channel = channels.find((channel) => {
        return channel.slug === pathname.split('/')[2]
      })
      if (channel) {
        setButtonValue(channel.name)
        setFormValues({ ...formValues, ['channelId']: channel?.id.toString() })
      }
    }
  }
  useEffect(() => {
    checkChannel()
  }, [pathname])

  return (
    <div className="flex flex-col  space-y-6 rounded-xl bg-white p-2 dark:bg-dark-background">
      <div className="flex w-full justify-between">
        <h3 className="w-content mb-4 flex-shrink-0 font-medium text-gray-700 dark:text-white md:text-lg lg:text-xl">
          Ask for help from the community...
        </h3>
      </div>

      <div className="flex justify-between max-[490px]:flex-col">
        <input
          className="mb-3 rounded-lg border border-[#d3d3d3] p-1.5 placeholder-gray-500 ring-1 ring-gray-300 transition duration-200 ease-in-out focus:outline-none focus:ring-purple-100 dark:bg-dark-primary dark:text-white  dark:placeholder-white max-sm:w-[300px] md:w-full md:text-lg lg:text-xl"
          type="text"
          placeholder="Add a title"
          name="title"
          onChange={handleFormChange}
          value={formValues.title}
        />
        <Dropdown
          value={buttonValue}
          onSelect={handleFormChange}
          handleDropDownValue={handleDropDownValue}
        />
      </div>

      <div className="flex items-start justify-start">
        <div
          onClick={handlePost}
          className={`ml-2 flex w-[100px] items-center gap-[8px] p-2 dark:text-white ${
            !postImage
              ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out'
              : 'opacity-50 dark:opacity-100'
          }`}>
          <Plus size={20} />
          <button> Post</button>
        </div>
        <div
          onClick={imageOnClick}
          className={`ml-2 flex w-[100px] items-center gap-[8px] p-2 dark:text-white ${
            postImage
              ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out'
              : ' opacity-50 dark:opacity-100'
          }`}>
          <IconImage size={20} />
          <button> Image</button>
          <hr />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden border border-[#d3d3d3]"
          id="imageInput"
        />
      </div>
      <p className="!mb-[-5px] !mt-[-2px] ml-2 h-[2px] bg-[#eaecf0]"></p>

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
                  height={350}
                  width={400}
                />
              ) : (
                <>
                  <ImageIcon className="h-[250px] w-[250px] text-gray-500  dark:text-white" />
                  <p className='md:text-sm" dark:text-white max-sm:text-xs'>
                    Browser Image to Upload
                  </p>
                </>
              )}
            </label>

            <input
              className="hidden border border-[#d3d3d3]"
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
          {loading ? 'Loading...' : 'Create'}
        </button>
      </div>
    </div>
  )
}

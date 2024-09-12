import { useInterceptor } from '@/hooks/interceptors'
import {
  feedImageCreateInChannel,
  postCreatePostInChannel,
} from '@/services/posts'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { StoreChannels } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from '../editor'
import Dropdown from './Dropdown'
import { PostsInterfaceStore } from '@/utils/interfaces/posts'
import ArrowLeft from '@/assets/icons/ArrowLeftIcon'
import ImageIcon from '@/assets/icons/ImageIcon'
import './style.css'

interface newPostFormInterface {
  open: (arg0: boolean) => void
  updatePosts: (arg0: any) => void
  setAddPost: (arg0: boolean) => void
}

export default function NewPostForm({
  open,
  updatePosts,
  setAddPost,
}: newPostFormInterface) {
  const router = useRouter()
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    channelId: '',
  })
  const [buttonValue, setButtonValue] = useState('HR-General')
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
        // updatePosts((prev: LoggedInUser[]) => [result?.data?.post, ...prev])
        // dispatch(setPosts([result?.data?.post, ...posts]))
        router.refresh()
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

  const handleBack = () => {
    setAddPost(false)
  }
  useEffect(() => {
    checkChannel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className="min-h[635px] flex max-w-[759px] flex-col gap-[18px] rounded-xl  bg-white p-2 px-[24px] pb-[20px] pt-[28px] dark:bg-dark-background">
      <div className="flex flex-col justify-between gap-[18px]">
        <button
          onClick={handleBack}
          className="flex h-[40px]  w-[104px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] bg-bg-tertiary  px-[16px] py-[8px] text-[12px] opacity-60  ">
          <ArrowLeft /> Go back
        </button>
        <h3 className="font-primary text-[18px] font-[800]  text-[#09090B] dark:text-white ">
          Ask for help from the community
        </h3>
      </div>

      <div className=" m-0 flex flex-col-reverse items-start justify-start gap-[18px] ">
        <div className="flex h-[88px] w-full flex-col gap-[8px]">
          <p className="text-sm font-extrabold">Title</p>
          <input
            className="title-input flex h-[56px] rounded-[20px] border-bg-tertiary  px-[20px]  py-[8px] font-primary text-base  placeholder-gray-500 ring-1 ring-gray-300 transition duration-200 ease-in-out focus:outline-none focus:ring-purple-100 dark:bg-dark-primary dark:text-white  dark:placeholder-white max-sm:w-[300px] md:w-full md:text-lg lg:text-xl"
            type="text"
            placeholder="Title goes here *"
            name="title"
            onChange={handleFormChange}
            value={formValues.title}
          />
        </div>

        <Dropdown
          value={buttonValue}
          onSelect={handleFormChange}
          handleDropDownValue={handleDropDownValue}
        />
      </div>

      <div className="m-0 flex  h-[42px] w-[142px] items-center justify-start gap-[8px] rounded-[6px] bg-[#F1F5F9] p-[5px]">
        <div
          onClick={handlePost}
          className={`m-0 flex w-[60px] items-center justify-center   dark:text-white ${
            !postImage
              ? 'h-[32px] w-[60px] rounded-[3px] bg-white px-[16px] py-[6px] font-primary text-sm transition duration-500 ease-in-out'
              : 'h-[32px] w-[60px] text-center font-primary text-sm opacity-50 dark:opacity-100'
          }`}>
          <button name="post button " className="font-medium">
            Text
          </button>
        </div>
        <div
          onClick={imageOnClick}
          className={`m-0 flex w-[60px] items-center justify-center dark:text-white ${
            postImage
              ? 'h-[32px] w-[60px] rounded-[3px] bg-white px-[16px] py-[6px] font-primary text-sm  transition duration-500 ease-in-out'
              : ' h-[32px] w-[60px]  font-primary text-sm opacity-50 dark:opacity-100'
          }`}>
          <button name="image button" className="font-medium">
            Image
          </button>
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

      {postImage ? (
        <>
          <div
            className={`mx-auto flex h-[184px] w-[684px] items-center justify-center rounded-[20px] bg-bg-tertiary ${
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
                  <div className="flex flex-col items-center justify-center">
                    <ImageIcon className="h-[18px] w-[18px]  dark:text-white" />
                    <p className="text-xs text-bg-green dark:text-white ">
                      Upload Image
                      <span className="text-black">
                        {' '}
                        or drag n drop here it
                      </span>
                    </p>
                    <p className="text-xs text-gray-300 dark:text-white ">
                      JPEG, PNG,JPG up to 5mb
                    </p>
                  </div>
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
          name="loadding button"
          onClick={createPost}
          disabled={isDisabled}
          className={`h-[41px] w-[119px] cursor-not-allowed rounded-[100px] px-[15px] py-[8px] ${
            isDisabled
              ? 'bg-stone-200'
              : 'cursor-pointer bg-bg-green text-black'
          } p-2 text-white transition duration-200`}>
          {loading ? 'Loading...' : 'Create Post'}
        </button>
      </div>
    </div>
  )
}

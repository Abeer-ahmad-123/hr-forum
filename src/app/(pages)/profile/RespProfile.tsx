'use client'
import userImage from '@/assets/avatars/image-juliusomo.webp'
import ImageUpload from '@/components/ImageUpload'
import { getUserSpecificPosts } from '@/services/posts'
import {
  getSpecificUserDetails,
  updateUserBgImage,
  updateUserImage,
} from '@/services/user'
import { setUserData } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Mail, User } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { LiaUserEditSolid } from 'react-icons/lia'
import { useDispatch, useSelector } from 'react-redux'
import EditProfileButton from './EditProfileButton'
import PostLoadingSkelton from './PostLoadingSkelton'
import UserDataBadge from './UserDataBadge'
import UserSpecificPosts from './UserSpecificPosts'

interface profileProps {
  userId?: string
}

const RespProfile = ({ userId }: profileProps) => {
  const dispatch = useDispatch()
  const userToken = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.token,
  )
  const imageInputRef = useRef(null)
  const [posts, setUserSpecificPosts] = useState<any>([])
  const [user, setUser] = useState<any>([])
  const morePosts = useRef(false)
  const isFirstUser = useRef(true)

  const [dialogOpen, setOpenDialog] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<any>(null)

  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )

  const getUserSpecificDetail = async () => {
    setLoading(true)
    const response = await getSpecificUserDetails(userId!)
    setUser(response?.user)
    setLoading(false)
  }

  const getAllUserSpecificPosts = async () => {
    setLoading(true)

    const response = await getUserSpecificPosts(
      userId ? userId : userDataInStore?.id,
    )
    if (response.success) {
      setUserSpecificPosts(response?.data?.posts)
      morePosts.current =
        response?.data?.pagination?.TotalPages &&
        response?.data?.pagination?.CurrentPage !==
          response?.data?.pagination?.TotalPages
    }
    setLoading(false)
  }

  const handleInputChange = (e: any) => {
    const file = e.target.files[0]

    setImage(file)
    setOpenDialog(true)
  }

  const saveImage = async (e: any) => {
    if (e === null) {
      setImage(null)
    } else {
      try {
        const file = e
        setImage(file)
        setLoading(true)
        const response = await updateUserImage(userToken, file)
        if (response?.success) {
          showSuccessAlert('Image Uploaded')
          setLoading(false)

          dispatch(
            setUserData({
              userData: {
                ...userDataInStore,
                profilePictureURL: response?.data?.url,
              },
            }),
          )
        } else {
          showErrorAlert('Issues in image uploaded')
        }
      } catch (e: any) {
        throw new Error(e)
      }
    }
    setOpenDialog(false)
  }

  const onBgImageInputChange = async (e: any) => {
    const file = e.target.files[0]
    const response = await updateUserBgImage(userToken, file)
    if (response?.success) {
      showSuccessAlert('Image Uploaded')
      dispatch(
        setUserData({
          userData: {
            ...userDataInStore,
            backgroundPictureURL: response?.data?.url,
          },
        }),
      )
    } else {
      showErrorAlert('Issues in image uploaded')
    }
  }

  const UserSpecificationPosts = async () => {
    if (userId) {
      await getUserSpecificDetail()
    } else {
      setUser(userDataInStore)
    }
    getAllUserSpecificPosts()
  }

  useEffect(() => {
    if (isFirstUser.current) {
      isFirstUser.current = false
      UserSpecificationPosts()
    }
  }, [])

  return (
    <>
      <div className="profile-page  max-md:block">
        <section className="relative block h-[650px]">
          <div
            className="bg-fit absolute top-0 h-[80%] w-full bg-center"
            style={{
              backgroundImage: `url(${
                user?.backgroundPictureURL ||
                'https://source.unsplash.com/random'
              })`,
            }}>
            {!userId && (
              <label
                htmlFor="changeBackgroundImage"
                className="absolute right-4 top-2 z-40  w-fit rounded-full bg-gray-600 p-2 max-md:left-5 max-md:top-2">
                <LiaUserEditSolid className="cursor-pointer text-white" />
              </label>
            )}
            <span
              id="blackOverlay"
              className="absolute left-0 h-full w-full bg-black opacity-50"></span>
          </div>
          <div
            className="h-70-px pointer-events-none absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden"
            style={{ transform: 'translateZ(0px)' }}>
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0">
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </section>

        <section className="bg-blueGray-200 relative mx-auto max-w-screen-xl max-md:w-full">
          <div className=" mx-auto ">
            <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg  bg-white shadow-xl dark:bg-dark-background">
              {/* Profile card start */}
              <div className="px-6">
                <div className="top-0">
                  <div className="flex w-full">
                    <div className="relative flex justify-center md:w-full">
                      {/* TO be corrected */}
                      <Image
                        alt="..."
                        width={96}
                        height={96}
                        src={user?.profilePictureURL || userImage}
                        className="-m-12 max-w-[150px] overflow-hidden rounded-full   align-middle shadow-xl max-md:-ml-4 lg:order-2 lg:w-3/12"
                      />
                      {!userId && (
                        <label
                          htmlFor="changeImage"
                          className="absolute bottom-[-40px] rounded-full  bg-gray-600 p-2">
                          <LiaUserEditSolid className="cursor-pointer text-white" />
                        </label>
                      )}
                      <input
                        key={`${dialogOpen}`}
                        className="hidden"
                        id="changeImage"
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                      />
                      {/* TODO: Uploading an image two times not working!!! */}
                      <ImageUpload
                        image={image}
                        dialogOpen={dialogOpen}
                        setOpenDialog={setOpenDialog}
                        saveCroppedImage={saveImage}
                        disableButton={loading}
                      />
                      {/* ///  */}
                    </div>
                  </div>

                  {!userId && (
                    <EditProfileButton
                      userData={{
                        name: userDataInStore?.name || '',
                        email: userDataInStore?.email || '',
                        bio: userDataInStore?.bio || '',
                      }}
                    />
                  )}
                </div>

                {/* */}

                <div className="flex justify-center gap-[20px] pb-6">
                  <div className="mt-12 p-6 text-center max-md:text-left">
                    <h3 className="text-blueGray-700 text-2xl font-semibold uppercase leading-normal">
                      {user.name}
                    </h3>
                    <div className="mx-auto flex justify-center gap-4 text-base font-light text-gray-600 max-md:justify-start">
                      <div className="flex items-center">
                        <User className="mr-1 text-gray-600" size={17} />
                        <div>{user?.username}</div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="mr-1 text-gray-600" size={17} />
                        <div>{user?.email}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3 text-sm font-normal lg:mx-auto lg:w-[90%]">
                      {user?.bio}
                    </div>
                  </div>
                </div>
              </div>

              {/*Profile card end!!*/}
            </div>
          </div>
          <div className="flex flex-col gap-[2rem] lg:flex-row">
            <div className=" w- flex flex-col gap-[1.5rem]">
              <UserDataBadge />
            </div>
            <div className="flex w-full flex-col">
              {!loading ? (
                <UserSpecificPosts
                  posts={posts}
                  user={user}
                  morePosts={morePosts.current}
                />
              ) : (
                [1, 2, 3, 4, 5].map((_, i) => <PostLoadingSkelton key={i} />)
              )}
            </div>
          </div>
          <footer className="bg-blueGray-200 relative mt-8 pb-6 pt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center justify-center md:justify-between">
                <div className="mx-auto w-full px-4 text-center md:w-6/12"></div>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </>
  )
}

export default RespProfile

'use client'
import BgBanner from '@/assets/icons/bgBanner'
import { noProfilePicture } from '@/assets/images'
import ImageUpload from '@/components/ImageUpload'
import { useInterceptor } from '@/hooks/interceptors'
import {
  getSpecificUserDetails,
  updateUserBgImage,
  updateUserImage,
} from '@/services/user'
import { setUserData } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Mail, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { LiaUserEditSolid } from 'react-icons/lia'
import { useDispatch, useSelector } from 'react-redux'
import EditProfileButton from './EditProfileButton'
import UserActivity from './UserActivity'
import UserDataBadge from './UserDataBadge'
import UserSpecificPosts from './UserSpecificPosts'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'

interface profileProps {
  userId?: string
}

const RespProfile = ({ userId }: profileProps) => {
  const dispatch = useDispatch()
  const userToken = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.token,
  )

  const [profileNav, setProfileNav] = useState<{
    isComment: boolean
    isReaction: boolean
    isPost: boolean
  }>({
    isComment: false,
    isReaction: false,
    isPost: true,
  })

  const refreshToken =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const { customFetch } = useInterceptor()
  const { handleRedirect } = useFetchFailedClient()

  const imageInputRef = useRef(null)
  const [posts, setUserSpecificPosts] = useState<any>([])
  const [user, setUser] = useState<any>('')
  const morePosts = useRef(false)
  const isFirstUser = useRef(true)

  const [dialogOpen, setOpenDialog] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<any>(null)

  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )

  const getUserSpecificDetail = async () => {
    try {
      setLoading(true)
      const response = await getSpecificUserDetails(userId!)
      if (response.success) {
        setUser(response?.user)
        setLoading(false)
      } else {
        throw response.errors[0]
      }
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
      showErrorAlert(`${error}`)
    }
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
        const response = await updateUserImage(
          customFetch,
          userToken,
          refreshToken,
          file,
        )
        if (response?.success) {
          showSuccessAlert('Profile picture updated')
          setLoading(false)
          setUser({ ...user, profilePictureURL: response?.data?.url })
          dispatch(
            setUserData({
              userData: {
                ...userDataInStore,
                profilePictureURL: response?.data?.url,
              },
            }),
          )
        } else {
          throw response.errors[0]
        }
      } catch (e: any) {
        handleRedirect({ error: e })
        showErrorAlert(e)
      }
    }
    setOpenDialog(false)
  }
  const onBgImageInputChange = async (e: any) => {
    try {
      const file = e.target.files[0]
      const response = await updateUserBgImage(
        customFetch,
        userToken,
        refreshToken,
        file,
      )
      if (response?.success) {
        showSuccessAlert('Profile picture updated')
        dispatch(
          setUserData({
            userData: {
              ...userDataInStore,
              backgroundPictureURL: response?.data?.url,
            },
          }),
        )

        setUser({
          ...user,
          backgroundPictureURL: response?.data?.url,
        })
      } else {
        throw response.errors[0]
      }
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
      showErrorAlert(`${error}`)
    }
  }

  const UserSpecificationPosts = async () => {
    if (userId) {
      await getUserSpecificDetail()
    } else {
      setUser(userDataInStore)
    }
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
        <section className="relative mt-5 block h-[650px]">
          {user?.backgroundPictureURL ? (
            <div
              className="absolute top-0 h-[60%] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${user?.backgroundPictureURL})`,
              }}>
              {!userId && (
                <label
                  htmlFor="changeBackgroundImage"
                  className="absolute right-4 top-2 z-40  w-fit rounded-full bg-gray-600 p-2 max-md:left-5 max-md:top-2">
                  <LiaUserEditSolid className="cursor-pointer text-white" />
                </label>
              )}
              <input
                className="hidden"
                id="changeBackgroundImage"
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={onBgImageInputChange}
              />
              <span
                id="blackOverlay"
                className="absolute left-0 h-full w-full bg-black opacity-50"></span>
            </div>
          ) : (
            <>
              <BgBanner />
              {!userId && (
                <label
                  htmlFor="changeBackgroundImage"
                  className="absolute right-4 top-2 z-40  w-fit rounded-full bg-gray-600 p-2 max-md:left-5 max-md:top-2">
                  <LiaUserEditSolid className="cursor-pointer text-white" />
                </label>
              )}
              <input
                className="hidden"
                id="changeBackgroundImage"
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={onBgImageInputChange}
              />
            </>
          )}

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

        <section className="bg-blueGray-200 relative mx-auto w-4/5 max-md:w-full">
          <div className=" mx-auto ">
            <div className="relative -mt-[404px] mb-6 flex w-full min-w-0 flex-col break-words rounded-lg  bg-white shadow-xl dark:bg-dark-background">
              {/* Profile card start */}
              <div className="px-6">
                <div className="top-0">
                  <div className="flex w-full">
                    <div className="relative flex justify-center md:w-full">
                      <img
                        alt="..."
                        width={96}
                        height={96}
                        src={
                          user?.profilePictureURL
                            ? user?.profilePictureURL
                            : noProfilePicture.src
                        }
                        className="-m-12 max-w-[150px] overflow-hidden rounded-full align-middle shadow-xl max-md:-ml-4 lg:order-2 lg:w-3/12"
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
                    </div>
                  </div>

                  {!userId && (
                    <EditProfileButton
                      userData={{
                        name: userDataInStore?.name || '',
                        email: userDataInStore?.email || '',
                        bio: userDataInStore?.bio || '',
                      }}
                      setUserData={setUser}
                    />
                  )}
                </div>

                <div className="flex justify-center gap-[20px] pb-6">
                  <div className="mt-12 p-6 text-center max-md:text-left">
                    <h3 className="text-blueGray-700 text-2xl font-semibold uppercase leading-normal">
                      {user?.name}
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
            </div>
          </div>
          <div className="mt-[40px] flex flex-col gap-[65px] lg:flex-row">
            <div className=" w- flex flex-col gap-[1.5rem]">
              <UserDataBadge
                postCount={
                  userId ? user?.post_count : userDataInStore.post_count
                }
                commentCount={
                  userId ? user?.comment_count : userDataInStore.comment_count
                }
              />
            </div>

            <UserActivity userId={userDataInStore.id} />
          </div>
        </section>
      </div>
    </>
  )
}

export default RespProfile

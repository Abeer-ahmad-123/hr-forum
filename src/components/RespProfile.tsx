'use client'
import BgBanner from '@/assets/images/background-banner.svg'
import { noProfilePicture } from '@/assets/images'
import ImageUpload from '@/components/ImageUpload'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
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
import { profileProps } from '@/utils/interfaces/userData'
import ProfilePageLoading from './Loading/ProfilePageLoading'

const RespProfile = ({ userId }: profileProps) => {
  const { handleRedirect } = useFetchFailedClient()
  const { customFetch } = useInterceptor()

  const dispatch = useDispatch()

  const userToken = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.token,
  )
  const refreshToken =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )

  const [user, setUser] = useState<any>('')
  const [dialogOpen, setOpenDialog] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<any>(null)

  const isFirstUser = useRef(true)
  const imageInputRef = useRef(null)

  const userIdLocal = userId || userDataInStore.id

  const getUserSpecificDetail = async () => {
    try {
      setLoading(true)
      const response = await getSpecificUserDetails(userIdLocal)
      if (response.success) {
        setUser(response?.data?.user)
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

  useEffect(() => {
    if (isFirstUser.current) {
      isFirstUser.current = false
      getUserSpecificDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return user.id ? (
    <div className="profile-page max-w-[100dvw] max-md:block">
      <section className="relative mt-5 block h-[650px]">
        <div
          className="absolute top-0 h-[60%] w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              user?.backgroundPictureURL
                ? user?.backgroundPictureURL
                : BgBanner.src
            })`,
          }}>
          {!userId && (
            <label
              htmlFor="changeBackgroundImage"
              className="absolute right-4 top-2 z-40  w-fit rounded-full bg-gray-600 p-2 max-md:left-5 max-md:top-2">
              <LiaUserEditSolid className="cursor-pointer text-white" />
            </label>
          )}
          <input
            className="hidden border border-[#d3d3d3]"
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
          <div className="border-grey-300 relative -mt-[404px] mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border  border-solid  bg-white shadow-xl dark:bg-slate-800">
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
                      className="hidden border border-[#d3d3d3]"
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

              <div className="flex justify-center gap-[20px] break-all pb-6">
                <div className="mt-12 p-6 text-center max-md:text-left">
                  <h3 className="text-blueGray-700 text-2xl font-semibold uppercase leading-normal dark:text-white">
                    {user?.name}
                  </h3>
                  <div className="mx-auto flex w-full flex-col justify-start gap-4 break-words text-base font-light text-gray-600 md:flex-row md:items-center md:justify-center">
                    <div className="flex items-center gap-3">
                      <User
                        className="mr-1 h-10 w-10 text-gray-600 dark:text-white md:h-7 md:w-7"
                        // size={20}
                      />
                      <div className="dark:text-white"> {user?.username}</div>
                    </div>
                    <div className="flex items-center gap-3 dark:text-white">
                      <Mail
                        className="mr-1 h-10 w-10 text-gray-600 dark:text-white md:h-6 md:w-6"
                        // size={20}
                      />
                      <div className="max-w-[600px]">{user?.email}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-start gap-3 text-center text-sm font-normal md:items-center md:justify-center lg:mx-auto lg:w-[90%]">
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
              postCount={user?.post_count}
              commentCount={user?.comment_count}
              userName={user.name}
              userId={userIdLocal}
              reportedPostCount={user?.reported_post_count}
              reportedCommentCount={user?.reported_comment_count}
            />
          </div>
          <UserActivity userId={userIdLocal} />
        </div>
      </section>
    </div>
  ) : (
    <ProfilePageLoading />
  )
}

export default RespProfile

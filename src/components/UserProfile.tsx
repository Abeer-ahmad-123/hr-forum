'use client'
import { noProfilePicture } from '@/assets/images'
import BgBanner from '@/assets/images/background-banner.svg'
import EditProfileIcon from '@/assets/icons/editProfilePic'
import ImageUpload from '@/components/ImageUpload'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { useInterceptor } from '@/hooks/interceptors'
import {
  getSpecificUserDetails,
  updateUserBgImage,
  updateUserImage,
} from '@/services/user'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { profileProps } from '@/utils/interfaces/userData'
import { Mail, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { LiaUserEditSolid } from 'react-icons/lia'
import EditProfileButton from './EditProfileButton'
import ProfilePageLoading from './Loading/ProfilePageLoading'
import UserActivity from './UserActivity'
import UserDataBadge from './UserDataBadge'
import { setUserDetailsInCookie } from '@/utils/cookies'
import { setValueToLocalStoage } from '@/utils/local-stroage'

const UserProfile = ({
  userId,
  userInCookie,
  accessToken,
  refreshToken,
}: profileProps) => {
  const { handleRedirect } = useFetchFailedClient()
  const { customFetch } = useInterceptor()

  // const dispatch = useDispatch()

  // const userToken = useSelector(
  //   (state: LoggedInUser) => state?.loggedInUser?.token,
  // )
  // const refreshToken =
  //   useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
  //   ''
  // const userDataInStore = useSelector(
  //   (state: LoggedInUser) => state?.loggedInUser?.userData,
  // )

  const [user, setUser] = useState<any>(userId ? '' : userInCookie ?? '')
  const [dialogOpen, setOpenDialog] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<any>(null)

  const isFirstUser = useRef(true)
  const imageInputRef = useRef(null)

  const userIdLocal = userId

  const getUserSpecificDetail = async () => {
    try {
      setLoading(true)
      const response = await getSpecificUserDetails(Number(userIdLocal))
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
          accessToken,
          refreshToken,
          file,
        )
        if (response?.success) {
          showSuccessAlert('Profile picture updated')
          setLoading(false)

          if (userInCookie) {
            await setUserDetailsInCookie({
              ...userInCookie,
              profilePictureURL: response?.data?.url,
            })
          }
          setUser({ ...user, profilePictureURL: response?.data?.url })
          setValueToLocalStoage('userData', response?.data)
          // dispatch(
          //   setUserData({
          //     userData: {
          //       ...userDataInStore,
          //       profilePictureURL: response?.data?.url,
          //     },
          //   }),
          // )
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
        accessToken,
        refreshToken,
        file,
      )
      if (response?.success) {
        showSuccessAlert('Profile picture updated')
        // dispatch(
        //   setUserData({
        //     userData: {
        //       ...userDataInStore,
        //       backgroundPictureURL: response?.data?.url,
        //     },
        //   }),
        // )
        if (userInCookie) {
          await setUserDetailsInCookie({
            ...userInCookie,
            backgroundPictureURL: response?.data?.url,
          })
        }
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
      /**
       * If the current user is current logged-in user then don't fetch details like name, bio email we wll take them from cookies
       */
      // if (user && user?.id === userIdLocal) return
      getUserSpecificDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return user.id ? (
    <div className="profile-page max-w-[1105px] max-md:block">
      <section className="relative mt-5 block h-[650px]">
        <div
          className="absolute top-0 h-full max-h-[241px] w-full overflow-hidden rounded-2xl bg-cover bg-center"
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
              className="absolute bottom-2 right-4 z-40 flex   h-[30px] w-[152px] cursor-pointer items-center justify-center gap-2 rounded-[20px] bg-bg-tertiary px-5 py-2 text-[10px] dark:bg-bg-primary-dark">
              <EditProfileIcon className="text-black dark:text-white " />
              <span className="opacity-60">Update cover photo</span>
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

      <section className="relative  h-[98px] max-w-[1105px]">
        <div className="">
          <div className="relative -mt-[407px] mb-6 flex w-full min-w-0 flex-col">
            {/* Profile card start */}
            <div className="flex h-[98px]">
              <div className="top-0">
                <div className="flex">
                  <div className="relative flex  w-full">
                    <div className="flex flex-row items-start justify-between">
                      <img
                        alt="..."
                        width={98}
                        height={98}
                        src={
                          user?.profilePictureURL
                            ? user?.profilePictureURL
                            : noProfilePicture.src
                        }
                        className="ml-[70px] h-[98px] w-[98px] -translate-y-9 rounded-full border  border-bg-green align-middle  max-md:ml-4 "
                      />
                      {!userId && (
                        <label
                          htmlFor="changeImage"
                          className="absolute bottom-12 left-[140px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-bg-tertiary dark:bg-bg-tertiary-dark max-md:left-[97px]">
                          <EditProfileIcon className="h-3 w-3 cursor-pointer text-black dark:text-white" />
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
                      <div className="flex gap-[20px] break-all pb-6 lg:justify-center">
                        <div className=" w-full p-4  text-start ">
                          <h3 className="text-blueGray-700 text-xl font-semibold uppercase leading-normal dark:text-white">
                            {user?.name}
                          </h3>
                          <div className="mx-auto flex w-full flex-col justify-start gap-4 break-words text-base font-light text-gray-600 md:flex-row md:items-center md:justify-center">
                            {/* <div className="flex items-center gap-3">
                              <User className="mr-1 h-7 w-7 text-gray-600 dark:text-white" />
                              <div className="text-sm dark:text-white md:text-base">
                                {' '}
                                {user?.username}
                              </div>
                            </div> */}
                            <div className="flex items-center gap-3 dark:text-white">
                              <div className="max-w-[600px] text-xs opacity-60">
                                {user?.email}
                              </div>
                            </div>
                          </div>
                          {/* <div className="mt-4 line-clamp-3 gap-3 text-sm font-normal lg:mx-auto lg:w-[90%] lg:text-center">
                            {user?.bio}
                          </div> */}
                        </div>
                      </div>
                    </div>

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
                      name: userInCookie?.name || '',
                      email: userInCookie?.email || '',
                      bio: userInCookie?.bio || '',
                    }}
                    setUserData={setUser}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-end gap-[20px] custom-mid-lg:flex-row-reverse">
          <div className="flex flex-col gap-[20px]">
            <UserDataBadge
              postCount={user?.post_count}
              commentCount={user?.comment_count}
              userName={user.name}
              userId={userIdLocal}
              reportedPostCount={user?.reported_post_count}
              reportedCommentCount={user?.reported_comment_count}
            />
          </div>
          <UserActivity
            userData={userInCookie}
            getUserSpecificDetailFunc={getUserSpecificDetail}
          />
        </div>
      </section>
    </div>
  ) : (
    <ProfilePageLoading />
  )
}

export default UserProfile

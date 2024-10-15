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
import { profileProps, userData } from '@/utils/interfaces/userData'
import { useEffect, useId, useRef, useState } from 'react'
import EditProfileButton from './EditProfileButton'
import UserActivity from './UserActivity'
import UserDataBadge from './UserDataBadge'
import { setUserDetailsInCookie } from '@/utils/cookies'
import { getUserData, setValueToLocalStoage } from '@/utils/local-stroage'
import { getUserReactedPosts, getUserSpecificPosts } from '@/services/posts'
import { getUserComments } from '@/services/comments'
import { usePathname } from 'next/navigation'

const UserProfile = ({
  userId,
  userInCookie,
  accessToken,
  refreshToken,
  posts,
  morePosts,
  comments,
  reactedPosts,
  userFlag,
}: profileProps) => {
  const { handleRedirect } = useFetchFailedClient()
  const { customFetch } = useInterceptor()
  const pathName = usePathname()

  const [user, setUser] = useState<any>(userInCookie ?? userInCookie)
  const [dialogOpen, setOpenDialog] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<any>(null)
  const [otherUserPosts, setOtherUserPosts] = useState([null])
  const [otherUserComments, setOtherUserComments] = useState([null])
  const [otherUserReactions, setOtherUserReactions] = useState<any>([null])
  const [otherUserData, setOtherUserData] = useState<userData>()

  const isFirstUser = useRef(true)
  const imageInputRef = useRef(null)

  const getUserDetail = getUserData()
  const userOrOther = getUserDetail?.name === userInCookie?.name

  const userIdLocal = userId
  const getOtherCommments = async () => {
    try {
      const response = await getUserComments(Number(userId && userId), {
        loadUser: true,
      })
      if (response.success) {
        setOtherUserComments(response?.data?.comments)
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
  const getOtherDetail = async () => {
    const response = await getSpecificUserDetails(Number(userId))
    setOtherUserData(response?.data?.user)
  }
  const getOtherReactions = async () => {
    try {
      setLoading(true)
      const { reactions } = await getUserReactedPosts(
        Number(userId && userId),
        {},
      )
      const reactedPosts = [...reactions.slice(0, 3)]
      if (pathName.includes('/user-activities')) {
        setOtherUserReactions(reactions)
        setLoading(false)
      } else {
        setOtherUserReactions(reactedPosts)
        setLoading(false)
      }
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
      showErrorAlert(`${error}`)
    }
  }

  const postOfother = async () => {
    try {
      let response = []
      if (
        pathName.includes('/user-activities') ||
        (userId && pathName.includes('/profile'))
      ) {
        response = await getUserSpecificPosts(Number(userId), 1, {
          loadReactions: true,
        })
      } else {
        response = await getUserSpecificPosts(Number(userId), 1, {
          loadReactions: true,
        })
      }

      if (response.success) {
        setOtherUserPosts(response?.data?.posts)
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

  const getUserSpecificDetail = async () => {
    try {
      setLoading(true)
      const response = await getSpecificUserDetails(
        Number(userId ? userId : userInCookie.id),
      )
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
    getUserSpecificDetail()
    if (userId) {
      postOfother()
      getOtherCommments()
      getOtherReactions()
      getOtherDetail()
    }
  }, [])
  useEffect(() => {
    if (isFirstUser.current) {
      isFirstUser.current = false

      if (user && user?.id === userIdLocal) return
    }
  }, [])

  return user ? (
    <div className="profile-page  w-full flex-grow max-md:block">
      <section className="relative  block h-[650px]">
        <div
          className={`${
            pathName.includes('user-activities')
              ? 'absolute top-0  h-full max-h-[60px] w-full overflow-hidden rounded-2xl bg-cover bg-center'
              : 'absolute top-0 h-full max-h-[241px] w-full overflow-hidden rounded-2xl bg-cover bg-center'
          } `}
          style={{
            backgroundImage: `url(${
              user?.backgroundPictureURL
                ? user?.backgroundPictureURL
                : BgBanner.src
            })`,
          }}>
          {!userId && userFlag && (
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

      <section className="relative  h-[98px] ">
        <div className="">
          <div
            className={`${
              pathName.includes('/user-activities')
                ? 'relative -mt-[600px] mb-6 flex w-full min-w-0 flex-col'
                : 'relative -mt-[407px] mb-6 flex w-full min-w-0 flex-col'
            }`}>
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
                        className={`${
                          pathName.includes('/user-activities')
                            ? 'ml-[34px] h-[98px]  w-[98px] -translate-y-9 rounded-full border  border-bg-green align-middle  max-md:ml-4'
                            : 'ml-4 h-[98px] w-[98px] -translate-y-9 rounded-full border  border-bg-green align-middle  md:ml-[70px] '
                        }`}
                      />
                      {userOrOther && !userId && (
                        <label
                          htmlFor="changeImage"
                          className={`${
                            pathName.includes('/user-activities')
                              ? 'absolute bottom-12 left-[110px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-bg-tertiary dark:bg-bg-tertiary-dark max-md:left-[97px]'
                              : 'absolute bottom-12 left-[97px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-bg-tertiary dark:bg-bg-tertiary-dark md:left-[140px]'
                          }`}>
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
                            <div className="flex items-center gap-3 dark:text-white">
                              <div className="max-w-[600px] text-xs opacity-60">
                                {user?.email}
                              </div>
                            </div>
                          </div>
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

                {
                  <EditProfileButton
                    userData={{
                      name: userId ? user?.name : userInCookie?.name,
                      email: userInCookie?.email || '',
                      bio: userInCookie?.bio || '',
                    }}
                    userId={userId}
                    accessToken={accessToken}
                    setUserData={setUser}
                    userFlag={userFlag}
                  />
                }
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            pathName.includes('/user-activities')
              ? '-mt-7 flex w-full flex-col justify-end gap-[20px] p-4 lg:flex-row-reverse '
              : 'mt-4 flex w-full flex-col justify-end gap-[20px] p-4 lg:flex-row-reverse '
          }`}>
          <div className="flex w-full flex-col gap-[20px] lg:w-[30%]">
            <UserDataBadge
              postCount={user?.post_count}
              commentCount={
                comments?.length
                  ? comments.length
                  : userId
                  ? otherUserComments.length
                  : user?.comment_count
              }
              userName={user.name}
              userId={userId ? userId : user?.id}
              reportedPostCount={user?.reported_post_count}
              reportedCommentCount={user?.reported_comment_count}
            />
          </div>
          <UserActivity
            userData={otherUserData ? otherUserData : userInCookie}
            getUserSpecificDetailFunc={getUserSpecificDetail}
            postsComing={userId ? otherUserPosts : posts}
            morePosts={morePosts}
            comments={userId ? otherUserComments : comments}
            reactedPosts={userId ? otherUserReactions : reactedPosts}
          />
        </div>
      </section>
    </div>
  ) : (
    ''
  )
}

export default UserProfile

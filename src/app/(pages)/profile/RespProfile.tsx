'use client'
import { getUserSpecificPosts } from '@/services/posts'
import {
  getSpecificUserDetails,
  updateUserBgImage,
  updateUserImage,
} from '@/services/user'
import { setUserData } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
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
  const [loading, setLoading] = useState(false)
  const [posts, setUserSpecificPosts] = useState<any>([])
  const [user, setUser] = useState<any>([])
  const morePosts = useRef(false)
  const isFirstUser = useRef(true)

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

  const onInputChange = async (e: any) => {
    const file = e.target.files[0]
    const response = await updateUserImage(userToken, file)
    if (response?.success) {
      showSuccessAlert('Image Uploaded')
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
      {/* DIV 1 */}
      <div className="profile-page hidden max-md:block">
        <section className="relative block h-[500px]">
          <div
            className="absolute top-0 h-[50%] w-full bg-cover bg-center"
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

        <section className="bg-blueGray-200 relative mt-[-25%] pb-2">
          <div className=" w-full">
            <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg  bg-white shadow-xl dark:bg-dark-background">
              <div className=" px-6">
                <div className=" flex-wrap ">
                  <div className="flex w-full justify-between  pr-4">
                    <div className="relative ">
                      <Image
                        alt="..."
                        width={150}
                        height={150}
                        src={
                          user?.profilePictureURL ||
                          'https://source.unsplash.com/random/300×300'
                        }
                        className="absolute -m-12  h-28 w-28 max-w-[150px] rounded-full border-none align-middle shadow-xl max-md:-ml-4"
                      />
                      {!userId && (
                        <label
                          htmlFor="changeImage"
                          className="absolute w-fit rounded-full  bg-gray-600 p-2 max-md:left-5 max-md:top-2">
                          <LiaUserEditSolid className="cursor-pointer text-white" />
                        </label>
                      )}
                      <input
                        className="hidden"
                        id="changeImage"
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="">
                    {!userId && (
                      <EditProfileButton
                        userData={{
                          name: userDataInStore?.name || '',
                          email: userDataInStore?.email || '',
                          bio: userDataInStore?.bio || '',
                        }}
                      />
                    )}
                    <div className="w-full px-4"></div>
                  </div>
                </div>
                <div className="mt-12 text-center">
                  <h3 className="text-blueGray-700 mb-2 text-4xl font-semibold uppercase leading-normal">
                    {user.name}
                  </h3>
                  <div className="text-blueGray-400 mb-2 mt-0 text-sm font-medium leading-normal">
                    <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg"></i>

                    {user.username}
                  </div>
                  <div className="text-blueGray-600 mb-2 mt-1">
                    <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
                    {user?.email}
                  </div>
                  <div className="text-blueGray-600 max-sm:[6px] mb-2 pb-2 text-left max-md:text-[13px]">
                    <i className="fas fa-university text-blueGray-400 mr-2 text-lg "></i>
                    {user?.bio}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[4rem] md:flex-row">
            <div className=" flex flex-col gap-[1.5rem]">
              {/* <SideCardBadge />
              <SideCardSkill /> */}
              <UserDataBadge />
            </div>

            {/* ///////// */}
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
          <footer className="bg-blueGray-200 relative mt-8 pb-6 pt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center justify-center md:justify-between">
                <div className="mx-auto w-full px-4 text-center md:w-6/12"></div>
              </div>
            </div>
          </footer>
        </section>
      </div>

      {/* DIV 2 desktop view*/}

      <div className="profile-page max-md:hidden">
        <section className="relative block h-[500px]">
          <div
            className="absolute top-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                user?.backgroundPictureURL ||
                'https://source.unsplash.com/random'
              })`,
            }}>
            {!userId && (
              <label
                htmlFor="changeBackgroundImage"
                className="absolute right-4 top-4 z-40 w-fit rounded-full  bg-gray-600 p-2 max-md:left-5 max-md:top-2">
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
        <section className="bg-blueGray-200 relative ">
          <div className="mx-auto w-[80%]">
            <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl dark:bg-dark-background">
              <div className=" px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                    <div className="relative">
                      <Image
                        alt="..."
                        width={150}
                        height={150}
                        src={
                          user?.profilePictureURL ||
                          'https://source.unsplash.com/random/300×300'
                        }
                        className="absolute -m-16 -ml-20  max-w-[150px] rounded-full border-none align-middle shadow-xl lg:-ml-16"
                      />
                      {!userId && (
                        <label
                          htmlFor="changeImage"
                          className="absolute top-10 w-fit rounded-full bg-gray-600 p-2">
                          <LiaUserEditSolid className="cursor-pointer text-white" />
                        </label>
                      )}
                      <input
                        className="hidden"
                        id="changeImage"
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 lg:order-1 lg:w-4/12"></div>
                  <div className="w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
                    {!userId && (
                      <EditProfileButton
                        userData={{
                          name: user?.name || '',
                          email: user?.email || '',
                          bio: user?.bio || '',
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="mt-12 text-center">
                  <h3 className="text-blueGray-700 mb-2 text-4xl font-semibold uppercase leading-normal">
                    {user?.name}
                  </h3>
                  <div className="text-blueGray-400 mb-2 mt-0 text-sm font-medium leading-normal">
                    <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg"></i>

                    {user?.username}
                  </div>
                  <div className="text-blueGray-600 mb-2 mt-1">
                    <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
                    {user?.email}
                  </div>
                  <div className="text-blueGray-600 mb-2 pb-2 text-left">
                    <i className="fas fa-university text-blueGray-400 mr-2 text-lg "></i>
                    {user?.bio}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" mx-auto flex w-[80%]  gap-[4rem] ">
            <div>
              <UserDataBadge />
            </div>
            <div className="w-full">
              {!loading ? (
                <UserSpecificPosts
                  user={user}
                  posts={posts}
                  morePosts={morePosts.current}
                />
              ) : (
                [1, 2, 3, 4, 5].map((_, i) => <PostLoadingSkelton key={i} />)
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default RespProfile

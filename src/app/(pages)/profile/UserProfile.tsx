'use client'
import { updateUserImage } from '@/services/user'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserSpecificPosts } from '@/services/posts'
import { setUserData } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { UserSpecificPostsInterface } from '@/utils/interfaces/posts'
import { LiaUserEditSolid } from 'react-icons/lia'
import EditProfileButton from './EditProfileButton'
import UserDataBadge from './UserDataBadge'
import UserSpecificPosts from './UserSpecificPosts'

function UserProfile() {
  const [userSpecificPosts, setUserSpecificPosts] =
    useState<UserSpecificPostsInterface>({ posts: [], pagination: {} })
  const userToken = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.token,
  )
  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )
  const isFirstUser = useRef(true)
  const imageInputRef = useRef(null)

  const getAllUserSpecificPosts = async () => {
    const response = await getUserSpecificPosts(userDataInStore?.id ?? '')
    if (response.success) {
      setUserSpecificPosts(response?.data)
    }
  }

  const onInputChange = async (e: any) => {
    const file = e.target.files[0]
    const response = await updateUserImage(userToken, file)
    if (response?.success) {
      showSuccessAlert('Image Uploaded')
    } else {
      showErrorAlert('Issues in image uploaded')
    }
  }

  useEffect(() => {
    if (isFirstUser.current) {
      isFirstUser.current = false
      getAllUserSpecificPosts()
    }
  }, [])

  return (
    <div className="profile-page">
      <section className="relative block h-[500px]">
        <div
          className="absolute top-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
          }}>
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
                        userDataInStore?.profilePictureURL ||
                        'https://source.unsplash.com/random/300×300'
                      }
                      className="absolute -m-16 -ml-20  max-w-[150px] rounded-full border-none align-middle shadow-xl lg:-ml-16"
                    />
                    <label
                      htmlFor="changeImage"
                      className="absolute top-10 w-fit rounded-full bg-gray-600 p-2">
                      <LiaUserEditSolid className="cursor-pointer text-white" />
                    </label>
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
                  <EditProfileButton
                    userData={{
                      name: userDataInStore?.name || '',
                      email: userDataInStore?.email || '',
                      bio: userDataInStore?.bio || '',
                    }}
                    setUserData={setUserData}
                  />
                </div>
              </div>
              <div className="mt-12 text-center">
                <h3 className="text-blueGray-700 mb-2 text-4xl font-semibold uppercase leading-normal">
                  {userDataInStore?.name}
                </h3>
                <div className="text-blueGray-400 mb-2 mt-0 text-sm font-medium leading-normal">
                  <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg"></i>

                  {userDataInStore?.username}
                </div>
                <div className="text-blueGray-600 mb-2 mt-1">
                  <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
                  {userDataInStore?.email}
                </div>
                <div className="text-blueGray-600 mb-2 pb-2 text-left">
                  <i className="fas fa-university text-blueGray-400 mr-2 text-lg "></i>
                  {userDataInStore?.bio ||
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque assumenda eligendi quod laborum, esse ad similique sed minima eum quos illum accusantium atque, est ex culpa magnam incidunt. Quibusdam reprehenderit beatae consectetur rem.'}
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
            <UserSpecificPosts />
          </div>
        </div>
        <footer className="bg-blueGray-200 relative mt-8 pb-6 pt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center md:justify-between">
              <div className="mx-auto w-full px-4 text-center md:w-6/12">
                <div className="text-blueGray-500 py-1 text-sm font-semibold">
                  Made with{' '}
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-blueGray-500 hover:text-gray-800"
                    target="_blank">
                    Notus JS
                  </a>{' '}
                  by{' '}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank">
                    {' '}
                    Creative Tim
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}

export default UserProfile

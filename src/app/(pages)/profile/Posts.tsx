import React, { useEffect, useRef, useState } from 'react'
import ProfileBadges from './SideCardBadge'
import Image from 'next/image'
import { getAllPosts, getPostsByChannelId, getUserSpecificPosts } from '@/services/posts'
import { getUserDetails, updateUserImage } from '@/services/user'
import { showSuccessAlert, showErrorAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { UserSpecificPostsInterface, UserSpecificationPostInterface } from '@/utils/interfaces/posts'
import { useSelector } from 'react-redux'
import { getChannelIdByChannelName } from '@/utils/channels'
import { getChannels } from '@/services/channel/channel'

interface userData {
  id: number
  bio: string
  email: string
  name: string
  profilePictureURL: string
  username: string
}
interface ProfilePostsProps {
  post: UserSpecificationPostInterface;
}


export const renderCardTitle = async ()=> {

let initialPosts = []
 
  
  
    const { data } = await getAllPosts({
      loadReactions: true,
      loadUser: true,
    })
    initialPosts = data?.posts
  
  
  console.log('initialPosts', initialPosts)

}

const ProfilePosts =  ({ post }: ProfilePostsProps) => {

  const [userData, setUserData] = useState<userData | null>(null)

  // const [initialPosts, setInitialPosts] = useState([])

//   const renderCardTitle = async () => {
//     const { data } = await getAllPosts({
//       loadReactions: true,
//       loadUser: true,
//     });
//     setInitialPosts(data?.posts);
//   };

//   useEffect(() => {
//     // Call the function to get initialPosts
//     renderCardTitle();
//   }, []);
// console.log('inital psots are', initialPosts)

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






  const getUserData = async () => {
    const response = await getUserDetails(userToken)
    setUserData(response)
  }

  const getAllUserSpecificPosts = async () => {
    const response = await getUserSpecificPosts(userDataInStore?.id ?? '')
    console.log('response', response)
    if (response.success) {
      // console.log('response?.data', response?.data)
      setUserSpecificPosts(response?.data)
    }
  }

  useEffect(() => {
    if (isFirstUser.current) {
      isFirstUser.current = false
      getAllUserSpecificPosts()
      getUserData()
    }
  }, [])

  const onInputChange = async (e: any) => {
    const file = e.target.files[0]
    const response = await updateUserImage(userToken, file)
    if (response?.success) {
      showSuccessAlert('Image Uploaded')
    } else {
      showErrorAlert('Issues in image uploaded')
    }
  }
  
  return (
    <div className='w-full' >
    
      <div className=" w-full cursor-pointer rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
     
        <div className="px-5 py-4">
          <div className=" flex   text-left  font-semibold dark:text-white">
         
              <Image
                src={
                  userData?.profilePictureURL ||
                  'https://source.unsplash.com/random/300×300'
                }
                alt="profile"
                className="relative  h-12 w-12  transform rounded-full"
                width={80}
                height={100}
              />
           
            <div className="flex flex-col ml-5">
              <div className="font-light ">   {userData?.name}</div>   
              <div className="text-[80%] font-normal text-gray-400">
              {userData?.email}
              </div>
            </div>
          </div>
        </div>
        <div className="text-bold  pl-[11%] text-left text-[150%]">
        {post.title}
        </div>
        <div className="mb-[1%] mt-[4%] pb-4  pl-[11%] text-left">
          <div className="mb-[2%]">
            <span>
              <span className="text-green-600"> #</span>Apache
            </span>
            <span>
              <span className="pl-3 text-blue-500"> #</span>Apache
            </span>
            <span>
              <span className="pl-3 text-yellow-400"> #</span>Apache
            </span>
            <span>
              <span className="pl-3 text-violet-600"> #</span>Apache
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProfilePosts

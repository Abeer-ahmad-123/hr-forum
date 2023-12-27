import React, { useEffect, useRef, useState } from 'react'
import ProfileBadges from './SideCardBadge'
import Image from 'next/image'
import {
  getAllPosts,
  getPostsByChannelId,
  getUserSpecificPosts,
} from '@/services/posts'
import { getUserDetails, updateUserImage } from '@/services/user'
import { showSuccessAlert, showErrorAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import {
  UserSpecificPostsInterface,
  UserSpecificationPostInterface,
} from '@/utils/interfaces/posts'
import { useSelector } from 'react-redux'
import { getChannelIdByChannelName } from '@/utils/channels'
import { getChannels } from '@/services/channel/channel'
import Link from 'next/link'
import {
  ChannelByIdInterface,
  StoreChannels,
} from '@/utils/interfaces/channels'
import { CustomLink } from '@/components/shared/customLink/CustomLink'

interface userData {
  id: number
  bio: string
  email: string
  name: string
  profilePictureURL: string
  username: string
}
interface ProfilePostsProps {
  post: UserSpecificationPostInterface
}

export const renderCardTitle = async () => {
  let initialPosts = []

  const { data } = await getAllPosts({
    loadReactions: true,
    loadUser: true,
  })
  initialPosts = data?.posts
}

const ProfilePosts = ({ post }: ProfilePostsProps) => {
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData,
  )
  const channelsKeyValuePair = useSelector(
    (state: StoreChannels) => state?.channels?.channelsKeyValuePair,
  )
  return (
    <CustomLink
      href={`/channels/${post?.slug}/feed/${post?.id}`}
      className="w-full">
      <div className=" w-full rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
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

            <div className="ml-5 flex flex-col">
              <div className="font-light "> {userData?.name}</div>
              <div className="pr-2 text-[80%] font-normal text-gray-400">
                {userData?.email}
              </div>
            </div>
          </div>
        </div>
        <div className="text-bold  pl-[11%] pr-3 text-left text-[150%]">
          {post.title}
        </div>
        <div className="mb-[1%] mt-[4%] pb-4  pl-[11%] text-left">
          <div className="mb-[2%]">
            <span>
              <span className="text-green-600"> #</span>
              {channelsKeyValuePair[post?.channel_id]?.name}
            </span>
          </div>
        </div>
      </div>
    </CustomLink>
  )
}
export default ProfilePosts

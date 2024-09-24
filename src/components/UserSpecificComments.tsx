'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ProfileComment from './ProfileComment'
import { PostsInterface } from '@/utils/interfaces/posts'

interface UserSpecificCommentsProps {
  comments: PostsInterface[]
  user: {
    id: string
    name: string
    username: string
    profilePictureURL: string
  }
}

const UserSpecificComments = ({
  comments,
  user,
}: UserSpecificCommentsProps) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(
      `/user-activity/${user.name?.toLowerCase().replace(/ /g, '-')}-${
        user.id
      }/comments`,
    )
  }

  return (
    <>
      {comments.slice(0, 3).map((comment, index) => {
        return (
          <div key={index}>
            {<ProfileComment comment={comment} index={index} />}
          </div>
        )
      })}
      <div className="flex cursor-pointer justify-center rounded-[6px] border border-[#F4F4F5] py-2 dark:border-[#202020]  dark:text-white max-md:text-sm">
        <div className="group flex justify-center">
          <span onClick={handleClick}>Show All Comments</span>
        </div>
      </div>
    </>
  )
}

export default UserSpecificComments

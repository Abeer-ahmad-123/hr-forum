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
          <div className="ml-10" key={index}>
            {<ProfileComment comment={comment} index={index} />}
          </div>
        )
      })}
      <div className="flex cursor-pointer justify-center py-3 max-md:text-sm">
        <div className="group flex justify-center">
          <span onClick={handleClick}>Show all comments</span>
          <div className="origin-center transform transition-transform group-hover:scale-x-150">
            <ArrowRight size={16} className="ml-1 inline-block" />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSpecificComments

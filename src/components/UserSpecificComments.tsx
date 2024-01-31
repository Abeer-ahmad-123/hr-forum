'use client'

import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { ArrowRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import ProfileComment from './ProfileComment'

interface UserSpecificCommentsProps {
  comments: []
}

const UserSpecificComments = ({ comments }: UserSpecificCommentsProps) => {
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData,
  )

  return (
    <>
      {comments.slice(0, 3).map((comment, index) => {
        return (
          <div className="pl-4" key={index}>
            {ProfileComment({ comment })}
          </div>
        )
      })}
      <div className="group flex cursor-pointer justify-center py-3 max-md:text-sm">
        <span onClick={() => {}}>Show all comments</span>
        <div className="origin-center transform transition-transform group-hover:scale-x-150">
          <ArrowRight size={16} className="ml-1 inline-block" />
        </div>
      </div>
    </>
  )
}

export default UserSpecificComments

'use client'

import { getUserComments } from '@/services/comments'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileComment from './ProfileComment'
import ProfileCommentSkelton from './ProfileCommentSkelton'

const UserSpecificComments = () => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData,
  )
  const userId = userData?.id

  const getComments = async () => {
    try {
      setIsLoading(true)
      const response = await getUserComments(userId, {
        loadUser: true,
      })
      if (response.success) {
        setComments(response?.data?.comments)
      }
    } catch (error) {
      if (error instanceof Error) {
        handleFetchFailed(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  return isLoading ? (
    [1, 2, 3].map((_, i) => <ProfileCommentSkelton key={i} />)
  ) : (
    <>
      {comments.slice(0, 3).map((comment, index) => {
        return (
          <div className="pl-4" key={index}>
            {ProfileComment({ comment })}
          </div>
        )
      })}
      <div className="flex cursor-pointer justify-center py-3 max-md:text-sm">
        <span onClick={() => {}}>Show all comments</span>
        <div>
          <ArrowRight size={16} className="ml-1 inline-block" />
        </div>
      </div>
    </>
  )
}

export default UserSpecificComments

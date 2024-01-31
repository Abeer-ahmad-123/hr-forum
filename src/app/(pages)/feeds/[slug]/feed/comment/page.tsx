'use client'
import UserCommentsFeeds from '@/components/UserCommentsFeeds'
import { getUserComments } from '@/services/comments'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const UserComments = () => {
  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )
  const [comments, setComments] = useState([])
  const getComments = async () => {
    try {
      const response = await getUserComments(userDataInStore?.id, {
        loadUser: true,
      })
      if (response.success) {
        setComments(response?.data?.comments)
      }
    } catch (error) {
      if (error instanceof Error) {
        handleFetchFailed(error)
      }
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <div>
      <UserCommentsFeeds />
    </div>
  )
}

export default UserComments

'use client'
import UserCommentsFeeds from '@/components/UserCommentsFeeds'

interface UserCommentsProps {
  params: {
    slug: string
  }
}
const UserComments = ({ params }: UserCommentsProps) => {
  return (
    <div>
      <UserCommentsFeeds slug={params.slug} />
    </div>
  )
}

export default UserComments

import UserCommentsFeeds from '@/components/UserCommentsFeeds'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface UserCommentsProps {
  params: {
    slug: string
  }
}
const UserComments = ({ params }: UserCommentsProps) => {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return (
      <div>
        <UserCommentsFeeds slug={params.slug} />
      </div>
    )
  }
}
export default UserComments

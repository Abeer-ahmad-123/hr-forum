import UserFeeds from '@/components/UserFeeds'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface UserFeedPageProps {
  params: {
    slug: string
  }
}

const UserFeedPage = ({ params }: UserFeedPageProps) => {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return <UserFeeds slug={params.slug} />
  }
}
export default UserFeedPage

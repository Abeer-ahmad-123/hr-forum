import UserReactionFeeds from '@/components/UserReactionFeeds'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface UserReactionProps {
  params: {
    slug: string
  }
}

const UserReaction = ({ params }: UserReactionProps) => {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return <UserReactionFeeds slug={params.slug} />
  }
}
export default UserReaction

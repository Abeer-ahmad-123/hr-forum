import UserFeeds from '@/components/UserFeeds'
interface UserFeedsProps {
  params: {
    userId: string
  }
}

function UserFeedPage({ params }: UserFeedsProps) {
  return <UserFeeds params={params} />
}

export default UserFeedPage

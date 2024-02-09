import UserFeeds from '@/components/UserFeeds'

interface UserFeedPageProps {
  params: {
    slug: string
  }
}

const UserFeedPage = ({ params }: UserFeedPageProps) => {
  return <UserFeeds slug={params.slug} />
}

export default UserFeedPage

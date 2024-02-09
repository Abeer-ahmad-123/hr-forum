import UserReactionFeeds from '@/components/UserReactionFeeds'

interface UserReactionProps {
  params: {
    slug: string
  }
}

const UserReaction = ({ params }: UserReactionProps) => {
  return <UserReactionFeeds slug={params.slug} />
}

export default UserReaction

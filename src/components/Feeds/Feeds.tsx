import { getChannels } from '@/services/channel/channel'
import { Card } from '../shared'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getChannelIdByChannelName } from '@/utils/channels'

// Feed is a functional component that takes data and displays it as cards
interface FeedProps {
  channelSlug?: string
}
const Feeds = async ({ channelSlug }: FeedProps) => {
  const { channels } = await getChannels()
  let posts = []
  if (channelSlug) {
    console.log('first 14', channelSlug)
    const getChannelId = getChannelIdByChannelName(channelSlug, channels)
    console.log(getChannelId)
    posts = await getPostsByChannelId({
      id: getChannelId,
      loadReactions: true,
      loadUser: true,
    })
  } else {
    console.log('first 21')
    posts = await getAllPosts({ loadReactions: true, loadUser: true })
  }
  posts = posts?.posts
  return (
    <div className="min-h-[70vh]">
      {!!posts.length &&
        posts?.map((post: any) => {
          return <Card key={post.title} post={post} />
        })}
    </div>
  )
}

export default Feeds

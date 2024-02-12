import { ChannelByIdInterface } from './channels'
import { PostsInterface } from './posts'
import { SearchParams } from './renderFeeds'

export interface FeedProps {
  channelSlug?: string | null
  initialPosts: PostsInterface[]
  channels: ChannelByIdInterface[]
  morePosts?: boolean
  searchParams: SearchParams
  path: string
}

export type CommentObject = {
  [key: string]: number
}

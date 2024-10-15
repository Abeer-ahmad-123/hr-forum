import { ChannelByIdInterface } from './channels'
import { PostsInterface } from './posts'
import { SearchParams } from './renderFeeds'
import { userData } from './userData'

export interface FeedProps {
  channelSlug?: string | null
  initialPosts: PostsInterface[]
  channels: ChannelByIdInterface[]
  morePosts?: boolean
  searchParams: SearchParams
  path: string
  user: userData
  channelImg?: string
  token?: string
}

export type CommentObject = {
  [key: string]: number
}

export interface RenderFeedWithLoadingProps {
  searchParams: SearchParams
  channelSlug?: string
  path: string
}

export interface FeedPageProps {
  searchParams: SearchParams
}

export interface SinglePostProps {
  postId: string
  searchParams: SearchParams
  data?: {
    post: any
    comments: any
  }
}

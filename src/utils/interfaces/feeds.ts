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
  user:number
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

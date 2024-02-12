import { EmojiActionInterface, ReactionSummary } from './card'

export interface PostsInterface {
  id: number
  created_at: string
  updated_at: string
  title: string
  content: string
  slug: string
  user_id: number
  image_url?: string
  channel_id: number
  author_details: {
    username: string
    name: string
    profile_picture_url: string
  }
  reaction_summary: {
    like_count: number
    love_count: number
    clap_count: number
    celebrate_count: number
  }
  total_comments: number
  user_reaction: string
  user_has_bookmarked: boolean
  user_has_reported: boolean
}

export interface UserSpecificPostsInterface {
  posts: PostsInterface[]
  pagination: Object
}

export interface PostActionBarProps {
  postId: string
  userReaction: string
  setUserReaction: (arg0: string) => void
  inputRef?: any
  setBookmarkupdated?: React.Dispatch<React.SetStateAction<boolean>> // TODO: fix this: Need to find proper type ()=>void is not working
  updateReactionArray: (
    reactionArray: ReactionSummary,
    reactionObject: EmojiActionInterface,
  ) => void
  reactionSummary: ReactionSummary
  disableReactionButton: boolean
  setDisableReactionButton: (arg0: boolean) => void
  userComment: {
    id: string
  }
}

export interface CommentCountStore {
  posts: {
    commentCount: {
      [key: number]: number
    }
  }
}

export interface CommentCount {
  [key: number]: number
}

export interface PostReactionBarProps {
  postId: string
  reaction_summary: any
}

export type ReactionCounts = {
  [key: string]: number
}

export interface PostsStateStore {
  posts: PostsInterface[] // Adjust the type according to your actual data structure
  commentCount: { [postId: string]: number } // Use string as the index type
}

export interface PostsInterfaceStore {
  posts: {
    posts: PostsInterface[]
  }
}

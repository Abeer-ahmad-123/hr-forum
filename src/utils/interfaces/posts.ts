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
export interface UserSpecificationPostInterface {
  id: number
  created_at: string
  updated_at: string
  title: string
  content: string
  slug: string
  user_id: number
  channel_id: number
  total_comments: number
  user_reaction: Object
  user_has_bookmarked: boolean
}
export interface UserSpecificPostsInterface {
  posts: UserSpecificationPostInterface[]
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
  getPost: () => void
  disableReactionButton: boolean
  setDisableReactionButton: (arg0: boolean) => void
  setCommentCount: (arg0: number) => void
}

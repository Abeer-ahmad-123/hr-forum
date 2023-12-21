interface PostsInterface {
  id: number
  created_at: string
  updated_at: string
  title: string
  content: string
  slug: string
  user_id: number
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

export interface userData {
  id: number
  bio: string
  email: string
  name: string
  profilePictureURL: string
  username: string
  post_count?: number
  comment_count?: number
}

export interface UserParamsProps {
  params: {
    slug: string
  }
}

export interface SlugProps {
  slug: string
}

export interface UserDataBadgeProps {
  postCount: number
  commentCount: number
  userName: string
  userId: string
  reportedPostCount: number
  reportedCommentCount: number
}

export interface profileProps {
  userId?: string
}

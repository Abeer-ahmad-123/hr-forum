import { UserData } from './cookies'

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

export interface ReportedParamsProps {
  params: {
    slug: string
  }
}

export interface UserDataBadgeProps {
  postCount: number
  commentCount: number
  userName: string
  userId: string | number | undefined
  reportedPostCount: number
  reportedCommentCount: number
  showDropDown?: boolean
}

export interface profileProps {
  userId?: string
  userInCookie: UserData
  accessToken: string
  refreshToken: string
  posts?: []
  morePosts?: {}
  comments?: []
  reactedPosts?: any[]
  userFlag?: boolean
  token?: string
}

export interface ReportedProps {
  slug: string
  userData: userData
  accessToken: string
}
export interface ActivityButtonProps {
  slug: string
}

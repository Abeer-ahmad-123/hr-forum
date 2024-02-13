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

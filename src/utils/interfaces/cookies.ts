export interface ResponseData {
  data: {
    token: string
    userData:
      | {
          id: string
          email: string
          username: string
          name: string
          bio: string
          profilePictureURL: string
        }
      | UserData
    'refresh-token': string
  }
}
export interface UserData {
  id: number
  email: string
  username: string
  name: string
  bio: string
  profilePictureURL: string
  backgroundPictureURL: string
  post_count: number
  comment_count: number
  date_joined: Date
  reported_post_count: number
  reported_comment_count: number
}
export interface setTokenCookies {
  token: string
  ['refresh-token']: string
}

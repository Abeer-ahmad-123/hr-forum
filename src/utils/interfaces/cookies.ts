export interface ResponseData {
  data: {
    token: string
    userData: {
      id: string
      email: string
      username: string
      name: string
      bio: string
      profilePictureURL: string
    }
    'refresh-token': string
  }
}
export interface setTokenCookies {
  token: string
  ['refresh-token']: string
}

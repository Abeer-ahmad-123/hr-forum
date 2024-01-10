export interface LoggedInUser {
  loggedInUser: {
    token: string
    userData: {
      id: string
      email: string
      username: string
      name: string
      bio: string
      profilePictureURL: string
      backgroundPictureURL: string
      post_count?: number
      comment_count?: number
    }
    refreshToken: string | null
  }
}

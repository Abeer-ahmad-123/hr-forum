export interface LoggedInUser {
  loggedInUser: {
    token: string | null
    userData: {
      id: string | null
      email: string
      username: string
      name: string
      bio: string
      profilePictureURL: string
    }
    refreshToken: string | null
  }
}

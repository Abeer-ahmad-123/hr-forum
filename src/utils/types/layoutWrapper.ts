import { ChannelInterface } from '../interfaces/channels'
import { userData } from '../interfaces/userData'

export type LayoutWrapperProps = {
  children: React.ReactNode
  pathname: string | null
  user: userData
  token: string
  serverState: {
    channels: {
      channels: ChannelInterface[]
      channelsKeyValuePair: {}
    }
    posts: {
      posts: never[]
      commentCount: {}
    }

    loggedInUser: {
      token: string | null
      userData: any
      refreshToken: string | null
    }
  }
}

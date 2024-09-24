import { ChannelInterface } from '../interfaces/channels'

export type LayoutWrapperProps = {
  children: React.ReactNode
  pathname: string | null
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

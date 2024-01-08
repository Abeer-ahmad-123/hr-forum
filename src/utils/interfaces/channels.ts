export interface ChannelInterface {
  description: string
  id: number
  name: string
  slug: string
  color?: string
  code?: string
  href?: string
  ImageURL: string
}
export interface StoreChannels {
  channels: {
    channels: ChannelInterface[]
    channelsKeyValuePair: Record<number, ChannelByIdInterface>
  }
}

export interface ChannelByIdInterface {
  id: number
  name: string
  color: string
  code: string
  href: string
  slug: string
}

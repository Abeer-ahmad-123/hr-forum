export interface ChannelInterface {
  description: string
  id: number
  name: string
  slug: string
  color?: string
  code?: string
  href?: string
}
export interface StoreChannels {
  channels: {
    channels: ChannelInterface[]
  }
}
export interface ChannelByIdInterface {
  id: number
  name: string
  color: string
  code: string
  href: string
}

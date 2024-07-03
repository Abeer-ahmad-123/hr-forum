import { sidebarChannels } from './data'
import { ChannelByIdInterface, ChannelInterface } from './interfaces/channels'

export const getChannelIdByChannelName = (
  channelName = '',
  allChannelsList = sidebarChannels,
) => {
  const channelDataWithRespectiveChannelName = allChannelsList.filter(
    (channelData) => {
      return channelName === channelData?.slug
    },
  )

  return channelDataWithRespectiveChannelName[0]?.id || null
}

export const arrayToKeyIdNValueData = (
  arrayOfChannels: ChannelInterface[] | ChannelByIdInterface[],
) => {
  let obj = {}
  arrayOfChannels?.forEach(
    (channelData: ChannelInterface | ChannelByIdInterface) => {
      obj = Object.assign(obj, { [channelData?.id]: channelData })
    },
  )
  return obj
}

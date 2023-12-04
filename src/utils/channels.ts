import { sidebarChannels } from './data'

export const getChannelIdByChannelName = (
  channelName = '',
  allChannelsList = sidebarChannels,
) => {
  console.log('allChannelsList', allChannelsList)
  console.log('allChannelsList', channelName)
  const channelDataWithRespectiveChannelName = allChannelsList.filter(
    (channelData) => {
      return channelName === channelData?.slug
    },
  )

  return channelDataWithRespectiveChannelName[0]?.id || null
}

export const arrayToKeyIdNValueData = (arrayOfChannels: any) => {
  let obj = {}
  arrayOfChannels?.forEach((channelData: any) => {
    obj = Object.assign(obj, { [channelData?.id]: channelData })
  })
  return obj
}

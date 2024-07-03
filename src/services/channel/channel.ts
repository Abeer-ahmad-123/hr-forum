import { ChannelInterface } from '@/utils/interfaces/channels'
import type { APIResponse } from '@/utils/types/customFetch'
import { GET_CHANNELS } from './routes'

export async function getChannels() {
  try {
    const response: Response = await fetch(GET_CHANNELS)
    if (response.ok) {
      const responseJson: APIResponse<{ channels: ChannelInterface[] }> =
        await response.json()
      if (responseJson.success) {
        return responseJson.data
      } else throw new Error(responseJson.errors[0], { cause: responseJson })
    } else throw new Error('fetch failed')
  } catch (err) {
    throw err
  }
}

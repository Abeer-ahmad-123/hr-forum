import { GET_CHANNELS } from './routes'

export async function getChannels() {
  try {
    const responseFromRefresh = await fetch(GET_CHANNELS)
    const responseJson = await responseFromRefresh.json()
    return responseJson
  } catch (err) {
    throw err
  }
}

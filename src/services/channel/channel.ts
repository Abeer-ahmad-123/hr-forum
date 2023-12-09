import { GET_CHANNELS } from './routes'

export async function getChannels() {
  try {
    const response = await fetch(GET_CHANNELS)
    const responseJson = await response.json()
    return responseJson?.data
  } catch (err) {
    throw err
  }
}

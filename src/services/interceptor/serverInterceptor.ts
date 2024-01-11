'use server'

import { fetchRefreshToken } from './getRefreshTokenServerAction'

export async function customFetchServer(url: any, options?: any) {
  let response: any
  try {
    response = await fetch(url, options)
    if (response?.status === 401) {
      return fetchRefreshToken(options, customFetchServer, url)
    }
  } catch (error: any) {
    if (response && response.status === 401) {
      return fetchRefreshToken(options, customFetchServer, url)
    } else {
      throw error
    }
  }
  return response
}

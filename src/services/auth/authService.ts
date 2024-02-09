'use server'
import {
  removeUserCookies,
  setUserCookies,
  setUserTokens,
} from '@/utils/cookies'
import { cookies } from 'next/headers'
import {
  AUTH_GET_USER_DETAILS,
  AUTH_IS_TOKEN_EXPIRED,
  AUTH_REFRESH_TOKEN,
  AUTH_REGISTER,
  AUTH_UPDATE_PASSWORD,
  AUTH_UPDATE_USER_DETAILS,
  AUTH_WITH_EMAIL,
  GOOGLE_AUTH_START,
  GOOGLE_EXCHANGE_CODE,
} from './routes'
import { setTokenCookies } from '@/utils/interfaces/cookies'

export async function signIn(body: any) {
  try {
    let responseFromAuth = await fetch(AUTH_WITH_EMAIL, {
      body,
      cache: 'no-store',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    })
    const responseJson = await responseFromAuth.json()
    if (responseJson.success) setUserCookies(responseJson)
    return { ...responseJson, status: responseFromAuth?.status }
  } catch (err) {
    throw err
  }
}

export async function signUp(body: any) {
  try {
    let responseFromSignup = await fetch(AUTH_REGISTER, {
      body: JSON.stringify(body),
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseJson = await responseFromSignup.json()
    if (responseJson.success) {
      setUserCookies(responseJson)
    }

    return responseJson
  } catch (err) {
    throw err
  }
}

export async function updatePassword(body: any) {
  try {
    await fetch(AUTH_UPDATE_PASSWORD, {
      body,
      method: 'PUT',
    })
    return
  } catch (err) {
    throw err
  }
}

export async function logout() {
  try {
    removeUserCookies()
  } catch (err) {
    throw err
  }
}
export const checkUser = () => {
  return cookies().get('access-token')?.value
}

export async function setUserToken(data: setTokenCookies) {
  try {
    setUserTokens(data)
  } catch (err) {
    throw err
  }
}

export async function getRefreshToken() {
  const accessToken = cookies().get('access-token')
  const refreshToken = cookies().get('refresh-token')

  try {
    const responseFromRefresh = await fetch(AUTH_REFRESH_TOKEN, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        accessToken: accessToken?.value?.toString()!,
        refreshToken: refreshToken?.value?.toString()!,
      },
    })
    const responseFromJson = await responseFromRefresh.json()

    if (responseFromJson.success) {
      cookies().set('access-token', responseFromJson.data.token)
      cookies().set('refresh-token', responseFromJson.data['refresh-token'])
    } else {
      removeUserCookies()
    }

    return responseFromJson
  } catch (err) {
    throw err
  }
}

export async function getUserDetail() {
  try {
    const responseFromRefresh = await fetch(AUTH_GET_USER_DETAILS, {
      cache: 'no-cache',
    })
    const responseJson = await responseFromRefresh.json()
    setUserCookies(responseJson)
    return responseJson
  } catch (err) {
    throw err
  }
}
export async function updateUserDetail(body: any) {
  try {
    const responseFromRefresh = await fetch(AUTH_UPDATE_USER_DETAILS, {
      body,
      method: 'PUT',
      cache: 'no-cache',
    })
    const responseJson = await responseFromRefresh.json()

    return responseJson
  } catch (err) {
    throw err
  }
}

export async function googleAuthStart(url: string) {
  try {
    const responseFromRefresh = await fetch(GOOGLE_AUTH_START, {
      method: 'POST',
      body: JSON.stringify({
        frontendRedirectUrl: process.env.NEXT_PUBLIC_SITE_URL + url,
      }),
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json',
      },
    })
    const responseJson = await responseFromRefresh.json()
    // setUserCookies(responseJson)

    return responseJson
  } catch (err) {
    throw err
  }
}

export async function googleRegister(body: any) {
  try {
    const responseFromRefresh = await fetch(GOOGLE_AUTH_START, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json',
      },
      body,
    })
    const responseJson = await responseFromRefresh.json()
    // setUserCookies(responseJson)

    return responseJson
  } catch (err) {
    throw err
  }
}

export async function googleCodeExchange(token: string) {
  try {
    const responseFromRefresh = await fetch(GOOGLE_EXCHANGE_CODE, {
      method: 'POST',
      body: JSON.stringify({
        code: token,
      }),
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json',
      },
    })
    const responseJson = await responseFromRefresh.json()
    setUserCookies(responseJson)
    return responseJson?.data
  } catch (err) {
    throw err
  }
}

export async function isTokenExpired() {
  const accessToken = cookies().get('access-token')

  try {
    const response = await fetch(AUTH_IS_TOKEN_EXPIRED, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Authorization: 'Bearer' + accessToken?.value?.toString()!,
      },
    })
    return await response.json()
  } catch (error) {
    throw error
  }
}

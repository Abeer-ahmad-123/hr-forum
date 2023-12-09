import {
  AUTH_WITH_EMAIL,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  AUTH_UPDATE_PASSWORD,
  AUTH_REFRESH_TOKEN,
  AUTH_GET_USER_DETAILS,
  AUTH_UPDATE_USER_DETAILS,
  GOOGLE_AUTH_START,
} from './routes'

export async function signIn(body: any) {
  try {
    let responseFromAuth = await fetch(AUTH_WITH_EMAIL, {
      body,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
    const responseJson = await responseFromAuth.json()

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
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseJson = await responseFromSignup.json()
    return responseJson
  } catch (err) {
    throw err
  }
}

export async function logout() {
  try {
    await fetch(AUTH_LOGOUT)
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    return
  } catch (err) {
    console.log('err logout', err)
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

export async function getRefreshToken() {
  try {
    const responseFromRefresh = await fetch(AUTH_REFRESH_TOKEN, {
      method: 'POST',
    })
    const responseJson = await responseFromRefresh.json()
    localStorage.setItem('token', responseJson?.data?.token)
    return responseJson?.data?.token
  } catch (err) {
    throw err
  }
}

export async function getUserDetail() {
  try {
    const responseFromRefresh = await fetch(AUTH_GET_USER_DETAILS)
    const responseJson = await responseFromRefresh.json()
    localStorage.setItem('token', responseJson?.data?.token)
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
    })
    const responseJson = await responseFromRefresh.json()
    return responseJson
  } catch (err) {
    throw err
  }
}

export async function googleAuthStart() {
  try {
    const responseFromRefresh = await fetch(GOOGLE_AUTH_START)
    const responseJson = await responseFromRefresh.json()
    return responseJson
  } catch (err) {
    throw err
  }
}

export async function googleRegister(body: any) {
  try {
    const responseFromRefresh = await fetch(GOOGLE_AUTH_START, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body,
    })
    const responseJson = await responseFromRefresh.json()
    return responseJson
  } catch (err) {
    throw err
  }
}

export async function googleCallback(body: any) {
  try {
    const responseFromRefresh = await fetch(GOOGLE_AUTH_START)
    const responseJson = await responseFromRefresh.json()
    return responseJson
  } catch (err) {
    throw err
  }
}

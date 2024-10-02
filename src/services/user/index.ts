import { CustomFetchFunction } from '@/utils/types/customFetch'
import { API_BASE_URL } from '..'

const GET_SPECIFIC_USER_DETAILS = API_BASE_URL + '/users/userId'
const UPDATE_USER_DETAILS = API_BASE_URL + '/auth/updateUserDetails'
const UPDATE_USER_PASSWORD = API_BASE_URL + '/auth/updatePassword'
const UPDATE_USER_IMAGE = API_BASE_URL + '/images/uploadUserImage'
const UPDATE_USER_BG_IMAGE = API_BASE_URL + '/images/uploadUserBackgroundImage'

export async function getSpecificUserDetails(userId: string | undefined) {
  try {
    const formatedRequestUrl = GET_SPECIFIC_USER_DETAILS.replace(
      'userId',
      userId?.toString(),
    )
    let res = await fetch(formatedRequestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await res.json()

    return response
  } catch (err) {
    throw err
  }
}

export async function updateUserDetails(
  customFetch: any,
  token: string,
  refreshToken: string,
  userData: any,
) {
  try {
    let res = await customFetch(UPDATE_USER_DETAILS, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
        refreshToken: refreshToken,
      },
    })

    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function updateUserImage(
  customFetch: any,
  token: string,
  refreshToken: string,
  userImage: any,
) {
  const imageFormData = new FormData()
  imageFormData.append('file', userImage)
  try {
    let res = await customFetch(UPDATE_USER_IMAGE, {
      method: 'POST',
      body: imageFormData,
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${token}`,
        refreshToken: refreshToken,
      },
    })

    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function updateUserBgImage(
  customFetch: any,
  token: string,
  refreshToken: string,
  userImage: any,
) {
  const imageFormData = new FormData()
  imageFormData.append('file', userImage)
  try {
    let res = await customFetch(UPDATE_USER_BG_IMAGE, {
      method: 'POST',
      body: imageFormData,
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${token}`,
        refreshToken: refreshToken,
      },
    })

    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function updateUserPassword(
  customFetch: CustomFetchFunction,
  token: string,
  refreshToken: string,
  userData: any,
) {
  try {
    let res = await customFetch(UPDATE_USER_PASSWORD, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
        refreshToken: refreshToken,
      },
    })

    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

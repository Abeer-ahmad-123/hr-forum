import { API_BASE_URL } from '..'

const GET_USER_DETAILS = API_BASE_URL + '/auth/getUserDetails'
const GET_SPECIFIC_USER_DETAILS = API_BASE_URL + '/users/userId'
const UPDATE_USER_DETAILS = API_BASE_URL + '/auth/updateUserDetails'
const UPDATE_USER_IMAGE = API_BASE_URL + '/images/uploadUserImage'
const UPDATE_USER_BG_IMAGE = API_BASE_URL + '/images/uploadUserBackgroundImage'

export async function getUserDetails(token: any) {
  try {
    let res = await fetch(GET_USER_DETAILS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

export async function getSpecificUserDetails(userId: string) {
  try {
    const formatedRequestUrl = GET_SPECIFIC_USER_DETAILS.replace(
      'userId',
      userId,
    )
    let res = await fetch(formatedRequestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await res.json()
    console.log(response)
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

export async function updateUserDetails(token: any, userData: any) {
  try {
    let res = await fetch(UPDATE_USER_DETAILS, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function updateUserImage(token: any, userImage: any) {
  const imageFormData = new FormData()
  imageFormData.append('file', userImage)
  try {
    let res = await fetch(UPDATE_USER_IMAGE, {
      method: 'POST',
      body: imageFormData,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function updateUserBgImage(token: any, userImage: any) {
  const imageFormData = new FormData()
  imageFormData.append('file', userImage)
  try {
    let res = await fetch(UPDATE_USER_BG_IMAGE, {
      method: 'POST',
      body: imageFormData,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

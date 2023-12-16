import { showErrorAlert } from '@/utils/helper'
import { API_BASE_URL } from '..'

const GET_USER_DETAILS = API_BASE_URL + '/auth/getUserDetails'
const GET_COMMENT = API_BASE_URL + '/comments/commentId'

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

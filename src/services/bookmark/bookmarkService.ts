import { CustomFetchFunction } from '@/utils/types/customFetch'
import {
  BOOKMARK_POST,
  DELETE_BOOKMARK_POST,
  GET_BOOKMARK_POSTS,
} from './routes'

export async function bookmarkPost(
  postId: string,
  customFetch: CustomFetchFunction,
  token: string,
  refreshToken: string,
) {
  try {
    let bookmarkPostUrl = BOOKMARK_POST.replace('postId', postId)
    let responseFromAuth = await customFetch(bookmarkPostUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + token,
        refreshToken: refreshToken,
      },
    })

    if (responseFromAuth.ok) {
      const responseJson = await responseFromAuth.json()

      return { ...responseJson, status: responseFromAuth?.status }
    } else {
      throw 'Error'
    }
  } catch (err) {
    throw err
  }
}
export async function deleteBookmarkPost(
  postId: string,
  customFetch: CustomFetchFunction,
  token: string,
  refreshToken: string,
) {
  try {
    let deleteBookmarkPostUrl = DELETE_BOOKMARK_POST.replace('postId', postId)

    let responseFromAuth = await customFetch(deleteBookmarkPostUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + token,
        refreshToken: refreshToken,
      },
    })

    if (responseFromAuth.ok) {
      return { status: responseFromAuth?.status }
    } else {
      throw 'Error'
    }
  } catch (err) {
    throw err
  }
}

export async function getBookmarkPosts(userId: string) {
  try {
    let getBookmarkPostUrl = GET_BOOKMARK_POSTS.replace('userId', userId)

    let responseFromAuth = await fetch(getBookmarkPostUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
    const responseJson = await responseFromAuth.json()
    if (responseFromAuth.ok) {
      return { ...responseJson, status: responseFromAuth?.status }
    } else {
      throw responseJson.error
    }
  } catch (err) {
    throw err
  }
}

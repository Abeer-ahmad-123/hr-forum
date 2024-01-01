'use server'
// import { customFetch } from '../interceptor'
import {
  BOOKMARK_POST,
  DELETE_BOOKMARK_POST,
  GET_BOOKMARK_POSTS,
} from './routes'

export async function bookmarkPost(postId: string, token: string) {
  try {
    let bookmarkPostUrl = BOOKMARK_POST.replace('postId', postId)
    let responseFromAuth = await fetch(bookmarkPostUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    })
    const responseJson = await responseFromAuth.json()

    return { ...responseJson, status: responseFromAuth?.status }
  } catch (err) {
    throw err
  }
}
export async function deleteBookmarkPost(postId: string, token: string) {
  try {
    let deleteBookmarkPostUrl = DELETE_BOOKMARK_POST.replace('postId', postId)
    let responseFromAuth = await fetch(deleteBookmarkPostUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    })
    return { status: responseFromAuth?.status }
  } catch (err) {
    throw err
  }
}

export async function getBookmarkPosts(userId: string, token: string) {
  try {
    let getBookmarkPostUrl = GET_BOOKMARK_POSTS.replace('userId', userId)

    let responseFromAuth = await fetch(getBookmarkPostUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    })
    const responseJson = await responseFromAuth.json()

    return { ...responseJson, status: responseFromAuth?.status }
  } catch (err) {
    throw err
  }
}

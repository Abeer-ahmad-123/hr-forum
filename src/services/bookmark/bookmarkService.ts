import {
  BOOKMARK_POST,
  DELETE_BOOKMARK_POST,
  GET_BOOKMARK_POST,
} from './routes'

export async function bookmarkPost(token: string) {
  try {
    let responseFromAuth = await fetch(BOOKMARK_POST, {
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
export async function deleteBookmarkPost({ token, postId, userId }: any) {
  try {
    let deleteBookmarkPostUrl = DELETE_BOOKMARK_POST.replace('postId', postId)
    deleteBookmarkPostUrl = deleteBookmarkPostUrl.replace('userId', userId)
    let responseFromAuth = await fetch(deleteBookmarkPostUrl, {
      method: 'DELETE',
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

export async function getBookmarkPost(token: string) {
  try {
    let responseFromAuth = await fetch(GET_BOOKMARK_POST, {
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

import { CustomFetchFunction } from '@/utils/types/customFetch'
import {
  DELETE_REACTIONS,
  GET_USER_POST_REACTION,
  POST_REACTIONS,
  UPDATE_REACTION,
} from './routes'

async function postReactions(
  body: any,
  postId: string,
  customFetch: CustomFetchFunction,
  token?: string,
  refreshToken?: string,
) {
  try {
    const postRequestUrl = POST_REACTIONS.replace('postId', postId)

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['authorization'] = 'Bearer ' + token
    }

    if (refreshToken) {
      headers['refreshToken'] = refreshToken
    }

    const response = await customFetch(postRequestUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    if (response.ok) {
      return await response.json()
    } else {
      if (response.type === 'cors') {
        throw 'Something went wrong'
      }
      return await response.json()
    }
  } catch (error) {
    throw error
  }
}

async function deleteReactions(
  postId: string,
  customFetch: any,
  token?: string,
  refreshToken?: string,
) {
  try {
    const deleteRequestUrl = DELETE_REACTIONS.replace('postId', postId)
    const response = await customFetch(deleteRequestUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
        refreshToken: refreshToken,
      },
    })
    if (response.ok) {
      return await response.json()
    } else {
      if (response.type === 'cors') {
        throw 'Something went wrong'
      }
      return await response.json()
    }
  } catch (error) {
    throw error
  }
}

async function getUserPostReaction(postId: string) {
  try {
    const UserPostReactionRequestUrl = GET_USER_POST_REACTION.replace(
      'postId',
      postId,
    )
    const response = await fetch(UserPostReactionRequestUrl)
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

async function updatePostReaction(
  body: any,
  postId: string,
  customFetch: any,
  token?: string,
  refreshToken?: string,
) {
  try {
    const updatePostReactionUrl = UPDATE_REACTION.replace('postId', postId)
    const response = await customFetch(updatePostReactionUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
        refreshToken: refreshToken,
      },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      return await response.json()
    } else {
      if (response.type === 'cors') {
        throw 'Something went wrong'
      }
      return await response.json()
    }
  } catch (error) {
    throw error
  }
}

export {
  postReactions,
  deleteReactions,
  getUserPostReaction,
  updatePostReaction,
}

import {
  DELETE_REACTIONS,
  GET_USER_POST_REACTION,
  POST_REACTIONS,
  UPDATE_REACTION,
} from './routes'

async function postReactions(body: any, postId: string, token?: string) {
  try {
    const postRequestUrl = POST_REACTIONS.replace('postId', postId)
    const response = await fetch(postRequestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: await JSON.stringify(body),
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw 'Error'
    }
  } catch (error) {
    throw error
  }
}

async function deleteReactions(postId: string, token: string) {
  try {
    const deleteRequestUrl = DELETE_REACTIONS.replace('postId', postId)
    const response = await fetch(deleteRequestUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw 'Error'
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

async function updatePostReaction(body: any, postId: string, token: string) {
  try {
    const updatePostReactionUrl = UPDATE_REACTION.replace('postId', postId)
    const response = await fetch(updatePostReactionUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw 'Error'
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

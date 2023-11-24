const baseUrl = '/api/v1/posts/'

async function postReactions(body: any, postId: string): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}${postId}/reactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

async function deleteReactions(postId: string): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}${postId}/reactions`, {
      method: 'DELETE',
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

async function getUserPostReaction(postId: string): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}${postId}/reactions`)
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

async function updatePostReaction(body: any, postId: string): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}${postId}/reactions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return data
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

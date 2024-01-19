import { API_BASE_URL } from '..'

const GET_POST_COMMENT = API_BASE_URL + '/posts/postId/comments'
const GET_COMMENT = API_BASE_URL + '/comments/commentId'

export async function postComment({
  postId,
  content,
  customFetch,
  token,
  refreshToken,
}: any) {
  try {
    const requestBody = JSON.stringify(content)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      refreshToken: refreshToken,
    }

    let res = await customFetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers,
      body: requestBody,
    })

    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function postCommentReply({
  commentId,
  content,
  customFetch,
  token,
  refreshToken,
}: any) {
  try {
    const requestBody = JSON.stringify(content)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      refreshToken: refreshToken,
    }

    let res = await customFetch(
      `${API_BASE_URL}/comments/${commentId}/replies`,
      {
        method: 'POST',
        headers,
        body: requestBody,
      },
    )

    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function getPostsComments(
  id: string,
  userId: string,
  {
    loadUser = true,
    loadReactions = true,
    loadNestedComments = true,
    loadNestedUser = true,
    loadNestedReactions = true,
    nestedLimit = 2,
    page = 1,
  },
) {
  try {
    const postId = GET_POST_COMMENT.replace('postId', id)

    let url = `${postId}?loadUser=${loadUser}&loadReactions=${loadReactions}&loadNestedComments=${loadNestedComments}&loadNestedUser=${loadNestedUser}&loadNestedReactions=${loadNestedReactions}&nestedLimit=${nestedLimit}&page=${page}`
    if (userId) {
      url += `&userID=${userId}`
    }

    let res = await fetch(url, {
      cache: 'no-cache',
    })
    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

export async function getComment(
  commentId: string,
  {
    loadUser = true,
    loadReactions = true,
    loadNestedComments = true,
    loadNestedUser = true,
    loadNestedReactions = true,
    allReplies = false,
    nestedLimit = 2,
    page = 1,
  },
) {
  try {
    const postId = GET_COMMENT.replace('commentId', commentId)
    let res = await fetch(
      `
    ${postId}?loadUser=${loadUser}&loadReactions=${loadReactions}&loadNestedComments=${loadNestedComments}&loadNestedUser=${loadNestedUser}&loadNestedReactions=${loadNestedReactions}&nestedLimit=${nestedLimit}&allReplies=${allReplies}&page=${page}
    `,
      {
        cache: 'no-cache',
      },
    )
    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

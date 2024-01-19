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
      refreshToken: `Bearer ${refreshToken}`,
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
      refreshToken: `Bearer ${refreshToken}`,
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
    pageSize = 10,
  },
) {
  try {
    const postId = GET_POST_COMMENT.replace('postId', id)

    let url = `${postId}?loadUser=${loadUser}&loadReactions=${loadReactions}&loadNestedComments=${loadNestedComments}&loadNestedUser=${loadNestedUser}&loadNestedReactions=${loadNestedReactions}`
    if (userId) {
      url += `&userID=${userId}`
    }
    if (nestedLimit) {
      url += `&nestedLimit=${nestedLimit}`
    }
    if (page) {
      url += `&page=${page}`
    }
    if (pageSize) {
      url += `&pageSize=${pageSize}`
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
  userId: string,
  {
    loadUser = true,
    loadReactions = true,
    loadNestedComments = true,
    loadNestedUser = true,
    loadNestedReactions = true,
    allReplies = false,
    nestedPage = 2,
    nestedPageSize = 10,
  },
) {
  try {
    const postId = GET_COMMENT.replace('commentId', commentId)

    let url = `${postId}?loadUser=${loadUser}&loadReactions=${loadReactions}&loadNestedComments=${loadNestedComments}&loadNestedUser=${loadNestedUser}&loadNestedReactions=${loadNestedReactions}`

    if (allReplies) {
      url += `&allReplies=${allReplies}`
    }

    if (userId) {
      url += `&userID=${userId}`
    }
    if (nestedPage) {
      url += `&nestedPage=${nestedPage}`
    }
    if (nestedPageSize) {
      url += `&nestedPageSize=${nestedPageSize}`
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

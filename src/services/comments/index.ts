import { CustomFetchFunction } from '@/utils/types/customFetch'
import { API_BASE_URL } from '..'

const GET_POST_COMMENT = API_BASE_URL + '/posts/postId/comments'
const GET_COMMENT = API_BASE_URL + '/comments/commentId'
const GET_USER_COMMENTS = API_BASE_URL + '/users/userId/comments'
const DELETE_COMMENT = API_BASE_URL + '/comments/commentId'
const USER_REPORTED_COMMENTS = API_BASE_URL + '/users/userId/reports/comments'

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
      authorization: `Bearer ${token}`,
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
      authorization: `Bearer ${token}`,
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

export async function getUserComments(
  id: string | number,

  {
    loadUser = true,
    loadReactions = false,
    loadNestedComments = false,
    loadNestedUser = false,
    loadNestedReactions = false,
    nestedLimit = 2,
    page = 1,
    pageSize = 10,
  },
) {
  try {
    const userId = GET_USER_COMMENTS.replace('userId', id.toString())

    let url = `${userId}?loadUser=${loadUser}&loadReactions=${loadReactions}&loadNestedComments=${loadNestedComments}&loadNestedUser=${loadNestedUser}&loadNestedReactions=${loadNestedReactions}`
    if (userId) {
      url += `&userID=${id}`
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
    return response
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

export async function deleteComment(
  commentId: string,
  customFetch: CustomFetchFunction,
  token: string,
  refreshToken: string,
) {
  try {
    let reportPostUrl = DELETE_COMMENT.replace('commentId', commentId)

    let res = await customFetch(reportPostUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + token,
        refreshToken: refreshToken,
      },
    })

    return res
  } catch (err) {
    throw err
  }
}

export async function getReportedComments(
  userId: string,
  { page = 1, pageSize = 10 },
) {
  try {
    const formatedRequestUrl = USER_REPORTED_COMMENTS.replace('userId', userId)

    let res = await fetch(
      `${`${formatedRequestUrl}?page=${page}&pageSize=${pageSize}`}`,
      {
        cache: 'no-store',
      },
    )
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

import { CustomFetchFunction } from '@/utils/types/customFetch'
import { API_BASE_URL } from '..'
import { DELETE_POST } from './route'

const GET_POSTS_BY_CHANNELID = API_BASE_URL + '/channels/channelId/posts'
const GET_All_POSTS = API_BASE_URL + '/posts'
const GET_POST_BY_ID = API_BASE_URL + '/posts/postId'
const USER_SPECIFIC_POSTS = API_BASE_URL + '/users/userId/posts'
const USER_REACTED_POSTS = API_BASE_URL + '/users/userId/reactions'
const USER_REPORTED_POSTS = API_BASE_URL + '/users/userId/reports/posts'

type GET_ALL_POSTS_PROPS = {
  loadUser?: boolean
  loadReactions?: boolean
  channelID?: number
  userID?: string
  pageNumber?: number
  pageSize?: number
}

export async function getAllPosts({
  loadUser = false,
  loadReactions = false,
  channelID,
  userID,
  pageNumber = 1,
  pageSize = 10,
}: GET_ALL_POSTS_PROPS = {}) {
  try {
    let url = `${GET_All_POSTS}?loadUser=${loadUser}&loadReactions=${loadReactions}`
    if (channelID) {
      url += `&channelID=${channelID}`
    }
    if (userID) {
      url += `&userID=${userID}`
    }

    url += `&page=${pageNumber}&pageSize=${pageSize}`
    let res: any = await fetch(url)
    if (!res.ok) {
      throw 'error'
    } else {
      return await res.json()
    }
  } catch (err) {
    throw err
  }
}

export async function getPostsByChannelId({
  id,
  userID,
  loadReactions = true,
  loadUser = true,
  pageNumber = 1,
  pageSize = 10,
}: any) {
  if (id) {
    try {
      const urlWithId = GET_POSTS_BY_CHANNELID.replace(
        'channelId',
        id?.toString(),
      )
      let res = await fetch(
        `${urlWithId}?loadUser=${loadUser}${
          userID ? `&userID=${userID}` : ''
        }&loadReactions=${loadReactions}&page=${pageNumber}&pageSize=${pageSize}`,
        {
          cache: 'no-store',
        },
      )
      const response = await res.json()

      return response
    } catch (err) {
      throw err
    }
  } else {
    return { posts: null }
  }
}

export async function getPostByPostId(
  id: string,
  { loadUser = true, loadReactions = true, userId = '' },
) {
  try {
    const postId = GET_POST_BY_ID.replace('postId', id)

    let res = await fetch(
      `${postId}?loadReactions=${loadReactions}&loadUser=${loadUser}${
        userId ? `&userID=${userId}` : ''
      }`,
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

export async function postCreatePostInChannel({
  channelID,
  body,
  customFetch,
  token,
  refreshToken,
}: any) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      refreshToken: refreshToken,
    }
    const requestBody = JSON.stringify(body)

    let res = await customFetch(
      `https://api.enxsis.com/api/v1/channels/${channelID}/posts`,
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

export async function feedImageCreateInChannel({
  postId,
  file,
  customFetch,
  token,
  refreshToken,
}: any) {
  try {
    const headers = {
      Accept: 'application/json',
      authorization: `Bearer ${token}`,
      refreshToken: refreshToken,
    }

    let res = await customFetch(
      `https://api.enxsis.com/api/v1/images/posts/${postId}/upload`,
      {
        method: 'POST',
        headers,
        body: file,
      },
    )
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function getUserSpecificPosts(
  userId: string,
  pageNumber = 1,
  { loadReactions = true, loadUser = true },
) {
  try {
    const formatedRequestUrl = USER_SPECIFIC_POSTS.replace('userId', userId)

    let res = await fetch(
      `${`${formatedRequestUrl}?page=${pageNumber}&loadReactions=${loadReactions}&loadUser=${loadUser}`}`,
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

export async function getReportedPosts(
  userId: string,
  { page = 1, pageSize = 10 },
) {
  try {
    const formatedRequestUrl = USER_REPORTED_POSTS.replace('userId', userId)

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

export async function getUserReactedPosts(
  userId: string,
  { page = 1, pageSize = 10 },
) {
  try {
    const formatedRequestUrl = USER_REACTED_POSTS.replace('userId', userId)

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

export async function deletePost(
  postId: string,
  customFetch: CustomFetchFunction,
  token: string,
  refreshToken: string,
) {
  try {
    let reportPostUrl = DELETE_POST.replace('postid', postId)

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

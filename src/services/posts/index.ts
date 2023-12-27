'use server'
import { API_BASE_URL } from '..'

const GET_POSTS_BY_CHANNELID = API_BASE_URL + '/channels/channelId/posts'
const GET_All_POSTS = API_BASE_URL + '/posts'
const ADD_POST = API_BASE_URL + '/channels/channelId/posts'
const EDIT_POST = API_BASE_URL + '/posts/postId'
const GET_POST_BY_ID = API_BASE_URL + '/posts/postId'
const SEARCH_POSTS = API_BASE_URL + '/posts/search'
const USER_SPECIFIC_POSTS = API_BASE_URL + '/users/userId/posts'

type GET_ALL_POSTS_PROPS = {
  loadUser?: boolean
  loadReactions?: boolean
  channelID?: number
  userID?: number
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
    const response = await res.json()
    return response
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
  { loadUser = true, loadReactions = true, userId = null },
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
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

export async function postCreatePostInChannel({ channelID, body, token }: any) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    const requestBody = JSON.stringify(body)

    let res = await fetch(
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

export async function getUserSpecificPosts(userId: string, pageNumber = 1) {
  try {
    const formatedRequestUrl = USER_SPECIFIC_POSTS.replace('userId', userId)

    let res = await fetch(formatedRequestUrl + `?page=${pageNumber}`, {
      cache: 'no-store',
    })
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

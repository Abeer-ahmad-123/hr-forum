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
  pageNumber?: number
  pageSize?: number
}

export async function getAllPosts({
  loadUser = false,
  loadReactions = false,
  pageNumber = 1,
  pageSize = 10,
}: GET_ALL_POSTS_PROPS = {}) {
  try {
    let res: any = await fetch(
      `${GET_All_POSTS}?loadUser=${loadUser}&loadReactions=${loadReactions}&page=${pageNumber}&pageSize=${pageSize}`,
      {
        cache: 'no-cache',
      },
    )
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function getPostsByChannelId({
  id,
  loadReactions = true,
  loadUser = true,
  pageNumber = 1,
  pageSize = 10,
}: any) {
  if (id) {
    try {
      let res = await fetch(
        `${GET_POSTS_BY_CHANNELID.replace(
          'channelId',
          id?.toString(),
        )}?loadUser=${loadUser}&loadReactions=${loadReactions}&page=${pageNumber}&pageSize=${pageSize}`,
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
  { loadUser = false, loadReactions = true },
) {
  try {
    const postId = GET_POST_BY_ID.replace('postId', id)
    let res = await fetch(
      `${postId}?loadReactions=${loadReactions}&loadUser=${loadUser}`,
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

export async function getUserSpecificPosts(userId: string) {
  try {
    const formatedRequestUrl = USER_SPECIFIC_POSTS.replace('userId', userId)

    let res = await fetch(formatedRequestUrl)
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

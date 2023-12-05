const API_BASE_URL = process.env.API_BASE_URL

const GET_POSTS_BY_CHANNELID = API_BASE_URL + 'channels/channelId/posts'
const GET_All_POSTS = API_BASE_URL + 'posts'
const ADD_POST = API_BASE_URL + 'channels/channelId/posts'
const EDIT_POST = API_BASE_URL + 'posts/postId'
const GET_POST_BY_ID = API_BASE_URL + 'posts/postId'
const GET_POST_COMMENT = API_BASE_URL + 'posts/postId/comments'
const CREATE_POST_IN_CHANNEL = API_BASE_URL + 'channels/channelId/posts'

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
    )
    const response = await res.json()
    const { data } = response
    return data
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
      const { data } = response
      return data
    } catch (err) {
      throw err
    }
  } else {
    return { posts: null }
  }
}

export async function getPostByPostId(
  id: string,
  { loadUser = true, loadReactions = true },
) {
  try {
    const postId = GET_POST_BY_ID.replace('postId', id)
    let res = await fetch(`${postId}?loadReactions=${loadReactions}`)
    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

export async function getPostsComments(
  id: string,
  {
    loadUser = true,
    loadReactions = true,
    loadNestedComments = true,
    loadNestedUser = true,
    loadNestedReactions = true,
    nestedLimit = 2,
  },
) {
  try {
    const postId = GET_POST_COMMENT.replace('postId', id)

    let res = await fetch(`
    ${postId}?loadUser=${loadUser}&loadReactions=${loadReactions}&loadNestedComments=${loadNestedComments}&loadNestedUser=${loadNestedUser}&loadNestedReactions=${loadNestedReactions}&nestedLimit=${nestedLimit}
    `)

    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

export async function postCreatePostInChannel({ channelID, body }: any) {
  try {
    const token =  localStorage?.getItem('token')
    console.log("Token ",token)
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    
    const requestBody = JSON.stringify(body);
    console.log("Here is request body" ,requestBody)

    let res = await fetch(
      `https://api.enxsis.com/api/v1/channels/${channelID}/posts`,
      {
        method: 'POST',
        headers,
        body: requestBody,
      },
    )
    const response = await res.json()
    console.log(response)
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

export async function postComment({ postId, body }: any) {
  try {
    let res = await fetch(
      GET_POST_COMMENT.replace('postId', postId),

      {
        body,
        method: 'POST',
      },
    )
    const response = await res.json()
    console.log(response)
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

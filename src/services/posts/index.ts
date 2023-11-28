const API_BASE_URL = process.env.API_BASE_URL

const GET_POSTS_BY_CHANNELID = API_BASE_URL + 'channels/channelId/posts'
const GET_All_POSTS = API_BASE_URL + 'posts'
const ADD_POST = API_BASE_URL + 'channels/channelId/posts'
const EDIT_POST = API_BASE_URL + 'posts/postId'
const GET_POST_BY_ID = API_BASE_URL + 'posts/postId'
const GET_POST_COMMENT = API_BASE_URL + 'posts/postId/comments'
const CREATE_POST_IN_CHANNEL = API_BASE_URL + 'channels/postId/posts'


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

export async function getPostsByChannelId(id: string) {
  try {
    let res = await fetch(GET_POSTS_BY_CHANNELID.replace('channelId', id))
    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}


export async function getPostsByPostId(id: string) {
  try {
    let res = await fetch(GET_POST_BY_ID.replace('postId', id))
    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}


export async function getPostsComments(id: string) {
  try {
    let res = await fetch(GET_POST_COMMENT.replace('postId', id))
    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

export async function postCreatePostInChannel({ id , body }: any){
  try {
    let res = await fetch(CREATE_POST_IN_CHANNEL.replace('postId', id),
    
    {
      body,
      method: 'POST'
    })
    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

export async function postComment({ postId , body }: any){
  try {
    let res = await fetch(GET_POST_COMMENT.replace('postId', postId),
    
    {
      body,
      method: 'POST'
    })
    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

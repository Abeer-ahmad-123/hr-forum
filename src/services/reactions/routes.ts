import { API_BASE_URL } from '..'

const POST_REACTIONS = API_BASE_URL + '/posts/postId/reactions'
const DELETE_REACTIONS = API_BASE_URL + '/posts/postId/reactions'
const GET_USER_POST_REACTION = API_BASE_URL + '/posts/postId/reactions'
const UPDATE_REACTION = API_BASE_URL + '/posts/postId/reactions'

export {
  POST_REACTIONS,
  DELETE_REACTIONS,
  GET_USER_POST_REACTION,
  UPDATE_REACTION,
}

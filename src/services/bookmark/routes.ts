import { API_BASE_URL } from '..'

const BOOKMARK_POST = API_BASE_URL + '/posts/postId/bookmark'
const DELETE_BOOKMARK_POST = API_BASE_URL + '/posts/postId/bookmark'
const GET_BOOKMARK_POSTS = API_BASE_URL + '/users/userId/bookmarks'

export { BOOKMARK_POST, DELETE_BOOKMARK_POST, GET_BOOKMARK_POSTS }

import { API_BASE_URL } from '..'

const BOOKMARK_POST = API_BASE_URL + '/bookmarks/create'
const DELETE_BOOKMARK_POST = API_BASE_URL + '/bookmarks/delete/userId/postId'
const GET_BOOKMARK_POST = API_BASE_URL + '/bookmarks/user/userId'

export { BOOKMARK_POST, DELETE_BOOKMARK_POST, GET_BOOKMARK_POST }

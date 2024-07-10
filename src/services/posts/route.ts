import { API_BASE_URL } from '..'

export const DELETE_POST = API_BASE_URL + '/posts/postid'

export const GET_POSTS_BY_CHANNELID = API_BASE_URL + '/channels/channelId/posts'
export const GET_All_POSTS = API_BASE_URL + '/posts'
export const GET_POST_BY_ID = API_BASE_URL + '/posts/postId'
export const USER_SPECIFIC_POSTS = API_BASE_URL + '/users/userId/posts'
export const USER_REACTED_POSTS = API_BASE_URL + '/users/userId/reactions'
export const USER_REPORTED_POSTS = API_BASE_URL + '/users/userId/reports/posts'

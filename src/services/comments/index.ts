import { showErrorAlert } from '@/utils/helper'
import { API_BASE_URL } from '..'

const GET_POST_COMMENT = API_BASE_URL + '/posts/postId/comments'

export async function postComment({ postId, content, token }: any) {
  try {
    const requestBody = JSON.stringify(content)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    let res = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
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

export async function postCommentReply({ commentId, content, token }: any) {
  try {
    const requestBody = JSON.stringify(content)
    // const reduxToken = useSelector((state: any) => state.loggedInUser.token)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    let res = await fetch(`${API_BASE_URL}/comments/${commentId}/replies`, {
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

export async function getPostsComments(
  id: string,
  {
    loadUser = true,
    loadReactions = true,
    loadNestedComments = true,
    loadNestedUser = true,
    loadNestedReactions = true,
    nestedLimit = 2,
    page = 1,
  },
) {
  try {
    const postId = GET_POST_COMMENT.replace('postId', id)

    let res = await fetch(
      `
    ${postId}?loadUser=${loadUser}&loadReactions=${loadReactions}&loadNestedComments=${loadNestedComments}&loadNestedUser=${loadNestedUser}&loadNestedReactions=${loadNestedReactions}&nestedLimit=${nestedLimit}&page=${page}
    `,
      {
        cache: 'no-cache',
      },
    )

    const response = await res.json()
    const { data } = response
    return data
  } catch (err) {
    throw err
  }
}

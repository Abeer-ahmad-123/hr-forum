import { CustomFetchFunction } from '@/utils/types/customFetch'
import { REPORT_COMMENT, REPORT_POST } from './route'

export async function reportPost(
  postId: string,
  details: string,
  customFetch: CustomFetchFunction,
  token: string,
  refreshToken: string,
) {
  try {
    let reportPostUrl = REPORT_POST.replace('postid', postId)
    const reqBody = {
      details: details,
      reportType: 'other',
    }
    let res = await customFetch(reportPostUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + token,
        refreshToken: 'Bearer ' + refreshToken,
      },
      body: JSON.stringify(reqBody),
    })
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function reportComment(
  commentId: string,
  details: string,
  customFetch: CustomFetchFunction,
  token: string,
  refreshToken: string,
) {
  const reqBody = {
    details: details,
    reportType: 'other',
  }
  try {
    console.log('line 46 commentid', commentId)
    let reportCommentUrl = REPORT_COMMENT.replace('commentid', commentId)
    let res = await customFetch(reportCommentUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + token,
        refreshToken: 'Bearer ' + refreshToken,
      },
      body: JSON.stringify(reqBody),
    })
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

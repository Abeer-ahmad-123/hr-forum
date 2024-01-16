type reply = {
  author_details: {
    username: string
    name: string
    profile_picture_url: string
  }
  content: string
  created_at: string
  id: string
  parent_id: number
  post_id: number
  reaction_summary: Object
  total_replies: number
  updated_at: string
  user_id: number
}

export interface ReplyInterface {
  reply: reply
  commentLength: number
  commentId: string | null
  setReportedReplyId: (id: string) => void
}

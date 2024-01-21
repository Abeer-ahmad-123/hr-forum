export interface SearchParams {
  user: number
  search: string
  redirect: string
}

export interface RenderFeedsInterface {
  channelSlug?: string
  searchParams: SearchParams
  path: string
}
export interface BookmarkData {
  userID: number
  postID: number
  bookmarkedAt: string
  post: {
    id: number
    title: string
    content: string
    user_id: number
    created_at: string
    updated_at: string
    channel_id: number
    slug: string
    author_details: Record<string, any>
    reaction_summary: Record<string, any>
    total_comments: number
    user_reaction: string
    user_has_bookmarked?: boolean // optional property for TypeScript
  }
}

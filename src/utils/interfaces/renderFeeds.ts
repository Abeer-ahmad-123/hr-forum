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

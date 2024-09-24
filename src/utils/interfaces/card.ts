export interface ReactionSummary {
  like_count: number
  love_count: number
  clap_count: number
  celebrate_count: number
}

export interface EmojiActionInterface {
  value: string
  action: string
  previousAction: string
}

export interface ProfileImageInterface {
  imgSrc: string | undefined
  postUserId: number | undefined
}

export interface MenuCardInterface{
  path: string;
  user: string | null;
}

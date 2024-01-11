import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'

import { DOMAIN_URL } from '@/services'

interface SocialButtonsProps {
  className: string
  postId: string | null
  commentId?: string | null
  replyId?: string | null
}

function SocialButtons({
  className,
  postId,
  commentId = null,
  replyId = null,
}: SocialButtonsProps) {
  const url = `${DOMAIN_URL}/feeds/feed/${postId}${
    commentId === null ? '' : `?commentId=${commentId}`
  }${replyId === null ? '' : `&replyId=${replyId}`}`

  return (
    <div className={`${className}`}>
      <FacebookShareButton url={url}>
        <FacebookIcon size={30} round />
      </FacebookShareButton>
      <RedditShareButton url={url}>
        <RedditIcon size={30} round />
      </RedditShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={30} round />
      </LinkedinShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={30} round />
      </WhatsappShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon size={30} round />
      </TelegramShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon size={30} round />
      </TwitterShareButton>
    </div>
  )
}

export default SocialButtons

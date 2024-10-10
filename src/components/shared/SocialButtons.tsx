import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import TwitterIcon from '@/assets/icons/TwitterIcon'
import FacebookIcon from '@/assets/icons/FacebookIcon'
import RedditIcon from '@/assets/icons/RedditIcon'
import WhatsappIcon from '@/assets/icons/WhatsappIcon'
import CopyText from '@/assets/icons/TelegramIcon'
import LinkedinIcon from '@/assets/icons/LinkedInIcon'

import { DOMAIN_URL } from '@/services'
import { showSuccessAlert } from '@/utils/helper'

interface SocialButtonsProps {
  className: string
  postId: string | null
  commentId?: string | null
  replyId?: string | null
  handleButtonClick: () => void
}

const SocialButtons = ({
  className,
  postId,
  handleButtonClick,
}: SocialButtonsProps) => {
  const url = `${DOMAIN_URL}/feeds/feed/${postId}`

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(url)
    showSuccessAlert('Link copied to clipboard')
    handleButtonClick()
  }

  return (
    <div className={`${className}`}>
      <FacebookShareButton url={url}>
        <FacebookIcon />
      </FacebookShareButton>
      <RedditShareButton url={url}>
        <RedditIcon />
      </RedditShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon />
      </LinkedinShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon />
      </WhatsappShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon />
      </TwitterShareButton>

      <button name="share button" onClick={copyToClipBoard}>
        <CopyText />
      </button>
    </div>
  )
}

export default SocialButtons

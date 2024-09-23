// import {
//   FacebookIcon,
//   FacebookShareButton,
//   LinkedinIcon,
//   LinkedinShareButton,
//   RedditIcon,
//   RedditShareButton,
//   TelegramIcon,
//   TelegramShareButton,
//   TwitterIcon,
//   TwitterShareButton,
//   WhatsappIcon,
//   WhatsappShareButton,
// } from 'react-share'
import TwitterIcon from '@/assets/icons/TwitterIcon'
import FacebookIcon from '@/assets/icons/FacebookIcon'
import RedditIcon from '@/assets/icons/RedditIcon'
import WhatsappIcon from '@/assets/icons/WhatsappIcon'
import TelegramIcon from '@/assets/icons/TelegramIcon'
import LinkedinIcon from '@/assets/icons/LinkedInIcon'

import { DOMAIN_URL } from '@/services'
import { showSuccessAlert } from '@/utils/helper'
import { Link2 } from 'lucide-react'

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
      {/* <FacebookShareButton url={url}>
        <FacebookIcon size={30} round />
      </FacebookShareButton> */}
      {/* <RedditShareButton url={url}>
        <RedditIcon size={30} round />
      </RedditShareButton> */}
      {/* <LinkedinShareButton url={url}>
        <LinkedinIcon size={30} round />
      </LinkedinShareButton> */}
      {/* <WhatsappShareButton url={url}>
        <WhatsappIcon size={30} round />
      </WhatsappShareButton> */}
      {/* <TelegramShareButton url={url}>
        <TelegramIcon size={30} round />
      </TelegramShareButton> */}

      {/* <TwitterShareButton url={url}> */}
      <TwitterIcon />
      <FacebookIcon />
      <RedditIcon />
      <WhatsappIcon />
      <button name="share button" onClick={copyToClipBoard}>
        <TelegramIcon />
      </button>
      <LinkedinIcon />
      {/* </TwitterShareButton> */}
    </div>
  )
}

export default SocialButtons

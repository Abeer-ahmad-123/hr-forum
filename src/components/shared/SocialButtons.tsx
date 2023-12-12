import {

    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    WhatsappIcon,
    WhatsappShareButton,


} from "react-share";


interface SocialButtonsProps {
    className: string
}

function SocialButtons({ className }: SocialButtonsProps) {
    return (
        <div className={className}>
            <FacebookShareButton url='https://www.facebook.com/'>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <RedditShareButton url='https://www.reddit.com/'>
                <RedditIcon size={32} round />
            </RedditShareButton>

            <LinkedinShareButton url='https://www.kaizenteams.co/'>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <WhatsappShareButton url='https://web.whatsapp.com/'>
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton url='https://telegram.org/'>
                <TelegramIcon size={32} round />
            </TelegramShareButton>

            <PinterestShareButton media="" url="">
                <PinterestIcon size={32} round />
            </PinterestShareButton>
        </div>
    )
}

export default SocialButtons

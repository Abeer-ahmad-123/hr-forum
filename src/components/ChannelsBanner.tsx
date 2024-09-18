import React from 'react'
import HrGeneral from '@/assets/icons/hrGeneral';
import SmileIcon from '@/assets/icons/smileIcon';
import { noChannelBanner } from '@/assets/images';
import { toPascalCase } from '@/utils/common'

interface ChannelBannerProps {
  channelSlug: string;
  path: string;
  channels: any
  setAddPost: (arg0: boolean) => void
}

function ChannelsBanner({ channelSlug, path, channels, setAddPost,
}: ChannelBannerProps) {

  const getImageUrlBySlug = (slug: string) => {
    const matchingObject = channels.find(
      (obj: { slug: string }) => obj.slug === slug,
    )

    if (matchingObject) {
      return matchingObject.ImageURL
    }
  }

  const handleCreatePost = () => {
    setAddPost(true)
  }

  return (
    <div>
      {(!!channelSlug || path === '/saved') && (
        <div className='bg-bg-primary dark:bg-bg-primary-dark h-[266px] rounded-2xl px-2 max-w-[759px]'>
          <div className="max-w-768px mx-auto mt-11">
            <div className="relative overflow-hidden rounded-xl pt-2">
              <img
                className="max-w-768px z-10 h-[190px] w-full rounded-t-xl "
                src={
                  false
                    ? getImageUrlBySlug(channelSlug) || noChannelBanner.src
                    : noChannelBanner.src
                }
                alt="banner"
              />
            </div>
          </div>
          <div className='flex justify-between mx-5 my-3'>
            <div className='flex text-black h-11 w-11 bg-bg-tertiary rounded-full items-center justify-center mr-3 dark:bg-dark-grey'>
              {channelSlug == 'hr-general' ? <HrGeneral className='ml-0 h-[18px] w-[18px] dark:text-bg-tertiary' /> : <SmileIcon className='ml-0 h-[18px] w-[18px] md:h-5 md:w-5 dark:text-bg-tertiary' />}
            </div >
            <div className='flex flex-1 justify-between items-center'>
              <div className='text-black font-[800] text-xl dark:text-bg-tertiary'>{channelSlug
                ? toPascalCase(channelSlug?.toString()?.replaceAll('-', ' '))
                : 'Saved Posts'}</div>
              <div className='text-black w-[119px] bg-bg-green h-full rounded-full text-center content-center font-medium text-sm cursor-pointer' onClick={handleCreatePost}>Create Post</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChannelsBanner

'use client'
import HrGeneral from '@/assets/icons/hrGeneral'
import SmileIcon from '@/assets/icons/smileIcon'
import { noChannelBanner } from '@/assets/images'
import useChannels from '@/hooks/channels'
import { toPascalCase } from '@/utils/common'
import { getUserFromCookie } from '@/utils/cookies'
import { ChannelBannerProps } from '@/utils/interfaces/channels'
import { useEffect, useState } from 'react'
import { Dialog } from './ui/Dialog/simpleDialog'
import SignInDialog from './shared/NewPost/SignInDialog'

const ChannelsBanner: React.FC<ChannelBannerProps> = ({
  channelSlug,
  path,
  setAddPost,
  channelImg,
}) => {
  const channels = useChannels()
  const [token, setToken] = useState('')
  const [showSignModal, setShowSignModal] = useState(false)

  const getImageUrlBySlug = (slug: string) => {
    const matchingObject = channels.find(
      (obj: { slug: string }) => obj.slug === slug,
    )

    if (matchingObject) {
      return matchingObject.ImageURL
    }
  }

  const fetchUser = async () => {
    try {
      const response = await getUserFromCookie() // Fetch user from cookie
      return response
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
  const handleCreatePost = () => {
    if (!token) {
      setShowSignModal(true)
    } else {
      setAddPost(true)
    }
  }

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUser()
      if (userData) {
        setToken(userData?.token)
      }
    }

    if (!token) {
      getUserData()
    }
  }, [token])

  const channelNameFormat = (channelName: string) => {
    return toPascalCase(channelName?.replaceAll('-', ' '))
  }
  return (
    <>
      <div>
        {(channelSlug || (path === '/saved' && token)) && (
          <div className="h-[266px] max-w-full rounded-2xl bg-bg-primary px-2 dark:bg-bg-primary-dark lg:max-w-[759px]">
            <div className="mx-auto max-w-full lg:max-w-[768px]">
              <div className="relative overflow-hidden rounded-xl pt-2">
                <img
                  className="lg:max-w-768 px z-10 h-[190px] w-full max-w-full rounded-[20px]"
                  src={
                    channelImg
                      ? channelImg || noChannelBanner.src
                      : noChannelBanner.src
                  }
                  alt="banner"
                />
              </div>
            </div>
            <div className="mx-5 my-3 flex justify-between">
              <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-full bg-bg-tertiary text-black dark:bg-dark-grey">
                {channelSlug === 'hr-general' ? (
                  <HrGeneral className="ml-0 h-[18px] w-[18px] dark:text-bg-tertiary" />
                ) : (
                  <SmileIcon className="ml-0 h-[18px] w-[18px] dark:text-bg-tertiary md:h-5 md:w-5" />
                )}
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div className="text-xl font-[800] text-black dark:text-bg-tertiary">
                  {channelSlug ? channelNameFormat(channelSlug) : 'Saved Posts'}
                </div>
                <div
                  className="h-full w-[119px] cursor-pointer content-center rounded-full bg-bg-green text-center text-sm font-medium text-black"
                  onClick={handleCreatePost}>
                  Create Post
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog setShowSignModal={setShowSignModal} />
      </Dialog>
    </>
  )
}

export default ChannelsBanner

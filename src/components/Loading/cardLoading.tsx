'use client'
import PostBar from '@/components/shared/new-post/NewPostModal'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChannelCardSkelton from '../ChannelCardSkelton'
import ProfileCardSkelton from '../ProfileCardSkelton'
import RulesCardSkelton from '../RuleCardSkelton'
import Skelton from '../ui/skelton'
import RenderFeedLoading from './renderFeedLoading'

function CardLoading() {
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const renderTimes = 5
  const [hidden, setHidden] = useState<boolean>(false)
  const componentsArray = Array.from({ length: renderTimes }, (_, index) => (
    <RenderFeedLoading />
  ))

  useEffect(() => {
    if (!token) {
      setHidden(true)
    }
  }, [token])
  return (
    <div>
      <div
        className={`mt-8 flex justify-center max-md:mt-5  max-md:block max-md:w-full`}>
        <div className={`flex flex-col ${hidden ? ' pr-4' : ''}`}>
          {token && <ProfileCardSkelton className={'max-md:w-full'} />}
          <Skelton className="mx-auto mt-2 hidden h-6  w-24 rounded-sm bg-skelton max-md:block" />

          <div className=" sticky top-[20px] max-h-screen max-md:static">
            <ChannelCardSkelton token={token} className={'max-md:hidden'} />
          </div>
          <div className="sticky top-[400px] mt-5 max-h-screen max-lg:top-[335px]">
            <RulesCardSkelton className={'max-md:hidden'} />
          </div>
        </div>

        <div className="flex w-full max-w-screen-md flex-col">
          <div className="mb-5">
            <PostBar />
          </div>

          <div> {componentsArray}</div>
        </div>
      </div>
    </div>
  )
}

export default CardLoading

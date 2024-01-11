'use client'
import PostBar from '@/components/shared/new-post/NewPostModal'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChannelCardSkelton from '../ChannelCardSkelton'
import ProfileCardSkelton from '../ProfileCardSkelton'
import RulesCardSkelton from '../RuleCardSkelton'
import RenderFeedLoading from './renderFeedLoading'

function CardLoading() {
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const renderTimes = 5
  const [hidden, setHidden] = useState<boolean>(false)
  const componentsArray = Array.from({ length: renderTimes }, (_, index) => (
    <RenderFeedLoading key={index} />
  ))

  useEffect(() => {
    if (!token) {
      setHidden(true)
    }
  }, [token])
  return (
    <div>
      <div className={`mt-5 flex justify-center`}>
        <div className={`flex flex-col ${hidden ? ' pr-5' : 'mt-[70px]'}`}>
          {token && <ProfileCardSkelton />}

          <div className="sticky top-[20px] max-h-screen">
            <ChannelCardSkelton token={token} />
          </div>
          <div className="sticky top-[400px] mt-5 max-h-screen max-lg:top-[335px]">
            <RulesCardSkelton />
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

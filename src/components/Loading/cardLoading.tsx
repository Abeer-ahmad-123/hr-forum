import React from 'react'
import RenderFeedLoading from './renderFeedLoading'
import PostBar from '@/components/shared/new-post/NewPostModal'
import ProfileCardSkelton from '../ProfileCardSkelton'
import ChannelCardSkelton from '../ChannelCardSkelton'
import RulesCardSkelton from '../RuleCardSkelton'

function CardLoading() {
  const renderTimes = 5
  const componentsArray = Array.from({ length: renderTimes }, (_, index) => (
    <RenderFeedLoading key={index} />
  ))
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <ProfileCardSkelton />
          <div className="sticky top-0 max-h-screen" style={{ top: '35px' }}>
            <ChannelCardSkelton />
          </div>
        </div>
        <div className="flex w-full max-w-screen-md flex-col">
          <div className="mb-5">
            <PostBar />
          </div>

          <div> {componentsArray}</div>
        </div>

        <div className="sticky max-h-screen " style={{ top: '60px' }}>
          {' '}
          <RulesCardSkelton />
        </div>
      </div>
    </div>
  )
}

export default CardLoading

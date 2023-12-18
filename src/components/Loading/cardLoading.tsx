import React from 'react'
import RenderFeedLoading from './renderFeedLoading'
import ChannelCard from '../Cards/ChannelCard'
import ProfileCard from '../Cards/ProfileCard'
import RulesCard from '../Cards/RuleCard'
import ProfileCardSkelton from '../ProfileCardSkelton'
import ChannelCardSkelton from '../ChannelCardSkelton'

function CardLoading() {
    return (
        <div>

            <div className='flex justify-center'>

                <div className='flex flex-col'>
                    <ProfileCardSkelton />
                    <div className='sticky max-h-screen top-0' style={{ top: '35px' }}>
                        <ChannelCardSkelton />
                    </div>
                </div>

                <div>

                    <div className="mx-auto max-w-screen-lg dark:text-white">
                        {/*  */}
                        <RenderFeedLoading />
                        {/*  */}
                    </div>


                </div>


                <div className='sticky max-h-screen ' style={{ top: '60px' }}> <RulesCard />
                </div>
            </div>







        </div>
    )
}

export default CardLoading

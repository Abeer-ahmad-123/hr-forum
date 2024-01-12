'use client'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import ChannelCard from './ChannelCard'
import ProfileCard from './ProfileCard'

const RespScreen = () => {
  const [showComponent, setShowComponent] = useState(false)
  const loggedInUseraDetails = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )

  const handleClick = () => {
    setShowComponent(!showComponent)
  }

  return (
    <>
      <div>
        {!!loggedInUseraDetails.id && <ProfileCard />}
        {showComponent && <ChannelCard />}
        <div className="pointer mb-5 w-full">
          <div className="text-gray-500" onClick={handleClick}>
            {' '}
            {showComponent ? (
              <div className="flex flex-row items-center justify-center gap-x-2">
                Hide Details
                <FaAngleUp />
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center gap-x-2">
                Show More{' '}
                <span>
                  <FaAngleDown />
                </span>
              </div>
            )}{' '}
          </div>
        </div>
      </div>
    </>
  )
}
export default RespScreen

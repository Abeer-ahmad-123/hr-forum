'use client'

import { noProfilePicture } from '@/assets/images'
import BgBanner from '@/assets/images/background-banner.svg'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Mail } from 'lucide-react'
import { useSelector } from 'react-redux'
import { CustomLink } from '../shared/customLink/CustomLink'

const ProfileCard = () => {
  const userDetails = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )
  const email = userDetails?.email || 'webeloper@gmail.com'
  if (!userDetails.id) {
    return <></>
  }

  return (
    userDetails?  <CustomLink href="/profile">
     <div className="dark:bg-slate-800 dark:text-white flex items-center justify-start bg-bg-primary border-b pb-6 mb-6 border-b-light-grey">
          <img
            src={userDetails?.profilePictureURL || noProfilePicture.src}
            alt="profile"
            className="h-15 w-15 rounded-full border-2 border-solid border-bg-green"
            width={60}
            height={60}
          />

        <div className='flex flex-col'>
        <div className="pointer flex justify-center break-all px-3 text-center text-base font-[800]">
          {' '}
          {userDetails?.name}
        </div>
        <div className="flex items-center justify-center gap-[5px] px-3">
          <p className="mb-[10px] mt-[8px] line-clamp-3 flex break-all text-xs font-normal">
            {email}
          </p>
        </div>
        </div>
      </div>
    </CustomLink> : <div>Helllooooo</div>
  )
}
export default ProfileCard

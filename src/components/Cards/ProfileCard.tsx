'use client'

import BgBanner from '@/assets/icons/bgBanner'
import { noProfilePicture } from '@/assets/images'
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
    <div className="relative mt-5 h-auto w-[225px] cursor-pointer overflow-hidden rounded-[10px] border border-solid border-gray-300 bg-white shadow-lg dark:bg-slate-800 dark:text-white max-md:mt-4 max-md:w-full">
      {userDetails?.backgroundPictureURL ? (
        <img
          className="h-[70px] w-full object-cover"
          src={userDetails?.backgroundPictureURL}
          alt="background"
          width={200}
          height={70}
        />
      ) : (
        <BgBanner />
      )}
      <div className="flex items-center justify-center">
        <img
          src={userDetails?.profilePictureURL || noProfilePicture.src}
          alt="profile"
          className="relative top-[-20px] h-14 w-14 rounded-full border-2 border-solid border-white"
          width={50}
          height={50}
        />
      </div>
      <CustomLink
        className="pointer flex justify-center text-center font-medium"
        href={'/profile'}>
        {' '}
        {userDetails?.name}
      </CustomLink>
      <p className="ml-[15px] mr-[15px] flex text-center text-[12px] font-light text-gray-400">
        {userDetails?.bio}
      </p>
      <hr className="my-1 border-t border-gray-200" />
      <div className="flex items-center justify-center gap-2.5 px-3">
        <div>
          <Mail size={18} />
        </div>
        <p
          className="mb-[10px] mt-[10px] flex text-xs font-light"
          style={{ wordWrap: 'break-word' }}>
          {email.length > 17 ? email.slice(0, 17).concat('...') : email}
        </p>
      </div>
    </div>
  )
}
export default ProfileCard

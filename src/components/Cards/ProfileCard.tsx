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
    <CustomLink href="/profile">
      <div className="relative mt-5 h-auto w-[225px] cursor-pointer overflow-hidden rounded-[10px] border border-solid border-gray-300 bg-white shadow-lg dark:bg-slate-800 dark:text-white max-lg:mt-[25px] max-md:mt-4 max-md:w-full">
        <img
          className="h-[70px] w-full object-cover"
          src={
            userDetails?.backgroundPictureURL
              ? userDetails?.backgroundPictureURL
              : BgBanner.src
          }
          alt="background"
          width={200}
          height={70}
        />
        <div className="flex items-center justify-center">
          <img
            src={userDetails?.profilePictureURL || noProfilePicture.src}
            alt="profile"
            className="relative top-[-20px] h-14 w-14 rounded-full border-2 border-solid border-white"
            width={50}
            height={50}
          />
        </div>
        <div className="pointer flex justify-center break-all px-3 text-center font-medium">
          {' '}
          {userDetails?.name}
        </div>
        <p className="mx-[12px] line-clamp-3 break-all text-center text-[12px] font-light text-gray-400">
          {userDetails?.bio ?? ''}
          {/* {userDetails?.bio.slice(0, 50).concat('...')} */}
        </p>
        <hr className="my-1 border-t border-gray-200" />
        <div className="flex items-center justify-center gap-2.5 px-3">
          <div>
            <Mail size={18} />
          </div>
          <p className="mb-[10px] mt-[10px] line-clamp-3 flex break-all text-xs font-light">
            {email}
            {/* {email.length > 64 ? email.slice(0, 64).concat('...') : email} */}
          </p>
        </div>
      </div>
    </CustomLink>
  )
}
export default ProfileCard

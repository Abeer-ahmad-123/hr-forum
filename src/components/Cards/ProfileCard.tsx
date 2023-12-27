'use client'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { CustomLink } from '../shared/customLink/CustomLink'
const ProfileCard = () => {
  const userDetails = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )
  const email = userDetails?.email || 'webeloper@gmail.com'
  return (
    <>
      <div>
        <div className="relative h-auto w-[200px] cursor-pointer overflow-hidden rounded-[10px] bg-white shadow-lg dark:bg-slate-800 dark:text-white">
          <Image
            className="h-[70px] w-full"
            src={
              userDetails?.backgroundPictureURL ||
              'https://i.pinimg.com/originals/71/dc/d9/71dcd9ddf43b7ca29f7199305af68f08.png'
            }
            alt="background"
            width={200}
            height={70}
          />
          <div className="flex items-center justify-center">
            <Image
              src={
                userDetails?.profilePictureURL ||
                'https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp'
              }
              alt="profile"
              className="relative top-[-20px] h-14 w-14 rounded-full"
              width={50}
              height={50}
            />
          </div>
          <p className="flex justify-center text-center font-bold">
            {' '}
            {userDetails?.name || 'yong Jennifer'}
          </p>
          <p className="ml-[15px] mr-[15px] flex text-justify text-[12px] font-light">
            {userDetails?.bio ||
              'yong Jennifer is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s,'}
          </p>
          <hr className="my-1 ml-3 mr-3 border-t border-gray-400" />
          <p
            className="mx-[15px] mb-[10px] mt-[10px] flex text-xs font-light"
            style={{ wordWrap: 'break-word' }}>
            {email.length > 20 ? email.slice(0, 20).concat('...') : email}
          </p>
          <hr className="my-1 ml-3 mr-3 border-t border-gray-400" />
          <CustomLink
            href={'/profile'}
            className="mx-[15px] mb-[10px] mt-[10px] flex text-xs font-semibold">
            {' '}
            Profile View
          </CustomLink>
        </div>
      </div>
    </>
  )
}
export default ProfileCard

'use client'
import { noProfilePicture } from '@/utils/ImagesLink'
import { ProfileImageInterface } from '@/utils/interfaces/card'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { redirect } from 'next/navigation'
import { useSelector } from 'react-redux'

function ProfileImage({ imgSrc, postUserId }: ProfileImageInterface) {
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData,
  )
  const handleImageClick = () => {
    redirect(
      `${postUserId === userData.id ? '/profile' : `/profile/${postUserId}`}`,
    )
  }

  return (
    <img
      alt="profile Image"
      src={imgSrc || noProfilePicture}
      onClick={handleImageClick}
      width={32}
      height={32}
      className="h-16 w-16 rounded-full"
    />
  )
}

export default ProfileImage

'use client'
import { noProfilePicture } from '@/assets/images'
import { ProfileImageInterface } from '@/utils/interfaces/card'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function ProfileImage({ imgSrc, postUserId }: ProfileImageInterface) {
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData,
  )

  const router = useRouter()

  const handleImageClick = () => {
    nProgress.start()
    const url = `${
      postUserId === userData.id ? '/profile' : `/profile/${postUserId}`
    }`
    router.push(url)
  }
  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])

  return (
    <img
      alt="profile Image"
      src={imgSrc || noProfilePicture.src}
      onClick={handleImageClick}
      width={32}
      height={32}
      className="h-16 w-16 cursor-pointer rounded-full max-custom-sx:h-6 max-custom-sx:w-6"
    />
  )
}

export default ProfileImage

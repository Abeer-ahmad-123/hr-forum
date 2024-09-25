'use client'
import { noProfilePicture } from '@/assets/images'
import { deleteModalState } from '@/services/auth/authService'
import { getUserDetailsFromCookie } from '@/utils/cookies'
import { ProfileImageInterface } from '@/utils/interfaces/card'
import { useRouter } from 'next/navigation'

async function ProfileImage({ imgSrc, postUserId }: ProfileImageInterface) {
  // const userData = useSelector(
  //   (state: LoggedInUser) => state.loggedInUser?.userData,
  // )

  const userData = await getUserDetailsFromCookie()
  const router = useRouter()

  const handleImageClick = () => {
    const url = `${
      postUserId === userData?.id ? '/profile' : `/profile/${postUserId}`
    }`
    router.push(url)
    deleteModalState()
  }

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

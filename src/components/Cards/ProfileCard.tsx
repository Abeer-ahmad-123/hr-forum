import { noProfilePicture } from '@/assets/images'
import { CustomLink } from '../shared/customLink/CustomLink'
import { getUserFromCookie } from '@/utils/cookies'

const ProfileCard = async () => {
  const { user } = await getUserFromCookie()
  const email = user?.email || 'webeloper@gmail.com'
  if (!user.id) {
    return <></>
  }

  return (
    <CustomLink href="/profile">
      <div className="mb-6 flex items-center justify-start border-b border-b-light-grey bg-bg-primary pb-6 dark:bg-slate-800 dark:text-white">
        <img
          src={user?.profilePictureURL || noProfilePicture.src}
          alt="profile"
          className="h-15 w-15 rounded-full border-2 border-solid border-bg-green"
          width={60}
          height={60}
        />

        <div className="flex flex-col">
          <div className="pointer flex justify-center break-all px-3 text-center text-base font-[800]">
            {' '}
            {user?.name}
          </div>
          <div className="flex items-center justify-center gap-[5px] px-3">
            <p className="mb-[10px] mt-[8px] line-clamp-3 flex break-all text-xs font-normal">
              {email}
            </p>
          </div>
        </div>
      </div>
    </CustomLink>
  )
}
export default ProfileCard

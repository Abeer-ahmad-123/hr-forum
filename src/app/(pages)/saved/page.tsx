import SavedPost from '@/components/SavedPost'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SavedPostPage = () => {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return (
      <div className="mx-auto flex max-w-screen-xl justify-center">
        <div className="mt-5 flex flex-col max-md:hidden max-sm:hidden lg:block">
          {userDetailsCookies && <ProfileCard />}
          <div className="sticky top-[60px] max-h-screen">
            <ChannelCard />
          </div>
          <div className="sticky top-[400px] mt-5 max-h-screen max-lg:top-[335px]">
            {' '}
            <RulesCard />
          </div>
        </div>

        <div className="w-full max-w-screen-md">
          <div className="flex w-full justify-center">
            <div className="w-full">
              <div className="mt-[40px]  w-full max-w-screen-md dark:text-white">
                <SavedPost />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SavedPostPage

import SavedPost from '@/components/SavedPost'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'

import { cookies } from 'next/headers'

const SavedPostPage = () => {
  const userDetailsCookies = cookies().get('user-details')
  return (
    <div
      key={Math.random()}
      className="mx-auto flex max-w-screen-xl justify-center">
      <div className="mt-5 flex flex-col max-md:hidden max-sm:hidden lg:block">
        {userDetailsCookies && <ProfileCard />}
        <div className="sticky top-[60px] max-h-screen">
          <ChannelCard />
        </div>
        <div className="sticky top-[318px] mt-5 max-h-screen max-lg:top-[335px]">
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

          {/* <div className='sticky max-h-screen lg:block max-sm:hidden sm:hidden ' style={{ top: '60px' }}> <RulesCard />
        </div> */}
        </div>
      </div>
    </div>
  )
}

export default SavedPostPage

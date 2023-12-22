
import { Suspense } from 'react'
import RespProfile from './RespProfile'
import UserProfile from './UserProfile'
import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'

const Profile = () => {

  return <>  

<Suspense fallback={<ProfilePageLoading />}>
            
         
         
  <div className='max-md:hidden'>
  <UserProfile />
  
  </div>
  <div className='hidden max-md:block'> 
  <RespProfile/>
   </div>
   </Suspense>
    </>
}

export default Profile

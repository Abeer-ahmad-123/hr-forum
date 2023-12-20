import UploadImage from '@/services/image/image'

import ProfilePicture from './ProfilePicture'
import Information from './Information'
import { useSession } from 'next-auth/react'

const GeneralSettings = () => {
  const api = new UploadImage()
  const { data: session, update: sessionUpdate } = useSession()

  const uploadImage = async (event: any) => {
    try {
      const formData = new FormData()
      formData.append('file', event.target.files[0])

      let res = await api.uploadUserImage(formData)

      sessionUpdate({
        userData: { ...session?.user, profilePictureURL: res.data.data.url },
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <div className="mt-[50px] grid grid-cols-6 gap-8 max-lg:grid-cols-1">
      <div className="lg:col-span-2">
        <ProfilePicture uploadImage={uploadImage} />
      </div>
      <div className=" lg:col-span-4">
        <Information />
      </div>
    </div>
  )
}

export default GeneralSettings

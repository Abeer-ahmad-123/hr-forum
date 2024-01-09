import UploadImage from '@/services/image/image'

import { useSession } from 'next-auth/react'
import Information from './Information'
import ProfilePicture from './ProfilePicture'

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
      throw err
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

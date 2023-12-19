import { useRef, useState } from 'react'

import { CameraIcon } from '@/assets/icons'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

const ProfilePicture = ({ uploadImage }: any) => {
  const [enabled, setEnabled] = useState(false)
  const profilePictureRef: any = useRef()

  const handleActiveFileInput = () => {
    profilePictureRef.current.click()
  }

  const styles = {
    background: enabled ? 'bg-green-600' : 'bg-gray-200',
    transalte: enabled ? 'translate-x-6' : 'translate-x-1',
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-[16px] bg-white py-[24px] pb-[40px] pt-[80px] shadow-cmd dark:bg-dark-primary">
      <div
        onClick={handleActiveFileInput}
        className="border-primary-lightgrey relative flex  h-[150px] w-[150px] items-center justify-center rounded-full border-2 border-dotted "
      >
        <div className="absolute flex h-[128px] w-[128px] cursor-pointer flex-col items-center justify-center rounded-full bg-black bg-opacity-50  opacity-0 transition-opacity duration-200 ease-in-out hover:bg-opacity-50 hover:opacity-100">
          <CameraIcon className="w-[30px]" />

          <p className="text-xs text-white">Upload Picture</p>
        </div>

        <img
          src={
            session?.user?.profilePictureURL ||
            'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
          }
          className="cursor-pointer rounded-full"
          alt="Avatar"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={profilePictureRef}
        onChange={(e) => {
          uploadImage(e)
        }}
      />
      <p className="mt-[24px] text-xs text-gray-400">
        Allowed *.jpeg, *.jpg, *.png, *.gif{' '}
      </p>
      <div className="item-center mt-[40px] flex justify-center gap-[10px]">
        <p className=" text-sm ">Public Profile</p>

        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
          className={cn(
            !enabled && 'ring-1',
            'relative inline-flex h-6 w-11 items-center rounded-full',
          )}
        />
      </div>
      <button className="bg-red-100 text-red-700 mt-[24px] rounded-[12px] px-[16px] py-[10px] text-sm font-semibold">
        Delete User
      </button>
    </div>
  )
}

export default ProfilePicture

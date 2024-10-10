'use client'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { useState } from 'react'
import ChangePassword from './ChangePassword'
import PasswprdProfileIcon from '@/assets/icons/passwordProfileIcon'
import EditProfileIcon from '@/assets/icons/editProfileIcon'
import { usePathname } from 'next/navigation'

import EditPage from './EditPage'

interface userDataProps {
  name: string
  email: string
  bio: string
}
interface EditProfileButtonProps {
  userData: userDataProps

  setUserData: (userData: userDataProps) => void
  accessToken: string
  userId?: string
}
const EditProfileButton = ({
  userData,
  setUserData,
  accessToken,
  userId,
}: EditProfileButtonProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false)
  const pathName = usePathname()

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenPassDialog = () => {
    setOpenPasswordDialog(true)
  }

  return (
    <div className="absolute  sm:right-0 sm:top-0 sm:mr-0 sm:flex sm:justify-end">
      {accessToken && !userId && (
        <div className="ml-4 flex -translate-y-4 gap-4 sm:ml-0 sm:-translate-y-0 sm:pt-20 custom-mid-lg:pt-4">
          <button
            name="update password button"
            className="flex  h-[40px] w-[154px] items-center justify-center gap-2 rounded-[20px] bg-bg-green px-4 py-2 text-xs"
            onClick={handleOpenPassDialog}>
            <PasswprdProfileIcon className="text-black dark:text-white" />
            <span className="font-medium text-black">Update password</span>
          </button>
          <button
            name="edit button"
            className="flex  h-[40px] w-[119px] items-center justify-center gap-2 rounded-[20px] bg-[#53BCFF] px-4 py-2 text-xs"
            onClick={handleOpenDialog}>
            <EditProfileIcon className="text-black dark:text-white" />
            <span className="font-medium text-black">Edit Profile</span>
          </button>
        </div>
      )}

      {pathName.includes('/user-activities') ||
      (accessToken && userId) ||
      (!accessToken && userId) ? (
        <div className="md: ml-4 flex w-full max-w-[300px] -translate-y-4 gap-4 text-xs opacity-60 sm:ml-0 sm:-translate-y-0 sm:pt-20 custom-mid-lg:pt-4">
          <p className="w-full">
            Hey there, I am Steve Jons with tons of experience working with
            different people. And I can help them in many ways.
          </p>
        </div>
      ) : null}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-h-[520px] max-w-[396px] md:max-w-[581px] ">
          <EditPage
            setUpdatedUserData={setUserData}
            userData={userData}
            handleCloseDialog={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog}>
        <DialogContent className="max-h-[462px] max-w-[396px] p-6 md:max-w-[581px]">
          <ChangePassword setOpenPasswordDialog={setOpenPasswordDialog} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditProfileButton

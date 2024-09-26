'use client'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { useState } from 'react'
import ChangePassword from './ChangePassword'
import PasswprdProfileIcon from '@/assets/icons/passwordProfileIcon'
import EditProfileIcon from '@/assets/icons/editProfileIcon'

import EditPage from './EditPage'

interface userDataProps {
  name: string
  email: string
  bio: string
}
interface EditProfileButtonProps {
  userData: userDataProps
  setUserData: (userData: userDataProps) => void
}
const EditProfileButton = ({
  userData,
  setUserData,
}: EditProfileButtonProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false)

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

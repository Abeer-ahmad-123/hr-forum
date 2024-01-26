'use client'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { useState } from 'react'
import ChangePassword from './ChangePassword'
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
  const handleClosePassDialog = () => {
    setOpenPasswordDialog(false)
  }

  return (
    <div className="absolute right-0 top-0 mr-0 flex justify-end pr-[35px] pt-2">
      <div className="flex flex-col">
        <button
          className="mb-1 w-full self-end rounded bg-accent px-12 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none"
          onClick={handleOpenDialog}>
          Edit
        </button>

        <button
          className="mb-1 w-full  rounded bg-accent px-12 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none"
          onClick={handleOpenPassDialog}>
          update password
        </button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <EditPage
            setUpdatedUserData={setUserData}
            userData={userData}
            handleCloseDialog={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog}>
        <DialogContent>
          <ChangePassword setOpenPasswordDialog={setOpenPasswordDialog} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditProfileButton

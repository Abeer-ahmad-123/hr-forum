'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/components/ui/Dialog/simpleDialog'
import React, { useState } from 'react'
import EditPage from './EditPage'

interface userDataProps {
  name: string
  email: string
  bio: string
}
interface EditProfileButtonProps {
  userData: userDataProps
}
const EditProfileButton = ({ userData }: EditProfileButtonProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  return (
    <div className="mt-32 px-3 py-6 sm:mt-0">
      <button
        className="mb-1 rounded bg-accent px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600  sm:mr-2"
        type="button"
        onClick={handleOpenDialog}>
        Edit
      </button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <EditPage userData={userData} handleCloseDialog={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditProfileButton

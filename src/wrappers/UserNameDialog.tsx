'use client'
import { InputField } from '@/components/shared'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { showErrorAlert } from '@/utils/helper'
import { useState } from 'react'

type UserNameDialogProps = {
  isDialogOpen: boolean
  handleSubmit: (username: string) => void
  handleCloseDialog: () => void
}
const UserNameDialog = ({
  isDialogOpen,
  handleSubmit,
  handleCloseDialog,
}: UserNameDialogProps) => {
  const [userName, setUserName] = useState('')
  const handleInputChange = (e: any) => {
    setUserName(e.target.value)
  }
  const handleSubmitUserName = () => {
    handleSubmit(userName)
  }
  function handleClose(value: boolean) {
    if (!value) {
      if (!userName.length) {
        showErrorAlert('Please enter user name')
      } else handleCloseDialog()
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <h1 className="text-left text-lg font-semibold">Enter Your UserName</h1>
        <InputField
          name="username"
          placeholder="User Name"
          onChange={handleInputChange}
          value={userName}
        />
        <button
          onClick={handleSubmitUserName}
          className="mb1 rounded bg-accent px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none sm:mr-2">
          Submit
        </button>
      </DialogContent>
    </Dialog>
  )
}

export default UserNameDialog

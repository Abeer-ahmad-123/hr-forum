import { InputField } from '@/components/shared'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { DialogClose } from '@radix-ui/react-dialog'
import React, { useState } from 'react'

const UserNameDialog = ({ handleSubmit }: any) => {
  const [userName, setUserName] = useState('')
  const handleInputChange = (e: any) => {
    setUserName(e.target.value)
  }
  const handleSubmitUserName = () => {
    handleSubmit(userName)
  }

  return (
    <Dialog open>
      <DialogContent>
        <h1 className="text-left text-lg font-semibold">
          Select Your UserName
        </h1>
        <InputField
          name="username"
          placeholder="User Name"
          onChange={handleInputChange}
          value={userName}
        />
        <button
          onClick={handleSubmitUserName}
          className="mb-1 rounded bg-accent px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600  sm:mr-2">
          Submit
        </button>
      </DialogContent>
    </Dialog>
  )
}

export default UserNameDialog

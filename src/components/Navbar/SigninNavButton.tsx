'use client'
import React from 'react'
import { BsPersonFill } from 'react-icons/bs'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/Dialog/simpleDialog'
import Signin from '@/components/Login'
import Signup from '@/components/Register'

export default function SigninNavButton() {
  const [showSignUpForm, setShowSignUpForm] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)

  const toggleForm = () => {
    setShowSignUpForm((current) => !current)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger
        className={`flex w-[50px] cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-3 py-2 text-white  hover:bg-accent sm:w-[120px]`}>
        <BsPersonFill size={20} />
        <span className="hidden  sm:inline-block">Login</span>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[500px]">
        {showSignUpForm ? (
          <Signup
            toggleForm={toggleForm}
            handleDialogClose={handleCloseDialog}
          />
        ) : (
          <Signin
            toggleForm={toggleForm}
            handleDialogClose={handleCloseDialog}
            setShowSignModal={() => {}}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

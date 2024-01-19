'use client'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import { DialogContent } from '@/components/ui/Dialog/simpleDialog'
import React from 'react'
interface SignInDialogProps {
  setShowSignModal?: (arg0: boolean) => void
}
function SignInDialog({ setShowSignModal }: SignInDialogProps) {
  const [showSignUpForm, setShowSignUpForm] = React.useState(false)
  const toggleForm = () => {
    setShowSignUpForm((current) => !current)
  }
  return (
    <DialogContent className="bg-white sm:max-w-[500px]">
      {showSignUpForm ? (
        <Signup toggleForm={toggleForm} />
      ) : (
        <Signin toggleForm={toggleForm} setShowSignModal={setShowSignModal} />
      )}
    </DialogContent>
  )
}

export default SignInDialog

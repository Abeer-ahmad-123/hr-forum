'use client'
import React from 'react'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import {

    DialogContent,

} from '@/components/ui/Dialog/simpleDialog'

function SignInDialog() {
    const [showSignUpForm, setShowSignUpForm] = React.useState(false)
    const toggleForm = () => {
        setShowSignUpForm((current) => !current)
    }
    return (
        <DialogContent className="bg-white sm:max-w-[500px]">
            {showSignUpForm ? 
                <Signup toggleForm={toggleForm} />
             : 
                <Signin toggleForm={toggleForm} />
            }
        </DialogContent>
    )
}

export default SignInDialog
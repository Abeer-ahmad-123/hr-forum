// @ts-nocheck
'use client'

import { SigninForm } from './SigninForm'
// import { GoogleButton } from '../shared'
import React, { useState } from 'react'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { signIn } from '@/services/auth/authService'
import { showErrorAlert } from '@/utils/helper'
import { AppDispatch } from '@/store'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/Slices/loggedInUserSlice'
// import Google from '@/assets/icons/google'
import GoogleButton from '../shared/GoogleButton/'

export default function Signin({ toggleForm }: any) {
  const dispatch = useDispatch<AppDispatch>()

  const initialValues = {
    email: '',
    password: '',
  }
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialValues)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    let error = handleAuthError(name, value)

    setErrors({ ...errors, [name]: error?.message || '' })
    setFormValues({ ...formValues, [name]: value })
  }

  const handleValidations = () => {
    let errors = {}
    Object.keys(formValues).map((key, index) => {
      let error = handleAuthError(key, formValues[key])
      if (error) {
        errors = { ...errors, [error.name]: error.message }
      }
    })

    setErrors(errors)
    return !Object?.keys(errors)?.length
  }
  async function handleLoginSubmit(e) {
    e.preventDefault()
    
    try {
      const { email, password } = formValues
      let isFieldsValid = handleValidations()
      if (!isFieldsValid) {
        console.log('I am invalid...')
        return
      }
      const result = await signIn(
        JSON.stringify({
          email,
          password,
        }),
      )
      if (result?.token) {
        localStorage.setItem('token', result?.token)
        localStorage.setItem('userData', JSON.stringify(result?.userData))
        dispatch(setUser(result))
      }
      if (result.error) {
        showErrorAlert('Sign-in failed. Please check your credentials.')
      } else {
        // onClose()
      }
    } catch (err) {
      console.log('err', err)
      showErrorAlert('unauthenticated email or password not matched.')
    }
  }

  return (
    <div className="container mx-auto flex h-[550px] w-[440px] flex-col justify-center space-y-6">
      <div className="relative flex flex-col justify-center overflow-hidden">
        <div className="m-auto w-full rounded-md bg-white p-4 shadow-md  dark:bg-dark-primary lg:max-w-xl ">
          <h1 className="mb-2 text-center text-3xl font-semibold dark:text-white">
            Sign in
          </h1>
          <div>
            <GoogleButton title="Sign In" />
          </div>
          <p className=" my-3 text-center dark:text-white">OR</p>
          <SigninForm
            errors={errors}
            formValues={formValues}
            handleInputChange={handleInputChange}
            handleLoginSubmit={handleLoginSubmit}
          />
          {/* Sign Up Link */}
          <p className="mt-2 text-center text-xs font-light text-gray-700 dark:text-white">
            {"Don't have an account? "}
            <button
              className="text-primary-purple cursor-pointer font-medium hover:underline"
              onClick={() => {
                toggleForm()
              }}>
              Sign up
            </button>
          </p>
          {/* Sign Up Link End*/}
        </div>
      </div>
      {/* Form Ends */}
    </div>
  )
}

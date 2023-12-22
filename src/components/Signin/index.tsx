'use client'

import { SigninForm } from './SigninForm'
import React, { ChangeEvent, useState } from 'react'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { googleAuthStart, signIn } from '@/services/auth/authService'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { AppDispatch } from '@/store'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/Slices/loggedInUserSlice'
import { usePathname, useRouter } from 'next/navigation'
import GoogleButton from '../shared/GoogleButton/'

export default function Signin({
  toggleForm,
  handleDialogClose = () => {},
}: any) {
  const dispatch = useDispatch<AppDispatch>()
  const pathname = usePathname()
  const router = useRouter()
  const initialValues = {
    email: '',
    password: '',
  }
  const [formValues, setFormValues] = useState<any>(initialValues)
  const [errors, setErrors] = useState<any>(initialValues)

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

  async function handleLoginSubmit(e: ChangeEvent) {
    e.preventDefault()

    try {
      const { email, password } = formValues
      let isFieldsValid = handleValidations()
      if (!isFieldsValid) {
        return
      }
      const result = await signIn(
        JSON.stringify({
          email,
          password,
        }),
      )
      if (
        !result?.success &&
        result?.status === 401 &&
        result?.status === 404
      ) {
        showErrorAlert('Sign-in failed. Please check your credentials.')
        setErrors({
          ...errors,
          password: 'Unauthenticated! email or password not matched.',
        })
        return
      }
      if (result?.data?.token) {
        dispatch(
          setUser({
            ...result?.data,
            refreshToken: result?.data['refresh-token'],
          }),
        )
        showSuccessAlert('Welcome back! ' + result?.data?.userData?.name)
        handleDialogClose()
      }
    } catch (err) {
      console.log('err', err)
      showErrorAlert('Something went wrong while signing in.')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const response = await googleAuthStart(pathname)
      if (response?.success) {
        router.push(response?.data)
      }
    } catch (err) {
      console.log('err', err)
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
            <GoogleButton
              title="Sign In"
              callbackFunction={handleGoogleSignIn}
            />
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
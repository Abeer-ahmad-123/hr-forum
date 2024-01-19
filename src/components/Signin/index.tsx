'use client'
import { googleAuthStart, signIn } from '@/services/auth/authService'
import { AppDispatch } from '@/store'
import { setUser } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import GoogleButton from '../shared/GoogleButton/'
import { SigninForm } from './SigninForm'

import { useParams } from 'next/navigation'
export default function Signin({
  toggleForm,
  handleDialogClose = () => {},
}: any) {
  const dispatch = useDispatch<AppDispatch>()
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  const initialValues = {
    email: '',
    password: '',
  }

  const [formValues, setFormValues] = useState<any>(initialValues)
  const [errors, setErrors] = useState<any>(initialValues)
  const [loading, setLoading] = useState<boolean>(false)

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
      setLoading(true)
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
        (result?.status === 401 || result?.status === 404)
      ) {
        setErrors({
          ...errors,
          password: result.errors[0].includes('password') && 'Invalid Password',
          email: result.errors[0].includes('email') && result.errors[0],
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
        showSuccessAlert('Welcome! ' + result?.data?.userData?.name)
        handleDialogClose()

        if (
          pathname.includes('/feeds/feed') &&
          !pathname.includes('/channels/')
        ) {
        } else router.refresh()
      }
    } catch (err) {
      showErrorAlert('Something went wrong while signing in.')
    } finally {
      setLoading(false)
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
        <div className="m-auto w-full rounded-md bg-white p-4 shadow-md  dark:bg-[#0e1320] lg:max-w-xl ">
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
            loading={loading}
            formValues={formValues}
            handleInputChange={handleInputChange}
            handleLoginSubmit={handleLoginSubmit}
          />
          {/* Sign Up Link */}
          <div className="mt-2 flex justify-center text-center text-xs font-light text-gray-700 dark:text-white">
            <p>Don't have an account?</p>
            <button
              className="text-primary-purple cursor-pointer font-medium hover:underline"
              onClick={toggleForm}>
              Sign up
            </button>
          </div>
          {/* Sign Up Link End*/}
        </div>
      </div>
      {/* Form Ends */}
    </div>
  )
}

'use client'
import { useState } from 'react'
import SignupForm from '@/components/Signup/SignupForm'
import GoogleButton from '../shared/GoogleButton/'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { signUp, signIn, googleAuthStart } from '@/services/auth/authService'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { usePathname, useRouter } from 'next/navigation'

export default function Signup({
  toggleForm,
  handleDialogClose = () => {},
}: any) {
  const initialValues: any = {
    name: '',
    username: '',
    email: '',
    password: '',
  }
  const router = useRouter()
  const pathname = usePathname()
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialValues)
  const [loading, setLoading] = useState<boolean>(false)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    let error = handleAuthError(name, value)

    setErrors({ ...errors, [name]: error?.message || '' })
    setFormValues({ ...formValues, [name]: value })
  }

  const handleValidations = () => {
    let errors = {}
    Object.keys(formValues).forEach((key) => {
      let error = handleAuthError(key, formValues[key])
      if (error) errors = { ...errors, [error.name]: error.message }
    })
    setErrors(errors)
    return !Object.keys(errors).length
  }

  const handleSignupSubmit = async (e: any) => {
    try {
      setLoading(true)
      e.preventDefault()
      let isFieldsValid = handleValidations()

      if (!isFieldsValid) return
      await signUp(formValues)
      const result = await signIn(
        JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      )
      if (result?.success) {
        // localStorage.setItem('token', result?.token)
        // localStorage.setItem('userData', JSON.stringify(result?.userData))
        // dispatch(setUser(result))
        // handleDialogClose()
        showSuccessAlert('Successfully Signup. Please login...')
      } else {
        showErrorAlert('unauthenticated email or password not matched.')
      }
    } catch (err: any) {
      console.log('err', err)
    } finally {
      setLoading(true)
    }
  }

  const handleGoogleSignUp = async () => {
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
    <div className="container mx-auto flex h-[550px] w-[400px] flex-col justify-center space-y-6">
      <div className="relative flex flex-col justify-center overflow-hidden">
        <div className="m-auto w-full rounded-md bg-white p-4 shadow-md dark:bg-dark-primary lg:max-w-xl">
          <h1 className="mb-2 text-center text-3xl font-semibold dark:text-white">
            Sign Up
          </h1>
          <GoogleButton
            title={'Sign Up'}
            callbackFunction={handleGoogleSignUp}
          />
          <p className="mt-4 text-center dark:text-white">OR</p>

          <SignupForm
            errors={errors}
            loading={loading}
            formValues={formValues}
            handleInputChange={handleInputChange}
            handleSignupSubmit={handleSignupSubmit}
          />
          {/* Login Link */}
          <>
            <p className="mt-2 text-center text-xs font-light text-gray-700 dark:text-white">
              Already have an account?{' '}
              <button
                className="text-primary-purple cursor-pointer font-medium hover:underline"
                onClick={() => {
                  toggleForm()
                }}>
                {' '}
                Sign in
              </button>
            </p>
          </>
          {/* Login Link Ends */}
        </div>
      </div>
      {/* Form Ends */}
    </div>
  )
}

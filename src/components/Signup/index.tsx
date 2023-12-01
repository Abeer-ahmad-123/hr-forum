'use client'
import { useState } from 'react'
import SignupForm from '@/components/Signup/SignupForm'
import GoogleButton from '../shared/GoogleButton/'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { signUp, signIn } from '@/services/auth/authService'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert } from '@/utils/helper'

export default function Signup({ toggleForm }: any) {
  const dispatch = useDispatch()
  const initialValues: any = {
    name: '',
    username: '',
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
    Object.keys(formValues).forEach((key) => {
      let error = handleAuthError(key, formValues[key])
      if (error) errors = { ...errors, [error.name]: error.message }
    })
    setErrors(errors)
    return !Object.keys(errors).length
  }

  const handleSignupSubmit = async (e: any) => {
    try {
      e.preventDefault()
      let isFieldsValid = handleValidations()

      if (!isFieldsValid) return
      await signUp(formValues)
      const result = await signIn({
        email: formValues.email,
        password: formValues.password,
      })
      debugger
      if (result?.data?.token) {
        localStorage.setItem('token', result?.data?.token)
        localStorage.setItem('userData', result?.data?.userData)
        dispatch(setUser(result))
      } else {
        showErrorAlert('unauthenticated email or password not matched.')
      }
    } catch (err: any) {
      console.log('err', err)
      showErrorAlert(err?.message)
    }
  }

  return (
    <div className="container mx-auto flex h-[550px] w-[400px] flex-col justify-center space-y-6">
      <div className="relative flex flex-col justify-center overflow-hidden">
        <div className="m-auto w-full rounded-md bg-white p-4 shadow-md dark:bg-dark-primary lg:max-w-xl">
          <h1 className="mb-2 text-center text-3xl font-semibold dark:text-white">
            Sign Up
          </h1>
          <GoogleButton title={'Sign Up'} />
          <p className="mt-4 text-center dark:text-white">OR</p>

          <SignupForm
            errors={errors}
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

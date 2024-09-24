'use client'
import RegisterForm from '@/components/Register/RegisterForm'
import { googleAuthStart, signIn, signUp } from '@/services/auth/authService'
import { setUser } from '@/store/Slices/loggedInUserSlice'
import {
  isValidEmail,
  isValidUserName,
  showErrorAlert,
  showSuccessAlert,
} from '@/utils/helper'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import GoogleButton from '../shared/GoogleButton'

type Props = {
  toggleForm: () => void
  handleDialogClose?: () => void
}
export default function Register({
  toggleForm,
  handleDialogClose = () => {},
}: Props) {
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
  // const dispatch = useDispatch()
  const isRegisterRoute = pathname === '/register'

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
      if (
        !!formValues.name &&
        !!formValues.username &&
        !!formValues.email &&
        !!formValues.password
      ) {
        /**
         * @description
         * Custom error generation for multiple regex expressions.
         */
        const { valid: isUserNameValid } = isValidUserName(formValues.username)
        if (isUserNameValid && isValidEmail(formValues.email)) {
          setLoading(true)
          let isFieldsValid = handleValidations()

          if (!isFieldsValid) return
          const response = await signUp(formValues)
          if (!response.success) {
            setErrors({
              ...errors,
              email: response.errors[0].includes('email') && response.errors[0],
              username:
                response.errors[0].includes('username') &&
                'username already exists',
            })
          } else {
            /**
             * OVERHEAD CODE:
             * SignUp API is also returning token, refreshToken and userData so why not save and log in user?
             */
            // const result = await signIn(
            //   JSON.stringify({
            //     email: formValues.email,
            //     password: formValues.password,
            //   }),
            // )
            // if (
            //   !result?.success &&
            //   (result?.status === 401 || result?.status === 404)
            // ) {
            //   setErrors({
            //     ...errors,
            //     password:
            //       result.errors[0].includes('password') && 'Invalid Password',
            //     email: result.errors[0].includes('email') && result.errors[0],
            //   })
            //   return
            // }
            if (response?.data?.token) {
              // dispatch(
              //   setUser({
              //     ...response?.data,
              //     refreshToken: response?.data['refresh-token'],
              //   }),
              // )
              showSuccessAlert('Welcome! ' + response?.data?.userData?.name)
              handleDialogClose()
              // router.refresh()
            } else {
              showSuccessAlert('User Created Please Login!')
              toggleForm()
            }
            if (pathname.includes('/login')) {
              router.push('/feeds')
            }
          }
        } else {
          showErrorAlert('Please enter valid email or username.')
        }
      } else {
        showErrorAlert('Please fill all the fields.')
        let isFieldsValid = handleValidations()
        if (!isFieldsValid) return
      }
    } catch (err: any) {
    } finally {
      setLoading(false)
    }
  }
  return (
    <div
      className={`container flex ${
        pathname.includes('register')
          ? 'h-full min-h-[calc(100vh-56px)]'
          : 'h-[694px]'
      }
       ${
         isRegisterRoute ? 'w-[511px] ' : 'w-full max-w-[511px]'
       } flex-col justify-start p-0`}>
      <div
        className={`${
          isRegisterRoute ? 'rounded-md shadow-2xl' : ''
        } relative flex flex-col items-center justify-start overflow-hidden`}>
        <div
          className={`flex w-full flex-col items-center rounded-md bg-white shadow-md dark:bg-bg-primary-dark lg:max-w-xl`}>
          <h1 className="mb-2 text-center text-xl font-semibold dark:text-white">
            Create your account
          </h1>
          <p className="text-center text-[14px] text-[#71717A]">
            Enter your email and password to create your account
          </p>

          <p className="mt-4 text-center dark:text-white">OR</p>
          <div className="mt-4 w-full max-w-[348px] rounded-xl border border-[#E4E4E7] p-4 dark:border-bg-tertiary-dark md:min-w-[432px] md:p-6">
            <RegisterForm
              errors={errors}
              loading={loading}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleSignupSubmit={handleSignupSubmit}
            />
          </div>

          <>
            <p className="mt-6 text-center text-xs font-light text-gray-700 dark:text-white">
              Already have an account?{' '}
              <button
                name="sign in button"
                className="text-primary-purple cursor-pointer font-medium hover:underline"
                onClick={() => {
                  toggleForm()
                }}>
                {' '}
                Sign in
              </button>
            </p>
          </>
        </div>
      </div>
    </div>
  )
}

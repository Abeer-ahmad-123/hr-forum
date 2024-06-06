'use client'
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
import nProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import GoogleButton from '../shared/GoogleButton'
import RegisterForm from '@/components/Register/RegisterForm'

export default function Register({
  toggleForm,
  handleDialogClose = () => { },
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
  const dispatch = useDispatch()
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
        if (
          isUserNameValid &&
          isValidEmail(formValues.email)
        ) {
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
            const result = await signIn(
              JSON.stringify({
                email: formValues.email,
                password: formValues.password,
              }),
            )

            if (
              !result?.success &&
              (result?.status === 401 || result?.status === 404)
            ) {
              setErrors({
                ...errors,
                password:
                  result.errors[0].includes('password') && 'Invalid Password',
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
              router.refresh()
            }

            if (pathname.includes('/login')) {
              nProgress.start()
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

  const handleGoogleSignUp = async () => {
    try {
      const response = await googleAuthStart(pathname)
      if (response?.success) {
        router.push(response?.data)
      }
    } catch (err) { }
  }

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])

  return (
    <div
      className={`container mx-auto flex ${pathname.includes('register')
        ? 'h-full min-h-[calc(100vh-56px)]'
        : 'h-[550px]'
        }
       ${isRegisterRoute ? 'w-[440px] ' : 'w-full max-w-[440px]'
        } flex-col justify-center space-y-6`}>
      <div
        className={`${isRegisterRoute ? 'rounded-md shadow-2xl' : ''
          } relative flex flex-col justify-center overflow-hidden`}>
        <div
          className={` m-auto w-full rounded-md bg-white p-4 shadow-md dark:bg-dark-background lg:max-w-xl`}>
          <h1 className="mb-2 text-center text-3xl font-semibold dark:text-white">
            Sign Up
          </h1>
          <div className="cursor-pointer">
            <GoogleButton title={'Sign Up'} onClick={handleGoogleSignUp} />
          </div>
          <p className="mt-4 text-center dark:text-white">OR</p>

          <RegisterForm
            errors={errors}
            loading={loading}
            formValues={formValues}
            handleInputChange={handleInputChange}
            handleSignupSubmit={handleSignupSubmit}
          />
          <>
            <p className="mt-2 text-center text-xs font-light text-gray-700 dark:text-white">
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

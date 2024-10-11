'use client'
import { googleAuthStart, signIn } from '@/services/auth/authService'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import GoogleButton from '../shared/GoogleButton'
import { LoginForm } from './LoginForm'
import { setValueToLocalStoage } from '@/utils/local-stroage'

export default function Login({
  toggleForm,
  handleDialogClose = () => {},
  setShowSignModal,
}: any) {
  const pathname = usePathname()
  const router = useRouter()
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
        setValueToLocalStoage('userData', result?.data?.userData)
        setValueToLocalStoage('token', result?.data?.token)
        setValueToLocalStoage('refreshToken', result?.data['refresh-token'])
        router.refresh()
        showSuccessAlert('Welcome! ' + result?.data?.userData?.name)
        router.refresh()
        handleDialogClose()

        if (
          pathname.includes('/feeds/feed') &&
          !pathname.includes('/channels/')
        ) {
        } else router.refresh()
      }

      if (pathname.includes('/login')) {
        router.push('/feeds')
      }
      router.refresh()
    } catch (err) {
      showErrorAlert('Something went wrong while logging in.')
    } finally {
      setLoading(false)
      setShowSignModal && setShowSignModal(false)
    }
  }

  async function handleGoogleSignIn() {
    try {
      const response = await googleAuthStart(pathname)

      if (response?.success) {
        router.push(response?.data)
      }
    } catch (err) {}
  }

  function submitForm() {
    setFormValues(initialValues)
    toggleForm()
  }

  return (
    <div
      className={`container flex  h-full max-h-[518px] w-full max-w-[348px] flex-col p-0 md:max-h-[600px] md:max-w-[551px]`}>
      <div
        className={`${
          pathname === '/login'
            ? 'h-full max-h-[518px] w-full max-w-[348px] flex-col rounded-md  border border-[#E2E8F0]  dark:border-[#202020] md:max-h-[600px] md:max-w-[551px]'
            : ''
        } relative flex flex-col justify-center `}>
        <div
          className={`
            ${
              pathname === '/login'
                ? 'h-full w-full p-[20px] md:h-[600px] md:w-[551px]'
                : ''
            }
            flex  w-full flex-col items-center justify-center rounded-md bg-white   dark:bg-bg-primary-dark `}>
          <h1 className="mb-2 mt-1  text-center text-[20px]  font-medium dark:text-white md:mt-[12px]">
            Login into your account
          </h1>
          <p className="text-center text-[14px] text-[#71717A]">
            Enter your email and password to access your account
          </p>
          <div className="mb-6 mt-6  w-full max-w-[348px] rounded-xl border border-[#E4E4E7] p-4 dark:border-bg-tertiary-dark md:mt-10 md:min-w-[432px] md:p-6">
            <LoginForm
              errors={errors}
              loading={loading}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleLoginSubmit={handleLoginSubmit}
            />
            <div className="mb-3 mt-6 flex items-center justify-center">
              <div className="border-[#F4F4F5]-300 flex-grow border-t dark:border-bg-tertiary-dark"></div>
              <span className="mx-3 text-[12px] text-[#71717A]">OR</span>
              <div className="border-[#F4F4F5]-300 flex-grow border-t dark:border-bg-tertiary-dark"></div>
            </div>

            <div className="cursor-pointer">
              <GoogleButton title="Continue" onClick={handleGoogleSignIn} />
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-2 flex justify-center space-x-1 text-center text-xs font-light text-gray-700 dark:text-white">
            <p>Doesn't have an account? </p>
            <button
              name="register button"
              className="text-primary-purple cursor-pointer font-medium hover:underline"
              onClick={submitForm}>
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

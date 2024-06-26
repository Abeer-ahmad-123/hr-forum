'use client'
import { googleAuthStart, signIn } from '@/services/auth/authService'
import { AppDispatch } from '@/store'
import { setUser } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { usePathname, useRouter } from 'next/navigation'
// import nProgress from 'nprogress'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import GoogleButton from '../shared/GoogleButton'
import { LoginForm } from './LoginForm'

export default function Login({
  toggleForm,
  handleDialogClose = () => {},
  setShowSignModal,
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

      if (pathname.includes('/login')) {
        // nProgress.start()
        router.push('/feeds')
      }
    } catch (err) {
      showErrorAlert('Something went wrong while logging in.')
    } finally {
      setLoading(false)
      setShowSignModal && setShowSignModal(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const response = await googleAuthStart(pathname)
      if (response?.success) {
        router.push(response?.data)
      }
    } catch (err) {}
  }
  useEffect(() => {
    return () => {
      // nProgress.done()
    }
  }, [])

  function submitForm() {
    /**
     * On form change reset the values of current form.
     */
    setFormValues(initialValues)
    /**
     * Reset the form to login form.
     */
    toggleForm()
  }

  return (
    <div
      className={`container mx-auto flex  ${
        pathname.includes('login')
          ? 'h-full min-h-[calc(100vh-56px)]'
          : 'h-[550px]'
      } ${
        pathname === '/login' ? 'w-[440px]' : ' w-full max-w-[440px]'
      }  flex-col justify-center space-y-6`}>
      <div
        className={`${
          pathname === '/login' ? 'shadow-2xl' : ''
        } relative flex flex-col justify-center overflow-hidden`}>
        <div
          className={`m-auto w-full rounded-md bg-white p-4 shadow-md  dark:bg-[#0e1320] lg:max-w-xl`}>
          <h1 className="mb-2 text-center text-3xl font-semibold dark:text-white">
            Login
          </h1>
          <div className="cursor-pointer">
            <GoogleButton title="Log In" onClick={handleGoogleSignIn} />
          </div>
          <p className=" my-3 text-center dark:text-white">OR</p>
          <LoginForm
            errors={errors}
            loading={loading}
            formValues={formValues}
            handleInputChange={handleInputChange}
            handleLoginSubmit={handleLoginSubmit}
          />
          {/* Sign Up Link */}
          <div className="mt-2 flex justify-center space-x-1 text-center text-xs font-light text-gray-700 dark:text-white">
            <p>Don't have an account? </p>
            <button
              name="register button"
              className="text-primary-purple cursor-pointer font-medium hover:underline"
              onClick={submitForm}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

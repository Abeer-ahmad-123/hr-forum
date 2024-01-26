'use client'
import CircularProgressIcon from '@/assets/icons/circularProgress'
import { useInterceptor } from '@/hooks/interceptors'
import { updateUserPassword } from '@/services/user'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ErrorText } from './shared'

interface userDataProps {
  oldPassword: string
  newPassword: string
}
interface ChangePasswordProps {
  setOpenPasswordDialog: (arg0: boolean) => void
}

function ChangePassword({ setOpenPasswordDialog }: ChangePasswordProps) {
  const [userData, setUserData] = useState<any>({
    oldPassword: '',
    newPassword: '',
  })

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const initialValues = {
    password: '',
  }
  const [errors, setErrors] = useState<any>(initialValues)

  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const refreshToken =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const { customFetch } = useInterceptor()

  const toggleShowOldPassword = () => {
    setShowOldPassword((prevShow) => !prevShow)
  }

  const toggleShowNewPassword = () => {
    setShowNewPassword((prevShow) => !prevShow)
  }

  const handleCancel = () => {
    setOpenPasswordDialog(false)
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      let isFieldsValid = handleValidations()
      if (!isFieldsValid) {
        return
      }

      if (userData.newPassword !== confirmPassword) {
        setErrors({ ...errors, confirmPassword: 'Passwords do not match' })
        return
      }

      const response = await updateUserPassword(
        customFetch,
        token,
        refreshToken,
        userData,
      )
      if (response.success) {
        setLoading(false)
        setOpenPasswordDialog(false)
        showSuccessAlert('Password Updated successfully')
        router.refresh()
      } else {
        showErrorAlert('Something went wrong')
      }
    } catch (error) {
      if (error instanceof Error) {
        showErrorAlert('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }
  const handleValidations = () => {
    let errors = {}
    Object.keys(userData).map((key, index) => {
      let error = handleAuthError('password', userData[key])

      if (error) {
        errors = { ...errors, [error.name]: error.message }
      }
    })
    setErrors(errors)

    return !Object?.keys(errors)?.length
  }

  const handleChange = (e: any) => {
    const { id, value } = e.target
    let error = handleAuthError(id, value)

    if (id === 'confirmPassword') {
      setConfirmPassword(value)
      if (value !== userData.newPassword) {
        setErrors({ ...errors, [id]: 'Passwords do not match' })
      } else {
        setErrors({ ...errors, [id]: '' })
      }
    } else {
      setErrors({ ...errors, [id]: error?.message || '' })

      setUserData({
        ...userData,
        [id]: value,
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Change Password</h1>
      <div className="flex flex-col gap-4">
        <div>
          <div className="border-grey-700 flex w-full rounded-lg border border-solid">
            <input
              type={showOldPassword ? 'text' : 'password'}
              id="oldPassword"
              value={userData.oldPassword}
              placeholder="Old Password"
              onChange={handleChange}
              className={`caret-gray  w-full resize-none rounded-l-lg border-none p-2 pl-2 text-left outline-none dark:bg-dark-background`}
            />
            <button
              onClick={toggleShowOldPassword}
              className="rounded-r-lg bg-white px-3 text-white">
              {showOldPassword ? (
                <Eye color="#D3D3D3" />
              ) : (
                <EyeOff color="#D3D3D3" />
              )}
            </button>
          </div>
          {errors.password && <ErrorText text={errors['password']} />}
        </div>

        <div className="border-grey-700 flex w-full rounded-lg border border-solid">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            value={userData.newPassword}
            placeholder="New Password"
            onChange={handleChange}
            className={`caret-gray  w-full resize-none rounded-l-lg border-none p-2 pl-2 text-left outline-none dark:bg-dark-background`}
          />
          <button
            onClick={toggleShowNewPassword}
            className="rounded-r-lg bg-white px-3 text-white">
            {showNewPassword ? (
              <Eye color="#D3D3D3" />
            ) : (
              <EyeOff color="#D3D3D3" />
            )}
          </button>
        </div>
        {errors.password && <ErrorText text={errors['password']} />}

        {/* Confirm Pass */}
        <div className="border-grey-700 flex w-full rounded-lg border border-solid">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
            className={`caret-gray  w-full resize-none rounded-l-lg border-none p-2 pl-2 text-left outline-none dark:bg-dark-background`}
          />
          <button
            onClick={toggleShowNewPassword}
            className="rounded-r-lg bg-white px-3 text-white">
            {showNewPassword ? (
              <Eye color="#D3D3D3" />
            ) : (
              <EyeOff color="#D3D3D3" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <ErrorText text={errors['confirmPassword']} />
        )}
      </div>

      <div className="mt-3 flex justify-center gap-2">
        <button
          onClick={handleCancel}
          className="duration-450 flex h-10 w-32 cursor-pointer items-center justify-center rounded-md border border-solid border-accent text-accent transition hover:bg-accent hover:text-white ">
          {' '}
          cancel
        </button>
        <button
          onClick={handleSubmit}
          className={`flex h-10 w-32 cursor-pointer items-center justify-center rounded-md 
        text-white   ${loading ? 'bg-gray-300' : 'bg-accent'}
          `}>
          Save{' '}
          {loading ? (
            <div className="ml-2">
              <CircularProgressIcon color="gray" />
            </div>
          ) : (
            <></>
          )}
        </button>
      </div>
    </div>
  )
}

export default ChangePassword

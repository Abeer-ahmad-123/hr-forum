'use client'
import CircularProgressIcon from '@/assets/icons/circularProgress'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { useInterceptor } from '@/hooks/interceptors'
import { updateUserPassword } from '@/services/user'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Eye, EyeOff } from 'lucide-react'
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

const ChangePassword = ({ setOpenPasswordDialog }: ChangePasswordProps) => {
  const [userData, setUserData] = useState<userDataProps>({
    oldPassword: '',
    newPassword: '',
  })
  const { handleRedirect } = useFetchFailedClient()
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
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
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShow) => !prevShow)
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
        showSuccessAlert(response.message)
      } else {
        // TODO: when backend issue resolved
        throw response.errors[0]
      }
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
      showErrorAlert(`${error}`)
    } finally {
      setLoading(false)
    }
  }
  const handleValidations = () => {
    let errors = {}
    Object.keys(userData).map((key, index) => {
      let error = handleAuthError(
        'password',
        userData[key as keyof userDataProps],
      )

      if (error) {
        errors = { ...errors, [error.name]: error.message }
      }
    })
    setErrors(errors)

    return !Object?.keys(errors)?.length
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <h1 className="mb-4 text-2xl font-bold dark:text-white ">
        Change Password
      </h1>
      <div className="flex flex-col gap-4">
        <div>
          <div className="border-grey-700 flex w-full rounded-lg border border-solid border-[#d3d3d3]">
            <input
              type={showOldPassword ? 'text' : 'password'}
              id="oldPassword"
              value={userData.oldPassword}
              placeholder="Old Password"
              onChange={handleChange}
              className={`caret-gray  w-full resize-none rounded-l-lg border-none p-2 pl-2 text-left outline-none dark:bg-dark-background dark:text-white`}
            />
            <button
              name="toggle password type"
              onClick={toggleShowOldPassword}
              className="rounded-r-lg bg-white px-3 text-white dark:bg-dark-background">
              {showOldPassword ? (
                <Eye color="#D3D3D3" size={18} />
              ) : (
                <EyeOff color="#D3D3D3" size={18} />
              )}
            </button>
          </div>
          {errors.password && <ErrorText text={errors['password']} />}
        </div>

        <div className="border-grey-700 flex w-full rounded-lg border border-solid border-[#d3d3d3]">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            value={userData.newPassword}
            placeholder="New Password"
            onChange={handleChange}
            className={`caret-gray w-full resize-none  rounded-l-lg border border-none border-[#d3d3d3] p-2 pl-2 text-left outline-none dark:bg-dark-background dark:text-white `}
          />
          <button
            name="toggle password type"
            onClick={toggleShowNewPassword}
            className="rounded-r-lg bg-white px-3 text-white dark:bg-dark-background">
            {showNewPassword ? (
              <Eye color="#D3D3D3" size={18} />
            ) : (
              <EyeOff color="#D3D3D3" size={18} />
            )}
          </button>
        </div>
        {errors.password && <ErrorText text={errors['password']} />}

        {/* Confirm Pass */}
        <div className="border-grey-700 flex w-full rounded-lg border border-solid border-[#d3d3d3]">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
            className={`caret-gray  w-full resize-none rounded-l-lg border-none p-2 pl-2 text-left outline-none dark:bg-dark-background dark:text-white`}
          />
          <button
            name="toggle password type"
            onClick={toggleShowConfirmPassword}
            className="rounded-r-lg bg-white px-3 text-white dark:bg-dark-background">
            {showConfirmPassword ? (
              <Eye color="#D3D3D3" size={18} />
            ) : (
              <EyeOff color="#D3D3D3" size={18} />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <ErrorText text={errors['confirmPassword']} />
        )}
      </div>

      <div className="mt-3 flex justify-center gap-2">
        <button
          name="cancel button"
          onClick={handleCancel}
          className="duration-450 flex h-10 w-32 cursor-pointer items-center justify-center rounded-md border border-solid border-accent text-accent transition hover:bg-accent hover:text-white dark:text-white ">
          {' '}
          cancel
        </button>
        <button
          name="save button"
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

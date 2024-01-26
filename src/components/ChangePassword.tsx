'use client'
import CircularProgressIcon from '@/assets/icons/circularProgress'
import { useInterceptor } from '@/hooks/interceptors'
import { updateUserPassword } from '@/services/user'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { useSelector } from 'react-redux'

interface userDataProps {
  oldPassword: string
  newPassword: string
}
interface ChangePasswordProps {
  setOpenPasswordDialog: (arg0: boolean) => void
}

function ChangePassword({ setOpenPasswordDialog }: ChangePasswordProps) {
  const [userData, setUserData] = useState<userDataProps>({
    oldPassword: '',
    newPassword: '',
  })

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

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
      setOpenPasswordDialog(false)
    }
  }

  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Change Password</h1>
      <div className="flex flex-col gap-4">
        <div className="border-grey-700 flex w-full rounded-lg border border-solid">
          <input
            type={showOldPassword ? 'text' : 'password'}
            id="oldPassword"
            value={userData.oldPassword}
            placeholder="Old Password"
            // onChange={handleOldPasswordChange}
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

        <div className="border-grey-700 flex w-full rounded-lg border border-solid">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            value={userData.newPassword}
            placeholder="New Password"
            // onChange={handleNewPasswordChange}
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

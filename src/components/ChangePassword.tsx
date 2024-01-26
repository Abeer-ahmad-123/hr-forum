import CircularProgressIcon from '@/assets/icons/circularProgress'
import { Eye, EyeOff } from 'lucide-react'
import { useRef, useState } from 'react'

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOldPassword(event.target.value)
  }

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewPassword(event.target.value)
  }

  const toggleShowOldPassword = () => {
    setShowOldPassword((prevShow) => !prevShow)
  }

  const toggleShowNewPassword = () => {
    setShowNewPassword((prevShow) => !prevShow)
  }

  const handleCancelClick = () => {}

  const handleSaveClick = () => {}

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Change Password</h1>
      <div className="flex flex-col gap-4">
        <div className="border-grey-700 flex w-full rounded-lg border border-solid">
          <input
            type={showOldPassword ? 'text' : 'password'}
            id="oldPassword"
            value={oldPassword}
            placeholder="Old Password"
            onChange={handleOldPasswordChange}
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
            value={newPassword}
            placeholder="New Password"
            onChange={handleNewPasswordChange}
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
          onClick={handleCancelClick}
          className="duration-450 flex h-10 w-32 cursor-pointer items-center justify-center rounded-md border border-solid border-accent text-accent transition hover:bg-accent hover:text-white ">
          {' '}
          cancel
        </button>
        <button
          onClick={handleSaveClick}
          className={`flex h-10 w-32 cursor-pointer items-center justify-center rounded-md 
        text-white   ${false ? 'bg-gray-300' : 'bg-accent'}
          `}>
          Save{' '}
          {false ? (
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

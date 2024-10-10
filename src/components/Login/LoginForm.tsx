import { Label } from '@radix-ui/react-dropdown-menu'
import InputField from '../shared/InputField'
import CircularProgressIcon from '@/assets/icons/circularProgress'
import PasswordEyeIcon from '@/assets/icons/PasswordEyeIcon'
import { EyeClosedIcon } from '@/assets/icons'
import { useState } from 'react'

export function LoginForm({
  formValues,
  errors,
  handleInputChange,
  handleLoginSubmit,
  loading,
}: any) {
  const { email, password } = formValues
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassowrd = () => {
    setShowPassword((prev) => !prev)
  }
  return (
    <form className="mt-6" onSubmit={handleLoginSubmit}>
      <Label className="pb-2 text-sm font-normal">Email</Label>
      <InputField
        error={errors['email']}
        name="email"
        value={email}
        placeholder="xyz@example.com"
        onChange={handleInputChange}
      />
      <Label className="pb-2 text-sm font-normal">Password</Label>

      <div className="flex items-center rounded-xl border border-[#d3d3d3] dark:border-bg-tertiary-dark ">
        <input
          className="focus:border-primary-purple  focus:ring-primary-purple mx-0 block w-full rounded-xl    px-4 py-2 font-[300] focus:outline-none dark:bg-bg-primary-dark dark:text-white"
          name="password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          placeholder="Your password"
          onChange={handleInputChange}
        />
        {showPassword ? (
          <PasswordEyeIcon
            onClick={handleShowPassowrd}
            className="ml-2 mr-4 cursor-pointer text-gray-500 hover:text-gray-700"
          />
        ) : (
          <EyeClosedIcon
            onClick={handleShowPassowrd}
            className="ml-2 mr-4 cursor-pointer text-gray-500 hover:text-gray-700"
          />
        )}
      </div>

      <div className="mt-6">
        <div
          onClick={handleLoginSubmit}
          className={`flex w-full transform cursor-pointer justify-center rounded-xl bg-bg-green px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:outline-none ${
            loading && 'bg-gray-400'
          }`}>
          <p className="text-black">Login to your account</p>
          {loading ? (
            <div className="ml-2">
              <CircularProgressIcon color="gray" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </form>
  )
}

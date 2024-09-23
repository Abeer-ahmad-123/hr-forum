import CircularProgressIcon from '@/assets/icons/circularProgress'
import { Label } from '@radix-ui/react-dropdown-menu'
import PasswordEyeIcon from '@/assets/icons/PasswordEyeIcon'
import { EyeClosedIcon } from '@/assets/icons'
import GoogleButton from '../shared/GoogleButton'
import { usePathname, useRouter } from 'next/navigation'
import { InputField } from '../shared'
import { useState } from 'react'
import { googleAuthStart } from '@/services/auth/authService'

export default function RegisterForm({
  formValues,
  handleInputChange,
  errors,
  loading,
  handleSignupSubmit,
}: any) {
  const { name, username, email, password } = formValues
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassowrd = () => {
    setShowPassword((prev) => !prev)
  }
  const pathname = usePathname()
  const router = useRouter()
  const handleGoogleSignUp = async () => {
    try {
      const response = await googleAuthStart(pathname)
      if (response?.success) {
        router.push(response?.data)
      }
    } catch (err) {}
  }
  return (
    <form className="">
      <Label className="pb-2 text-sm font-normal">Full name</Label>
      <InputField
        error={errors['name']}
        name="name"
        placeholder="name"
        value={name}
        onChange={handleInputChange}
      />
      <Label className="pb-2 text-sm font-normal">Username</Label>
      <InputField
        error={errors['username']}
        name="username"
        placeholder="username"
        value={username}
        onChange={handleInputChange}
      />
      <Label className="pb-2 text-sm font-normal">Email</Label>
      <InputField
        error={errors['email']}
        name="email"
        placeholder="email"
        value={email}
        onChange={handleInputChange}
      />
      <Label className="pb-2 text-sm font-normal">Password</Label>

      <div className="flex items-center rounded-xl border border-[#d3d3d3] dark:border-bg-tertiary-dark ">
        <input
          className="focus:border-primary-purple focus:ring-primary-purple mx-0 block w-full rounded-xl    px-4 py-2 font-[300] focus:outline-none dark:bg-bg-primary-dark dark:text-white"
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
      {/* <InputField
        type="password"
        error={errors['password']}
        name="password"
        placeholder="password"
        value={password}
        onChange={handleInputChange}
      /> */}
      <div className="mt-6">
        <div
          onClick={handleSignupSubmit}
          className={`flex w-full transform cursor-pointer justify-center rounded-xl bg-bg-green px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:outline-none ${
            loading && 'bg-gray-400'
          }`}>
          <p className="text-black">Create account</p>
          {loading ? (
            <div className="ml-2">
              <CircularProgressIcon color="gray" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="mb-3 mt-6 flex items-center justify-center">
        <div className="border-[#F4F4F5]-300 flex-grow border-t dark:border-bg-tertiary-dark"></div>
        <span className="mx-3 text-[12px] text-[#71717A]">OR</span>
        <div className="border-[#F4F4F5]-300 flex-grow border-t dark:border-bg-tertiary-dark"></div>
      </div>

      <div className="cursor-pointer">
        <GoogleButton title={'Sign Up'} onClick={handleGoogleSignUp} />
      </div>
    </form>
  )
}

export function LoginLink({ onClick }: any) {
  return (
    <p className="text-center text-xs font-light text-gray-700 dark:text-white">
      Already have an account?
      <a
        className="text-primary-purple cursor-pointer font-medium hover:underline"
        onClick={onClick}>
        {' '}
        Sign in
      </a>
    </p>
  )
}

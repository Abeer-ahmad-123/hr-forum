import Link from 'next/link'
import InputField from '../shared/InputField'
import { CustomLink } from '../shared/customLink/CustomLink'
import CircularProgressIcon from '@/assets/icons/circularProgress'

export function SigninForm({
  formValues,
  errors,
  handleInputChange,
  handleLoginSubmit,
  loading,
}: any) {
  const { email, password } = formValues
  return (
    <form className="mt-6" onSubmit={handleLoginSubmit}>
      <InputField
        error={errors['email']}
        name="email"
        value={email}
        placeholder="email"
        onChange={handleInputChange}
      />
      <InputField
        error={errors['password']}
        name="password"
        value={password}
        type="password"
        placeholder="password"
        onChange={handleInputChange}
      />
      <CustomLink
        className="text-primary-purple text-xs hover:underline dark:text-white"
        href="#">
        Forget Password?
      </CustomLink>
      <div className="mt-6">
        <div
          onClick={handleLoginSubmit}
          className={`flex w-full transform cursor-pointer justify-center rounded-xl bg-accent px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:outline-none ${
            loading && 'bg-gray-400'
          }`}>
          <p>Sign in</p>
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

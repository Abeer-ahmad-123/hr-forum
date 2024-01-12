import CircularProgressIcon from '@/assets/icons/circularProgress'
import { InputField } from '../shared'

export default function SignupForm({
  formValues,
  handleInputChange,
  errors,
  loading,
  handleSignupSubmit,
}: any) {
  const { name, username, email, password } = formValues

  return (
    <form className="mt-6" onSubmit={handleSignupSubmit}>
      <InputField
        error={errors['name']}
        name="name"
        placeholder="name"
        value={name}
        onChange={handleInputChange}
      />
      <InputField
        error={errors['username']}
        name="username"
        placeholder="username"
        value={username}
        onChange={handleInputChange}
      />

      <InputField
        error={errors['email']}
        name="email"
        placeholder="email"
        value={email}
        onChange={handleInputChange}
      />
      <InputField
        type="password"
        error={errors['password']}
        name="password"
        placeholder="password"
        value={password}
        onChange={handleInputChange}
      />
      <div className="">
        <button
          className={`flex w-full transform justify-center rounded-xl bg-accent px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:outline-none ${
            loading && 'bg-gray-400'
          }`}
          type="submit">
          <p>Sign up</p>
          {loading ? (
            <div className="ml-2">
              <CircularProgressIcon color="gray" />
            </div>
          ) : (
            <></>
          )}
        </button>
      </div>
    </form>
  )
}

export function LoginLink({ onClick }: any) {
  return (
    <p className="mt-2 text-center text-xs font-light text-gray-700 dark:text-white">
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

import Link from 'next/link'
import InputField  from '../shared/InputField'

export function SigninForm({
  formValues,
  errors,
  handleInputChange,
  handleLoginSubmit,
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
        placeholder="password"
        onChange={handleInputChange}
      />
      <Link
        className="text-primary-purple text-xs hover:underline dark:text-white"
        href="#"
      >
        Forget Password?
      </Link>
      <div className="mt-6">
        <button
          onClick={handleLoginSubmit}
          className="w-full transform rounded-xl bg-primary px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:outline-none "
        >
          Sign in
        </button>
      </div>
    </form>
  )
}




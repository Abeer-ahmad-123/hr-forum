import { useEffect, useRef } from 'react'
import ErrorText from './ErrorText'

const InputField = ({ label, type, error, ...otherProps }: any) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // useEffect(() => {
  //   if (inputRef.current) {
  //     if (inputRef.current.name === 'email') {
  //       inputRef.current.focus()
  //     } else if (inputRef.current.name === 'name') {
  //       inputRef.current.focus()
  //     }
  //   }
  // }, [])

  return (
    <div className="mb-2">
      <label
        htmlFor={label}
        className="block text-sm font-light text-gray-800 dark:text-white">
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        id={label}
        {...otherProps}
        className={`focus:border-primary-purple focus:ring-primary-purple mx-0 ${
          !error && 'mb-6'
        } block w-full rounded-xl border border-[#571ce0] bg-white px-4 py-2 font-[300] focus:outline-none`}
      />
      {error && <ErrorText text={error} />}
    </div>
  )
}

export default InputField

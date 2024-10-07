'use client'
import { useRef } from 'react'
import ErrorText from './ErrorText'
import clsx from 'clsx'

const InputField = ({ label, type, error, ...otherProps }: any) => {
  const inputRef = useRef<HTMLInputElement>(null)

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
        // * Added CLSX to sort tailwind classes, and dark mode properties for input field
        className={clsx(
          `focus:border-primary-purple focus:ring-primary-purple mx-0 autofill:bg-bg-primary dark:autofill:bg-bg-primary-dark  ${
            !error && 'mb-4'
          } block w-full rounded-xl border border-[#d3d3d3] bg-bg-primary px-4  py-2 font-[300] autofill:bg-bg-primary focus:outline-none dark:border-bg-tertiary-dark dark:autofill:bg-bg-primary-dark`,
          'autofill:bg-bg-primary dark:bg-bg-primary-dark dark:text-white dark:autofill:bg-bg-primary-dark ',
          otherProps.className,
        )}
      />
      {error && <ErrorText text={error} />}
    </div>
  )
}

export default InputField

import { useRef } from 'react'
import ErrorText from './ErrorText'
import clsx from 'clsx'

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
        // * Added CLSX to sort tailwind classes, and dark mode properties for input field
        className={clsx(
          `focus:border-primary-purple focus:ring-primary-purple mx-0 ${
            !error && 'mb-6'
          } block w-full rounded-xl border border-[#d3d3d3] bg-white px-4 py-2 font-[300] focus:outline-none`,
          'dark:bg-dark-background dark:text-white',
          otherProps.className,
        )}
      />
      {error && <ErrorText text={error} />}
    </div>
  )
}

export default InputField

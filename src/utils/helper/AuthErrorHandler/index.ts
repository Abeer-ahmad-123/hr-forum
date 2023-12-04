import { isEmpty, isValidEmail, isValidUserName } from '..'

const stringLengthText = (min: any) => {
  let stringLength = 'The Minimum length should be min_value.'
  return stringLength.replace('min_value', min)
}

const handleAuthError = (name: any, value: any) => {
  let isRequired = isEmpty(value, name)

  if (isRequired) return { name, message: isRequired }

  switch (name) {
    case 'username':
      if (!isValidUserName(value)) {
        return { name, message: 'username cannot have special characters' }
      }
      break
    case 'email':
      if (!isValidEmail(value)) {
        return { name, message: 'Please enter a valid email' }
      }
      break

    case 'password':
      if (value.length < 8) {
        return { name, message: stringLengthText(8) }
      }
      break

    default:
      return
  }
}
export { handleAuthError }

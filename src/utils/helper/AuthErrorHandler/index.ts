import { isEmpty, isValidEmail, isValidUserName } from '..'

const stringLengthText = (min: any) => {
  let stringLength = 'The Minimum length should be min_value.'
  return stringLength.replace('min_value', min)
}

const handleAuthError = (name: any, value: any) => {
  let isRequired = isEmpty(value, name)

  if (isRequired) return { name, message: isRequired }

  switch (name) {
    case 'name':
      if ((value as string).length > 64) {
        return { name, message: "name must not exceed 64 characters" }
      }
      break;

    case 'username':
      const { valid, message } = isValidUserName(value)
      if (!valid) {
        return { name, message }
      }
      break;

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

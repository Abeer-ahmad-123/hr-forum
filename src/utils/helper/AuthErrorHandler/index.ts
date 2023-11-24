import { isEmpty, isValidEmail } from '..'

const stringLengthText = (min:any, max:any) => {
  let stringLength =
    'The Minimum length should be min_value and Maximum lenght should be max_value'
  return stringLength.replace('min_value', min).replace('max_value', max)
}

const handleAuthError = (name:any, value:any) => {
  let isRequired = isEmpty(value, name)

  if (isRequired) return { name, message: isRequired }

  switch (name) {
    case 'name':
      if (value.length < 2 || value.length > 64) {
        return { name, message: stringLengthText(2, 64) }
      }
      break

    case 'username':
      if (value.length < 3 || value.length > 32) {
        return { name, message: stringLengthText(3, 32) }
      }
      break

    case 'email':
      if (!isValidEmail(value)) {
        return { name, message: 'Please enter a valid email' }
      }
      break

    case 'password':
      if (value.length < 8 || value.length > 32) {
        return { name, message: stringLengthText(8, 32) }
      }
      break

    default:
      return
  }
}
export { handleAuthError }

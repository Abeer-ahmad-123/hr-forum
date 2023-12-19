import { toast } from 'react-toastify'
const isEmpty = (value, name) => {
  if (value) return false
  else return `${name} is required*.`
}

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const isValidEmail = emailRegex.test(email)
  return isValidEmail
}

const showErrorAlert = (title) => {
  toast.error(title, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
  })
}

const showSuccessAlert = (title) => {
  toast.success(title, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
  })
}

const timeFormatInDateMonth = (d) => {
  const date = new Date(d)
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const monthIndex = date.getMonth()
  const monthName = monthNames[monthIndex]
  const day = date.getDate()
  return `${monthName} ${day}`
}

const timeFormatInHours = (timestamp) => {
  const currentDate = new Date()
  const date = new Date(timestamp)
  const dateMonth = timeFormatInDateMonth(timestamp)

  const timeDifferenceInMilliseconds = currentDate - date

  const hoursAgo = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60))

  if (hoursAgo < 1) {
    const minutesAgo = Math.floor(timeDifferenceInMilliseconds / (1000 * 60))
    return minutesAgo > 1
      ? `${dateMonth} (${minutesAgo} mints ago)`
      : ` ${dateMonth} (1 mint ago)`
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`
  } else {
    const daysAgo = Math.floor(hoursAgo / 24)
    return daysAgo > 1
      ? `${dateMonth} (${daysAgo} days ago)`
      : `${dateMonth} (1 day ago)`
  }
}
const isValidUserName = (userName) => {
  const userNameRegex = /^[a-zA-Z0-9]{1,}$/
  const isValidUserName = userNameRegex.test(userName)
  return isValidUserName
}

export {
  isEmpty,
  isValidEmail,
  showErrorAlert,
  showSuccessAlert,
  timeFormatInHours,
  isValidUserName,
}

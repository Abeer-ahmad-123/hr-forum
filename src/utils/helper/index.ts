import { toast } from 'react-toastify'
const isEmpty = (value: string, name: string) => {
  if (value) return false
  else return `${name} is required*.`
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const isValidEmail = emailRegex.test(email)
  return isValidEmail
}

const showErrorAlert = (title: string) => {
  toast.error(title, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  })
}

const showSuccessAlert = (title: string) => {
  toast.success(title, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  })
}

const timeFormatInDateMonth = (d: Date) => {
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

const timeFormatInHours = (timestamp: Date) => {
  const currentDate = new Date()
  const date = new Date(timestamp)
  const dateMonth = timeFormatInDateMonth(timestamp)

  const timeDifferenceInMilliseconds = currentDate.getTime() - date.getTime()

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
const isValidUserName = (userName: string) => {
  const userNameRegex = /^[a-zA-Z0-9]{1,}$/
  const isValidUserName = userNameRegex.test(userName)
  return isValidUserName
}

export {
  isEmpty,
  isValidEmail,
  isValidUserName,
  showErrorAlert,
  showSuccessAlert,
  timeFormatInHours,
}

export const ConvertDate = (date: string) => {
  const providedDateTime = new Date(date)
  const currentDateTime = new Date()
  const timeDifference = currentDateTime.getTime() - providedDateTime.getTime()

  // Convert the time difference to days, hours, and minutes
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const hoursAgo = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutesAgo = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
  )

  // Return the result

  if (daysAgo > 0) {
    return daysAgo === 1 ? '1 day ago' : `${daysAgo}d ago`
  } else if (hoursAgo > 0) {
    return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo}h ago`
  } else if (minutesAgo > 0) {
    return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo}min ago`
  } else {
    return 'just now'
  }
}

export function FormatCreatedAt(created_at: string | number | Date): string {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  } as const

  // Parse the date string into a Date object if it's a string
  const date =
    typeof created_at === 'string' ? new Date(created_at) : created_at

  // Format the date using the specified options
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

  return formattedDate
}

// Example usage:

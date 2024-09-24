import { toast } from 'react-toastify'
import { PostsInterface } from '../interfaces/posts'
import { CommentObject } from '../interfaces/feeds'
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
  const dateMonth = timeFormatInDateMonth(timestamp) // Assuming this returns a formatted date string.

  const timeDifferenceInMilliseconds = currentDate.getTime() - date.getTime()
  const minutesAgo = Math.floor(timeDifferenceInMilliseconds / (1000 * 60))
  const hoursAgo = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60))
  const daysAgo = Math.floor(hoursAgo / 24)
  const weeksAgo = Math.floor(daysAgo / 7)
  const monthsAgo = Math.floor(daysAgo / 30)

  if (hoursAgo < 1) {
<<<<<<< HEAD
    return minutesAgo > 1 ? `${minutesAgo} minutes ago` : `1m ago`
  } else if (hoursAgo < 24) {
    return hoursAgo > 1 ? `${hoursAgo} hours ago` : `1 hour ago`
  } else if (daysAgo < 7) {
    return daysAgo > 1 ? `${daysAgo} days ago` : `1 day ago`
  } else if (daysAgo < 30) {
    return weeksAgo > 1 ? `${weeksAgo} weeks ago ` : `1 week ago`
  } else {
    return monthsAgo > 1 ? `${monthsAgo} months ago ` : `1 month ago`
=======
    return minutesAgo > 1 ? `( ${minutesAgo} minutes ago )` : `1m ago`
  } else if (hoursAgo < 24) {
    return hoursAgo > 1 ? `( ${hoursAgo} hours ago )` : `1 hour ago`
  } else if (daysAgo < 7) {
    return daysAgo > 1 ? `( ${daysAgo} days ago )` : `1 day ago`
  } else if (daysAgo < 30) {
    return weeksAgo > 1 ? `( ${weeksAgo} weeks ago )` : `1 week ago`
  } else {
    return monthsAgo > 1 ? `( ${monthsAgo} months ago )` : `1 month ago`
>>>>>>> code-refactoring
  }
}

/**
 *
 * @param userName Takes the string and checks for validations.
 *
 * @description
 * Current validations:
 *
 *  - Special Character
 *
 *  - max = 32 length.
 *
 *  - min = 1 length.
 * @returns {boolean} valid
 * valid = true, the username is valid.
 * valid  false, the username is invalid.
 *
 * @returns {string | null} message
 * message != null, then there is some error and the message represents the error message.
 */
const isValidUserName = (userName: string) => {
  const userNameRegex = /^[a-zA-Z0-9]{1,}$/
  const isValidUserName = userNameRegex.test(userName)

  /**
   * if there is no special character in username and username has some character entered, then proceed to check 32 length
   *
   */
  if (isValidUserName) {
    if (userName.length > 32) {
      return {
        valid: false,
        message: 'username should not exceed 32 characters',
      }
    } else {
      return { valid: true, message: null }
    }
  } else
    return {
      valid: isValidUserName,
      message: 'username cannot have special characters',
    }
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
    return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`
  } else if (hoursAgo > 0) {
    return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`
  } else if (minutesAgo > 0) {
    return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} mins ago`
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

export const updatePostBookmark = (
  posts: PostsInterface[],
  postId: number,
  val: boolean,
) => {
  return posts.map((post: any) => {
    if (post.id === Number(postId)) {
      return { ...post, user_has_bookmarked: val }
    }
    return post
  })
}
export const returnFilteredPosts = (
  storePosts: PostsInterface[],
  id: number,
) => {
  return storePosts.filter((post: PostsInterface) => {
    return post.id !== id
  })
}

export const makeCommentNumberKeyValuePair = (posts: any) => {
  let commentObj: CommentObject = {}
  if (posts?.length) {
    for (const item of posts) {
      commentObj[item?.id] = item?.total_comments
    }
  }
  return commentObj
}

export const makeCommentNumberKeyValuePairFromSummary = (posts: any) => {
  let commentObj: any = {}
  if (posts.length) {
    for (const item of posts) {
      commentObj[item.post.id] = item.post.total_comments
    }
  }
  return commentObj
}

export const capitalizeWord = (str: string) => {
  return str
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const filterIdFromName = (str: string) => {
  let parts = str.split('-')
  parts.pop()
  return parts.join('-')
}

'use client'
import { InputField } from '@/components/shared'
import { useInterceptor } from '@/hooks/interceptors'
import { updateUserDetails } from '@/services/user'
import { setUserData } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
interface userDataProps {
  name: string
  email: string
  bio: string
}

interface EditPageProps {
  userData: userDataProps
  handleCloseDialog: () => void
  setUpdatedUserData: (userData: userDataProps) => void
}

const EditPage = ({
  userData,
  handleCloseDialog,
  setUpdatedUserData,
}: EditPageProps) => {
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState(userData)
  const originalData = useMemo(() => {
    return JSON.stringify(userData)
  }, [userData])
  const isContentChanged = useMemo(() => {
    return JSON.stringify(userDetails) !== originalData
  }, [userDetails, originalData])
  const router = useRouter()
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const refreshToken =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const { customFetch } = useInterceptor()

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setUserDetails({ ...userDetails, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      /**
       * Validate input for errors
       */
      let firstErrorObject = null
      /**
       * Find the very first error and stop there.
       */
      Object.keys(userDetails).find((obj) => {
        const errors = handleAuthError(
          obj,
          userDetails[obj as keyof userDataProps],
        )
        if (errors) {
          firstErrorObject = { name: errors.name, message: errors.message }
          return true
        } else {
          /**
           * If there are no errors in name, email then check bio
           */
          if (obj === 'bio' && (userDetails[obj] as string).length > 256) {
            firstErrorObject = {
              name: obj,
              message: 'bio must not exceed 256 characters',
            }
            return true
          }
        }
      })

      /**
       * If error, then no submission
       */
      if (firstErrorObject) {
        showErrorAlert(
          (firstErrorObject as { name: string; message: string }).message,
        )
      } else {
        const response = await updateUserDetails(
          customFetch,
          token,
          refreshToken,
          userDetails,
        )
        if (!response?.success) return router.push('/feeds')

        dispatch(setUserData({ userData: response?.data }))
        setUpdatedUserData(response?.data)
        /**
         * Close the dialog on successful change
         */
        handleCloseDialog()
        showSuccessAlert('Profile updated')
      }
    } catch (err) {
      showErrorAlert(`${err}`)
    }
  }

  return (
    <div>
      <h3 className="mb-3 text-left text-lg font-bold dark:text-white">
        Edit your personal info
      </h3>
      <div>
        <h4 className="mb-3 text-left text-sm  dark:text-white">Name</h4>
        <InputField
          name="name"
          placeholder="name"
          value={userDetails?.name}
          onChange={handleChange}
        />
        <h4 className="mb-3 text-left text-sm  dark:text-white">Email</h4>
        <InputField
          name="email"
          placeholder="email"
          value={userDetails?.email}
          onChange={handleChange}
        />
        <h4 className="mb-3 text-left text-sm  dark:text-white">Bio</h4>
        <textarea
          name="bio"
          placeholder="bio"
          // * Added dark mode classes above changes are of prettier
          className="font-sans w-full rounded-lg border border-[#571ce0] p-4 font-light ring-1 ring-gray-200 dark:bg-dark-background dark:text-white"
          value={userDetails?.bio}
          onChange={handleChange}
        />
      </div>
      <button
        name="update button"
        onClick={handleSubmit}
        disabled={!isContentChanged}
        className="mb-1 mt-2 w-full rounded bg-accent px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none sm:mr-2 disabled:opacity-60 disabled:cursor-not-allowed">
        Update
      </button>
    </div>
  )
}

export default EditPage

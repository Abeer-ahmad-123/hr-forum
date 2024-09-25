'use client'
import { InputField } from '@/components/shared'
import { useInterceptor } from '@/hooks/interceptors'
import { updateUserDetails } from '@/services/user'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { getTokens, setValueToLocalStoage } from '@/utils/local-stroage'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Tokens } from './shared/Card'
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
  // const dispatch = useDispatch()

  const [userDetails, setUserDetails] = useState(userData)
  const [tokens, setTokens] = useState<Tokens>({
    accessToken: '',
    refreshToken: '',
  })

  const router = useRouter()

  const originalData = useMemo(() => {
    return JSON.stringify(userData)
  }, [userData])

  const isContentChanged = useMemo(() => {
    return JSON.stringify(userDetails) !== originalData
  }, [userDetails, originalData])

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
          tokens.accessToken,
          tokens.refreshToken,
          userDetails,
        )
        if (!response?.success) return router.push('/feeds')

        // dispatch(setUserData({ userData: response?.data }))
        setValueToLocalStoage('userData', response?.data)
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

  useEffect(() => {
    const storedTokens = getTokens()
    if (storedTokens) {
      setTokens((prevTokens) => ({
        ...prevTokens,
        accessToken: storedTokens?.accessToken,
        refreshToken: storedTokens?.refreshToken,
      }))
    }
  }, [])
  return (
    <div>
      <h3 className="mb-3 text-left text-lg font-bold dark:text-white">
        Edit your personal info
      </h3>
      <div>
        <h4 className="mb-3 mt-5 text-left text-sm font-medium  dark:text-white">
          Full Name
        </h4>
        <InputField
          name="name"
          placeholder="Full name"
          value={userDetails?.name}
          onChange={handleChange}
        />
        <h4 className="mb-3 text-left text-sm font-medium  dark:text-white">
          Email Address
        </h4>
        <InputField
          name="email"
          placeholder="Email Address"
          value={userDetails?.email}
          onChange={handleChange}
        />
        <h4 className="mb-3 text-left text-sm font-medium  dark:text-white">
          Bio
        </h4>
        <textarea
          name="bio"
          placeholder="Tallk about yourself..."
          // * Added dark mode classes above changes are of prettier
          className="min-h-[156px] w-full  rounded-lg border border-[#d3d3d3]  p-4 outline-[#d3d3d3] dark:border-bg-tertiary-dark  dark:bg-bg-primary-dark  dark:text-white dark:outline-bg-tertiary-dark"
          value={userDetails?.bio}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-end gap-3">
        <button
          name="cancel button"
          onClick={handleCloseDialog}
          disabled={!isContentChanged}
          className="mb-1 mt-2 h-[40px] w-[127px] rounded-md border border-[#F4F4F5] bg-bg-primary px-4 py-2 text-sm font-semibold text-black outline-none     transition-all  duration-150 ease-linear hover:shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#202020] dark:bg-bg-primary-dark dark:text-white sm:mr-2">
          Cancel
        </button>
        <button
          name="update button"
          onClick={handleSubmit}
          disabled={!isContentChanged}
          className="mb-1 mt-2 h-[40px] w-[127px] rounded-md bg-bg-green px-4 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:mr-2">
          Update
        </button>
      </div>
    </div>
  )
}

export default EditPage

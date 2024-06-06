'use client'
import { InputField } from '@/components/shared'
import { useInterceptor } from '@/hooks/interceptors'
import { updateUserDetails } from '@/services/user'
import { setUserData } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert } from '@/utils/helper'
import { handleAuthError } from '@/utils/helper/AuthErrorHandler'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
  const [userDetails, setUserDetails] = useState(userData);
  const router = useRouter()
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const refreshToken =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const { customFetch } = useInterceptor()

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (!name) console.warn("Changing state for some undefined key. Please check the input tags for key='name' ")
    setUserDetails({ ...userDetails, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      /**
       * Validate input for errors
       */
      let firstErrorObject = null;
      /**
       * Find the very first error and stop there.
       */
      Object.keys(userDetails).find((obj: any) => {
        const errors = handleAuthError(obj, (userDetails as any)[obj]);
        if (errors) {
          firstErrorObject = { name: errors.name, message: errors.message }
          return true;
        }
        /**
         * If there are no errors in name, email then check bio
         */
        else {
          if (obj === 'bio' && ((userDetails as any)[obj] as string).length > 256) {
            firstErrorObject = { name: obj, message: "bio must not exceed 256 characters" }
            return true;
          }
        }
      });

      /**
       * If error, then no submission
       */
      if (firstErrorObject) {
        throw new Error((firstErrorObject as { name: string, message: string }).message)
      }
      else {
        const response = await updateUserDetails(
          customFetch,
          token,
          refreshToken,
          userDetails,
        )
        if (response?.success) {
          dispatch(setUserData({ userData: response?.data }))
          setUpdatedUserData(response?.data);
          /**
           * Close the dialog on successful change
           */
          handleCloseDialog()
        } else {
          router.push('/feeds')
        }
      }
    } catch (err) {
      showErrorAlert(`${err}`)
    }
    /**
     * This will close every-time so we don't want to close every-time even on errors.
     */
    // finally {
    //   handleCloseDialog()
    // }
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
          className="font-sans w-full rounded-lg border border-[#571ce0] p-4 font-light ring-1 ring-gray-200"
          value={userDetails?.bio}
          onChange={handleChange}
        />
      </div>
      <button
        name="update button"
        onClick={handleSubmit}
        className="mb-1 mt-2 w-full rounded bg-accent px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none sm:mr-2">
        Update
      </button>
    </div>
  )
}

export default EditPage

'use client'
import { InputField } from '@/components/shared'
import { useInterceptor } from '@/hooks/interceptors'
import { updateUserDetails } from '@/services/user'
import { setUserData } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert } from '@/utils/helper'
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
  const [userDetails, setUserDetails] = useState(userData)
  const router = useRouter()
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const refreshToken =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const { customFetch } = useInterceptor()

  const handleChange = (e: any) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const response = await updateUserDetails(
        customFetch,
        token,
        refreshToken,
        userDetails,
      )

      if (response?.success) {
        dispatch(setUserData({ userData: response?.data }))

        setUpdatedUserData(response?.data)
      } else {
        router.push('/feeds')
      }
    } catch (err) {
      showErrorAlert(`${err}`)
    } finally {
      handleCloseDialog()
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
          className="w-full rounded-lg border border-[#571ce0] p-4 font-sans font-light ring-1 ring-gray-200"
          value={userDetails?.bio}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mb-1 mt-2 w-full rounded bg-accent px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none sm:mr-2">
        Update
      </button>
    </div>
  )
}

export default EditPage

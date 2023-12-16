'use client'
import { InputField } from '@/components/shared'
import { updateUserDetails } from '@/services/user'
import { setUser, setUserData } from '@/store/Slices/loggedInUserSlice'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
interface userDataProps {
  name: string
  email: string
  bio: string
}
interface EditPageProps {
  userData: userDataProps
  handleCloseDialog: () => void
}
const EditPage = ({ userData, handleCloseDialog }: EditPageProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [userDetails, setUserDetails] = useState(userData)
  const token = useSelector((state) => state?.loggedInUser?.token)
  const handleChange = (e: any) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const response = await updateUserDetails(token, userDetails)
      if (response?.success) {
        dispatch(setUserData({ userData: response?.data }))
        router.push('/profile')
      }
    } catch (err) {
      throw err
    } finally {
      handleCloseDialog()
    }
  }

  return (
    <div>
      <h3 className="mb-3 text-left text-lg font-bold">
        Edit your personal info
      </h3>
      <div>
        <h4 className="mb-3 text-left text-sm ">Name</h4>
        <InputField
          name="name"
          placeholder="name"
          value={userDetails?.name}
          onChange={handleChange}
        />
        <h4 className="mb-3 text-left text-sm ">Email</h4>
        <InputField
          name="email"
          placeholder="email"
          value={userDetails?.email}
          onChange={handleChange}
        />
        <h4 className="mb-3 text-left text-sm ">Bio</h4>
        <textarea
          name="bio"
          placeholder="bio"
          className="w-full rounded-lg p-4 font-sans font-light ring-1 ring-gray-200"
          value={userDetails?.bio}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mb-1 mt-2 w-full rounded bg-accent px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600 sm:mr-2">
        Update
      </button>
    </div>
  )
}

export default EditPage

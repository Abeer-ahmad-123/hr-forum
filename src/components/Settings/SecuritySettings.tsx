import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingIndicator } from '@/store/Slices/loadingIndicator'
import { EyeClosedIcon, EyeOpenIcon, WarningIcon } from '@/assets/icons'
// import { LoadingIndicator } from '../shared'
import { updatePassword } from '@/services/auth/authService'

const SecuritySettings = () => {
  // const dispatch = useDispatch()
  // const intitialValues = {
  //   oldPassword: '',
  //   newPassword: '',
  //   confirmPassword: '',
  // }
  // const loading = useSelector((state: any) => state.loadingIndicator.isLoading)

  // const [formValues, setFormValues] = useState(intitialValues)
  // const [showPassword, setShowPassword] = useState(false)
  // const handleFormValues = (e) => {
  //   const { name, value } = e.target
  //   setFormValues({ ...formValues, [name]: value })
  // }
  // const handleShowPassword = () => {
  //   setShowPassword(!showPassword)
  // }
  // const hideLoadingIndicator = () => {
  //   dispatch(setLoadingIndicator(false))
  // }
  // const onSubmit = async () => {
  //   try {
  //     const { oldPassword, newPassword } = formValues
  //     dispatch(setLoadingIndicator(true))
  //     let res = await updatePassword({ newPassword, oldPassword })
  //     hideLoadingIndicator()
  //     setFormValues(intitialValues)
  //   } catch (err) {
  //     hideLoadingIndicator()
  //     console.log('err', err)
  //   }
  // }
  // const returnEye = () => {
  //   return showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />
  // }
  return (
    <></>
    // <div className="mt-[50px] flex flex-col gap-[20px] rounded-[16px] bg-white p-[24px] shadow-cmd dark:bg-dark-primary">
    //   <div className="relative">
    //     <input
    //       name="oldPassword"
    //       className="h-[40px] w-full rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
    //       placeholder="Old Password"
    //       onChange={handleFormValues}
    //     />

    //     <div
    //       className="absolute right-[20px] top-[9px] w-[23px] cursor-pointer rounded-full p-[4px] hover:bg-gray-100 "
    //       onClick={handleShowPassword}>
    //       {returnEye()}
    //     </div>
    //   </div>

    //   <div className="relative">
    //     <input
    //       name="newPassword"
    //       className="h-[40px] w-full rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
    //       placeholder="New Password"
    //       onChange={handleFormValues}
    //     />
    //     <div
    //       className="absolute right-[20px] top-[9px] w-[23px] cursor-pointer rounded-full p-[4px] hover:bg-gray-100 "
    //       onClick={handleShowPassword}>
    //       {returnEye()}
    //     </div>
    //   </div>

    //   <div className="flex ">
    //     <div className="mr-[6px] w-[16px] ">
    //       <WarningIcon />
    //     </div>

    //     <p className="text-xs text-slate-500">Password must be minimum 6+</p>
    //   </div>

    //   <div className="relative">
    //     <input
    //       name="confirmPassword"
    //       className="h-[40px] w-full rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
    //       placeholder="Confirm Password"
    //       onChange={handleFormValues}
    //     />
    //     <div
    //       className="absolute right-[20px] top-[9px] w-[23px] cursor-pointer rounded-full p-[4px] hover:bg-gray-100 "
    //       onClick={handleShowPassword}>
    //       {returnEye()}
    //     </div>
    //   </div>

    //   <div className="flex justify-end">
    //     <button
    //       onClick={onSubmit}
    //       className="flex w-fit justify-center rounded-[12px] bg-primary  px-6 py-2 font-medium text-white  hover:bg-opacity-90">
    //       {/* {loading ? <LoadingIndicator /> : 'Save Changes'} */}
    //     </button>
    //   </div>
    // </div>
  )
}

export default SecuritySettings

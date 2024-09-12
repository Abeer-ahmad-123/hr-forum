'use client'
import { Suspense } from 'react'
import FeaturesDropDown from '../Navbar/FeaturesDropdown'
import Skelton from '../ui/skelton'
import CustomAccordion from '../CustomAccordion'

const RespScreen = () => {
  return (
    <div className="max-md: hidden w-full max-md:block max-[640px]:mt-3">
      <Suspense fallback={<Skelton className="h-8 w-[300px] bg-skelton" />}>
        <FeaturesDropDown
          classNameOuter="w-[300px] max-md:w-full"
          classNameInner="w-[300px] max-md:w-full "
          classNamefeaturesDropDowm="w-[300px]"
        />
        <CustomAccordion />
      </Suspense>
    </div>
  )
}
export default RespScreen

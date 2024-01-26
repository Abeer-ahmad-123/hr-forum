'use client'
import { Suspense } from 'react'
import FeaturesDropDown from '../Navbar/FeaturesDropdown'
import Skelton from '../ui/skelton'

const RespScreen = () => {
  return (
    <div className="hidden max-md:block">
      <Suspense fallback={<Skelton className="w-[300px h-8 bg-skelton" />}>
        <FeaturesDropDown
          classNameOuter="w-[300px] bg-white"
          classNameInner="w-[300px]"
          classNamefeaturesDropDowm="w-[300px]"
        />
      </Suspense>
    </div>
  )
}
export default RespScreen

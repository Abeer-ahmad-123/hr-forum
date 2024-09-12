import { Suspense } from 'react'
import FeaturesDropDown from '../Navbar/FeaturesDropdown'
import Skelton from '../ui/skelton'

const FeaturesDropDownWithSuspense = () => {
  return (
    <div className="max-md: hidden w-full max-md:block max-[640px]:mt-3">
      <Suspense fallback={<Skelton className="h-8 w-[300px] bg-skelton" />}>
        <FeaturesDropDown
          classNameOuter="w-[300px] max-md:w-full bg-white"
          classNameInner="w-[300px] max-md:w-full "
          classNamefeaturesDropDowm="w-[300px]"
        />
      </Suspense>
    </div>
  )
}
export default FeaturesDropDownWithSuspense

import { Suspense } from 'react'
import FeaturesDropDown from '../Navbar/FeaturesDropdown'
import CustomAccordion from '../CustomAccordion'
import RespScreenLoading from '../Loading/RespScreenLoading'

const FeaturesDropDownWithSuspense = () => {
  return (
    <div className="max-md: hidden w-full max-md:block">
      <Suspense fallback={<RespScreenLoading />}>
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
export default FeaturesDropDownWithSuspense

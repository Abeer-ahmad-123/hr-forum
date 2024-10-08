import { Suspense } from 'react'
import FeaturesDropDown from '../Navbar/FeaturesDropdown'
import CustomAccordion from '../CustomAccordion'
import RespScreenLoading from '../Loading/RespScreenLoading'

const FeaturesDropDownWithSuspense = () => {
  return (
    <div className="block w-full lg:hidden">
      <Suspense fallback={<RespScreenLoading />}>
        <FeaturesDropDown
          classNameOuter="w-full md:w-full"
          classNameInner="w-full md:w-full "
          classNamefeaturesDropDowm=""
        />
        <CustomAccordion />
      </Suspense>
    </div>
  )
}
export default FeaturesDropDownWithSuspense

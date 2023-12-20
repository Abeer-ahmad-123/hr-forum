import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '@/store/Slices/colorModeSlice'
import { MoonIcon, SunIcon } from '@/assets/icons'
import { ReturnIconButton } from '@/components/shared'

const NightModeToggle = () => {
  const darkMode = useSelector((state: any) => state.colorMode.darkMode)
  const dispatch = useDispatch()

  const toggleNightMode = () => {
    dispatch(setDarkMode())
  }

  return (
    <button className="focus:outline-none" onClick={toggleNightMode}>
      <ReturnIconButton
        condition={darkMode}
        FirstIcon={MoonIcon}
        SecondIcon={SunIcon}
      />
    </button>
  )
}
export default NightModeToggle

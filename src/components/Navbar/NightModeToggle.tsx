import { MoonIcon, SunIcon } from '@/assets/icons'
import { ReturnIconButton } from '@/components/shared'
import { setDarkMode } from '@/store/Slices/colorModeSlice'
import { useTheme } from 'next-themes'
import { useDispatch, useSelector } from 'react-redux'

const NightModeToggle = () => {
  // const darkMode = useSelector((state: any) => state.colorMode.darkMode)
  const { theme, setTheme } = useTheme()
  // const dispatch = useDispatch()

  const toggleNightMode = () => {
    // dispatch(setDarkMode())
    if (theme == 'light' || theme === 'theme-default') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('light')
    }
  }

  return (
    <button
      role="button"
      aria-label="toggle night mode"
      aria-labelledby="nightModeLabel"
      name="toggle night mode button"
      className="focus:outline-none"
      onClick={toggleNightMode}>
      <ReturnIconButton
        condition={theme === 'dark'}
        FirstIcon={MoonIcon}
        SecondIcon={SunIcon}
      />
    </button>
  )
}
export default NightModeToggle

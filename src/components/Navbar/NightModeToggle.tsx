import { MoonIcon, SunIcon } from '@/assets/icons'
import { ReturnIconButton } from '@/components/shared'
import { useTheme } from 'next-themes'

const NightModeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleNightMode = () => {
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
        className='h-[18px] w-[18px] md:h-5 md:w-5'
      />
    </button>
  )
}
export default NightModeToggle

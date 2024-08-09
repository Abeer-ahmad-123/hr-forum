import { MoonIcon, SunIcon } from '@/assets/icons'
import { ReturnIconButton } from '@/components/shared'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const NightModeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleNightMode = () => {
    if (theme == 'light' || theme === 'theme-default') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('light')
    }
  }

  return isMounted ? (
    <button
      role="button"
      aria-label="toggle night mode"
      aria-labelledby="nightModeLabel"
      name="toggle night mode button"
      className="focus:outline-none"
      onClick={toggleNightMode}
    >
      <ReturnIconButton
        condition={theme === 'dark'}
        FirstIcon={MoonIcon}
        SecondIcon={SunIcon}
      />
    </button>
  ) : null
}
export default NightModeToggle

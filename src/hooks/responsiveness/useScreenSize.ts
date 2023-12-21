import { useEffect, useState } from 'react'

export function useScreenSize(size: number) {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean | number>(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= size || 1024) // You can adjust the width as needed for "large" screens
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  return { isLargeScreen }
}

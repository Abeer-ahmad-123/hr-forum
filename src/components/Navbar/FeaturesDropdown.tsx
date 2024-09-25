'use client'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import DropDownContent from '../shared/DropDownContent'
import ArrowDown from '@/assets/icons/arrowDown'
import { FeaturesDropDownInterface } from '@/utils/interfaces/dropdown'
import { getSelectedIcon } from '@/utils/functions'

const FeaturesDropDown = ({
  classNameOuter,
  classNameInner,
  classNamefeaturesDropDowm,
}: FeaturesDropDownInterface) => {
  const [selected, setSelected] = useState('Home')
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [isHydrated, setIsHydrated] = useState(false)

  const divRef: any = useRef(null)

  const pathname = usePathname()

  const setCheckFalse = () => {
    setShowMenu(false)
  }
  const handleLi = () => {
    setCheckFalse()
  }
  const handleChecked = () => {
    setShowMenu(!showMenu)
  }

  const handleClickOutside = useCallback(
    (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setCheckFalse()
      }
    },
    [divRef],
  )

  const showDiv = showMenu ? `mt-1 ${classNamefeaturesDropDowm}` : 'hidden'

  const setSelectedFromPathName = useCallback(() => {
    let urlSegment
    if (pathname.includes('feed')) {
      urlSegment = pathname.split('/')[1]
    } else if (pathname.includes('profile')) {
      urlSegment = 'profile'
    } else {
      urlSegment = pathname.split('/').pop()
    }

    const words = urlSegment!
      .split('-')
      .map((word, index) => {
        if (index === 0 && word === 'hr') {
          return word.toUpperCase()
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1)
        }
      })
      .join(' ')
    if (words === 'Feeds') {
      setSelected('Home')
    } else if (
      words === 'Posts' ||
      words === 'Comments' ||
      words === 'Reactions'
    ) {
      setSelected('User Activity')
    } else {
      setSelected(words)
    }
  }, [pathname])

  useEffect(() => {
    if (pathname) setSelectedFromPathName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClickOutside])

  useEffect(() => {
    setCheckFalse()
    document.addEventListener('scroll', setCheckFalse)
    return () => {
      document.removeEventListener('scroll', setCheckFalse)
    }
  }, [])

  return (
    <div
      className={` ${
        pathname.includes('/channels') && 'max-md:mt-[10px]'
      } relative flex cursor-pointer justify-center ${classNameOuter}`}
      ref={divRef}>
      <div
        className={`${classNameInner} h-12 content-center items-center rounded-2xl border border-[#e6e6e6] bg-bg-tertiary dark:border-none dark:bg-dark-grey`}>
        <div className="flex justify-between px-4" onClick={handleChecked}>
          <div className="flex items-center pr-3 normal-case text-black dark:text-white">
            <div className="ml-0 text-left">{getSelectedIcon(selected)}</div>
            <p className="text-base font-extrabold">
              {selected.length > 16
                ? `${selected.substring(0, 14)}...`
                : selected}
            </p>
          </div>
          <ArrowDown className="text-2xl dark:text-white" />
        </div>
        {isHydrated && (
          <div className={`${showDiv} absolute left-0 top-full w-full`}>
            <DropDownContent handleLi={handleLi} />
          </div>
        )}
      </div>
    </div>
  )
}

export default FeaturesDropDown

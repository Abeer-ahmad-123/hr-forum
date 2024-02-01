import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AiFillHome, AiOutlineUserAdd } from 'react-icons/ai'
import { BsDot, BsFillBookmarksFill } from 'react-icons/bs'
import {
  RiArrowDropDownLine as DownArrow,
  RiSettings4Fill,
} from 'react-icons/ri'
import DropDownContent from '../shared/DropDownContent'

interface FeaturesDropDownInterface {
  classNameOuter: string
  classNameInner: string
  classNamefeaturesDropDowm: string
}

const FeaturesDropDown = ({
  classNameOuter,
  classNameInner,
  classNamefeaturesDropDowm,
}: FeaturesDropDownInterface) => {
  const [selected, setSelected] = useState('Home')
  const [showMenu, setShowMenu] = useState<boolean>(false)

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

  const handleClickOutside = (event: any) => {
    if (divRef.current && !divRef.current.contains(event?.target)) {
      setCheckFalse()
    }
  }

  const showDiv = showMenu
    ? `ml-[-1px] block  border-b border-l border-r border-[#e6e6e6] ${classNamefeaturesDropDowm}`
    : 'hidden'

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
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    if (words === 'Feed') {
      setSelected('Home')
    } else {
      setSelected(words)
    }
  }, [pathname])

  useEffect(() => {
    if (pathname) setSelectedFromPathName()
  }, [pathname, setSelectedFromPathName])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    setCheckFalse()
    document.addEventListener('scroll', setCheckFalse)
    return () => {
      document.removeEventListener('scroll', setCheckFalse)
    }
  }, [])

  const getSelectedIcon = () => {
    const styles = 'mr-2 h-5 w-5 text-accent'
    if (selected === 'Home' || 'Feeds') {
      return <AiFillHome className={styles} />
    } else if (selected === 'Settings') {
      return <RiSettings4Fill className={styles} />
    } else if (selected === 'Saved') {
      return <BsFillBookmarksFill className={styles} />
    } else if (selected === 'Channels') {
      return <AiOutlineUserAdd className={styles} />
    } else {
      return (
        <BsDot
          className="mr-2 h-5 w-5 rounded-md border border-primary bg-gray-200"
          fill={'black'}
        />
      )
    }
  }

  return (
    <div
      className={`relative flex cursor-pointer justify-center ${classNameOuter}`}
      ref={divRef}>
      <div
        className={`${classNameInner} h-8 rounded border border-[#e6e6e6] dark:dark:bg-black`}>
        <div
          className="mt-[3px] flex justify-between px-[0.75rem] py-0"
          onClick={handleChecked}>
          <div className="flex items-center normal-case text-black dark:text-white">
            {getSelectedIcon()}
            <p>{selected}</p>
          </div>
          <DownArrow className="text-2xl dark:text-white" />
        </div>
        <div className={`${showDiv} `}>
          <DropDownContent handleLi={handleLi} />
        </div>
      </div>
    </div>
  )
}

export default FeaturesDropDown

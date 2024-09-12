import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AiFillHome, AiOutlineUserAdd } from 'react-icons/ai'
import { BsDot, BsFillBookmarksFill } from 'react-icons/bs'
import {
  RiArrowDropDownLine as DownArrow,
  RiSettings4Fill,
} from 'react-icons/ri'
import DropDownContent from '../shared/DropDownContent'
import { ChannelInterface } from '@/utils/interfaces/channels'
import HomeIcon from '@/assets/icons/home'

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

  const handleClickOutside = useCallback(
    (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setCheckFalse()
      }
    },
    [divRef],
  )

  const showDiv = showMenu
    ? `ml-[-1px] block border-b border-l border-r border-[#e6e6e6] max-md:w-full ${classNamefeaturesDropDowm}`
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

  const getSelectedIcon = () => {
    const styles = 'mr-3 h-5 w-5 text-accent'
    if (selected === 'Home' || 'Feeds') {
      return <HomeIcon className={styles} />
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
      className={` ${
        pathname.includes('/channels') && 'max-md:mt-[10px]'
      } relative flex cursor-pointer justify-center ${classNameOuter}`}
      ref={divRef}>
      <div
        className={`${classNameInner} h-12 items-center bg-bg-tertiary rounded-2xl border content-center border-[#e6e6e6] dark:dark:bg-black`}>
        <div
          className="mt-[3px] flex justify-between px-4 py-0"
          onClick={handleChecked}>
          <div className="flex items-center normal-case text-black dark:text-white pr-3">
            {getSelectedIcon()}
            <p>
              {selected.length > 16
                ? `${selected.substring(0, 14)}...`
                : selected}
            </p>
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

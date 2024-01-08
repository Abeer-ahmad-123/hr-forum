import { setChecked } from '@/store/Slices/dropDownSlice'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AiFillHome, AiOutlineUserAdd } from 'react-icons/ai'
import { BsDot, BsFillBookmarksFill } from 'react-icons/bs'
import {
  RiArrowDropDownLine as DownArrow,
  RiSettings4Fill,
} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import DropDownContent from '../shared/DropDownContent'

const OldFeaturesDropDown = () => {
  const [selected, setSelected] = useState('Home')
  const checked = useSelector((state: any) => state.dropDown.checked)
  const dispatch = useDispatch()

  const divRef: any = useRef(null)

  const pathname = usePathname()

  const handleChecked = () => {
    dispatch(setChecked(!checked))
  }

  const setCheckFalse = useCallback(() => {
    dispatch(setChecked(false))
  }, [dispatch])

  const handleLi = () => {
    setCheckFalse()
  }

  const handleClickOutside = useCallback(
    (event: any) => {
      if (divRef.current && !divRef.current.contains(event?.target)) {
        setCheckFalse()
      }
    },
    [setCheckFalse],
  )

  const setBorder = checked
    ? 'border-b-0 border-r border-l border-t  border-[#e6e6e6]'
    : 'border-transparent hover:border-[#e6e6e6] dark:hover:border-white'

  const showDiv = checked
    ? 'ml-[-1px] block w-[270px] border-b border-l border-r border-[#e6e6e6]  max-lg:w-[200px]'
    : 'hidden'

  const setSelectedFromPathName = useCallback(() => {
    let urlSegment
    if (pathname.includes('feed')) {
      urlSegment = pathname.split('/')[1]
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
      setSelected('Home')
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
    window.addEventListener('scroll', setCheckFalse)
    return () => {
      window.removeEventListener('scroll', setCheckFalse)
    }
  }, [setCheckFalse])

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
      className="relative flex w-[270px] cursor-pointer justify-center  max-lg:hidden"
      ref={divRef}>
      <div
        className={`fixed top-[14px] ml-[-26px] h-8 w-[270px] rounded border border-[#e6e6e6] dark:bg-dark-background`}>
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

export default OldFeaturesDropDown

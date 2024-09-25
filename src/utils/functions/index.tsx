import HomeIcon from '@/assets/icons/home'
import Icon from '@/assets/icons/heartIcon'
import HrGeneral from '@/assets/icons/hrGeneral'
import SmileIcon from '@/assets/icons/smileIcon'


export const getSelectedIcon = (selected: string) => {
  const styles = 'mr-3 h-5 w-5 dark:text-bg-bg-tertiary'
  if (selected === 'Home' || selected === 'Feeds') {
    return <HomeIcon className={styles} />
  } else if (selected === 'Saved') {
    return <Icon className={styles} strokeWidth='1.5' />
  } else if (selected === 'HR General') {
    return <HrGeneral className={`ml-0 ${styles}`} />
  }
  else {
    return (
      <SmileIcon className={`ml-0 ${styles}`} />
    )
  }
}

const commonPrimaryText: string = 'text-[800] bg-bg-tertiary dark:bg-bg-primary-dark'
const commonDarkModeText: string = 'dark:text-white '

const checkEqual = (key: string, pathname: string): boolean => {
  return pathname === key
}

export const textStyle = (key: string, pathname: string): string => {
  return checkEqual(key, pathname)
    ? commonPrimaryText
    : commonDarkModeText
}

export const iconStyle = (key: string, pathname: string): string => {
  return checkEqual(key, pathname)
    ? commonPrimaryText
    : commonDarkModeText
}

export const sidebarLinkStyle = (key: string, pathname: string): string => {
  return checkEqual(key, pathname)
    ? commonPrimaryText
    : `text-gray-800 hover:bg-gray-100 ${commonDarkModeText} dark:hover:bg-gray-700`
}

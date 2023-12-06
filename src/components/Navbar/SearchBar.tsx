'use client'
import SearchIcon from '@/assets/icons/SearchIcon'
import { useSelector } from 'react-redux'

const SearchBar = () => {
  const darkMode = useSelector((state: any) => state.colorMode.darkMode)
  const styles = darkMode
    ? 'border-gray-600 bg-gray-700 hover:border-gray-400'
    : 'border-gray-200 bg-gray-100 hover:border-blue-500'
  return (
    <form
      className={`relative flex max-w-[690px] flex-1 items-center space-x-2 rounded-full border border-gray-200 py-1 pl-3  outline-none hover:bg-white dark:bg-dark-background dark:hover:bg-dark-background max-sm:max-w-[160px] ${styles}`}>
      <input
        type="text"
        className="flex-1 border-none bg-transparent font-light text-black outline-none hover:border-none dark:text-white"
        placeholder="Search Forum"
      />
      <label className="max-sm:absolute max-sm:right-[-6px]">
        <div className="pointer-events-none flex items-center rounded-full bg-transparent pl-3">
          <div className={`mr-2 flex h-7 w-7 rounded-lg `}>
            <div className="flex items-center justify-center">
              <SearchIcon />
            </div>
          </div>
        </div>
      </label>
    </form>
  )
}

export default SearchBar

'use client'
import SearchIcon from '@/assets/icons/SearchIcon'
import { useRouter } from 'next/navigation'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useSelector } from 'react-redux'

const SearchBar = () => {
  const darkMode = useSelector((state: any) => state.colorMode.darkMode)
  const [search, setSearch] = useState<string>('')
  const router = useRouter()
  const styles = darkMode
    ? 'border-gray-600 bg-gray-700 hover:border-gray-400'
    : 'border-gray-200 bg-gray-100 hover:border-blue-500'
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      router.push(`/feeds?search=${search}`, { shallow: true })
    }
  }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  console.log('search', search)
  return (
    <form
      className={`relative flex w-full max-w-[160px] flex-1 items-center space-x-2 rounded-full border border-gray-200 py-1 pl-3 outline-none transition-all duration-700 ease-in-out  focus-within:max-w-[690px] hover:bg-white  focus:max-w-[690px] dark:bg-dark-background dark:hover:bg-dark-background max-sm:max-w-[160px] ${styles}`}>
      <input
        onKeyDown={handleKeyDown}
        onChange={handleSearch}
        value={search}
        type="text"
        className="ml-4 w-full border-none bg-transparent font-light text-black outline-none hover:border-none dark:text-white"
        placeholder="Search Forum"
      />
      <label className="absolute left-[-6px]">
        <div className="pointer-events-none flex items-center rounded-full bg-transparent">
          <div className={`mr-2 flex h-7 rounded-lg`}>
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

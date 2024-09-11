'use client'
import SearchIcon from '@/assets/icons/SearchIcon'
import '@/components/shared/customLink/style.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

const SearchBar = () => {
  const SearchParams = useSearchParams()
  const [search, setSearch] = useState<string>('')
  const router = useRouter()
  const refForInput: any = useRef()
  const pathname = usePathname()

  const styles =
    'dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-400 border-gray-200 hover:border-blue-500'

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (search !== SearchParams.get('search')) {
        const baseRoute = pathname.includes('channels/') ? pathname : '/feeds'
        const queryParams = search ? `?search=${search}` : ''
        router.push(`${baseRoute}${queryParams}`)
        refForInput.current.blur()
      }
    }
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleIconClick = () => {
    refForInput.current.focus()
  }

  useEffect(() => {
    setSearch(SearchParams.get('search') ?? '')
    return () => { }
  }, [SearchParams])

  return (
    <form
      className='relative flex max-w-[420px] flex-1 items-center space-x-2 rounded-full h-10 w-10 transition-all duration-700 ease-in-out md:h-11 md:w-11 border border-none py-1 pl-3 outline-none focus-within:w-full focus:w-full dark:bg-dark-background dark:hover:bg-dark-background max-sm:max-w-[160px] dark:border-gray-600 dark:hover:border-gray-400 border-gray-200 bg-bg-tertiary hover:border-blue-500'
    >
      <input
        ref={refForInput}
        onKeyDown={handleKeyDown}
        onChange={handleSearch}
        value={search}
        type="text"
        className="max-md:w-0 ml-4 pl-3 md:ml-8 md:pl-2 focus:max-sm:w-full sm:w-full border border-none bg-transparent font-light rounded-r-full text-black outline-none dark:text-white dark:bg-dark-primary transition-all duration-700 ease-in-out placeholder:text-base placeholder:font-medium placeholder-opacity-60"
        placeholder="Search Forum"
      />
      <label className="absolute left-[-6px] max-sm:left-[-3px]">
        <div
          className="pointer-events-auto flex items-center rounded-full bg-transparent cursor-pointer"
          onClick={handleIconClick}
        >
          <div className={`mr-5 flex h-7 rounded-lg`}>
            <div className="md:ml-[10px] flex items-center justify-center transition-all duration-700 ease-in-out">
              <SearchIcon className='fill-current text-black md:text-color-grey' />
            </div>
          </div>
        </div>
      </label>
    </form>
  )
}

export default SearchBar

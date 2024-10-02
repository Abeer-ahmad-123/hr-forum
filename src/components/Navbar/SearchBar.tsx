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
    return () => {}
  }, [SearchParams])

  return (
    <form className="relative flex h-10 w-10 max-w-[420px] flex-1 items-center space-x-2 rounded-full border border-none border-gray-200 bg-bg-tertiary py-1 pl-3 outline-none focus-within:w-full hover:border-blue-500 focus:w-full dark:border-gray-600 dark:bg-bg-tertiary-dark dark:hover:border-gray-400 dark:hover:bg-bg-tertiary-dark max-sm:max-w-[160px] md:h-11 md:w-11">
      <input
        ref={refForInput}
        onKeyDown={handleKeyDown}
        onChange={handleSearch}
        value={search}
        type="text"
        className="ml-4 rounded-r-full border border-none bg-bg-tertiary pl-3 font-light text-black placeholder-black  placeholder-opacity-60 outline-none placeholder:text-base placeholder:font-medium dark:bg-bg-tertiary-dark dark:text-white dark:placeholder-[#9F9F9F] max-md:w-0 focus:max-sm:w-full sm:w-full md:ml-8 md:pl-2"
        placeholder="Search Forum"
      />
      <label className="absolute left-[-6px] max-sm:left-[-3px]">
        <div
          className="pointer-events-auto flex cursor-pointer items-center rounded-full bg-transparent"
          onClick={handleIconClick}>
          <div className={`mr-5 flex h-7 rounded-lg`}>
            <div className="flex items-center justify-center pl-0 sm:pl-[3px] md:ml-[10px]">
              <SearchIcon className="fill-current text-[#6B6F7E]  dark:text-[#9F9F9F]" />
            </div>
          </div>
        </div>
      </label>
    </form>
  )
}

export default SearchBar

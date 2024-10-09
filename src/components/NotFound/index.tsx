import './index.css'
import ErrorImage from '@/assets/images/404Image'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="not-found w-full max-w-[542px]">
      <div className="error-contain w-full">
        <div className="error-text w-full">
          <ErrorImage className="h-full w-full" />
          <h2 className="mt-6 text-3xl">Oops! 404: You Broke It</h2>
          <p className="mt-3  w-full text-center  font-primary text-base text-[#71717A]">
            you found a page that doesn't exist. We're as shocked as this guy!
          </p>
          <div className="mt-6 flex w-full max-w-[542px] cursor-pointer justify-center rounded-md border border-[#F4F4F5] py-3 text-sm dark:border-[#202020]  dark:text-white ">
            <div className="group flex justify-center">
              <Link href={`/`}>Go to homepage</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound

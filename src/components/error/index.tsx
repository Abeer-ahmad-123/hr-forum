import './index.css'
import Link from 'next/link'
import ErrorImage from '@/assets/images/errorImage'

const Error = ({ message }: { message?: string | React.ReactNode }) => {
  return (
    <div className="w-full max-w-[542px]">
      <div className="error-contain w-full">
        <div className="error-text flex w-full flex-col items-center p-8">
          <ErrorImage className="h-full max-h-[300px] w-full max-w-[300px] items-center" />
          <h2 className="mt-6 text-center text-3xl">Oops! 404: You Broke It</h2>
          <p className="mt-3  w-full text-center  font-primary text-base text-[#71717A]">
            {message}
          </p>
          <div className="mt-6 flex w-full max-w-[542px] cursor-pointer justify-center rounded-md border border-[#F4F4F5] py-3 text-sm dark:border-[#202020]  dark:text-white ">
            <div className="group flex justify-center">
              <Link href={`/`}>Let Go back</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error

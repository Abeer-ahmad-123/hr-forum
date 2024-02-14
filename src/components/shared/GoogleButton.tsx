import googleIcon from '@/assets/google.jpeg'
const GoogleButton = ({ onClick, title }: any) => {
  return (
    <div
      onClick={onClick}
      className="mt-4 flex w-full items-center justify-center rounded-md border-transparent p-[1px] text-base font-medium text-white shadow-[inset_2px_2px_2px_3px_rgb(0,0,0,0.05)] transition duration-200 ease-in-out dark:shadow-[inset_2px_2px_2px_3px_rgb(255,255,255,0.2)] md:text-lg">
      <img
        className="mr-2 h-10 w-10"
        src={googleIcon.src}
        alt="Google G Logo"
        height={8}
        width={8}
      />
      <p className="text-black dark:text-white">{title} with Google</p>
    </div>
  )
}

export default GoogleButton

import Image from 'next/image'

const GoogleButton = ({ onClick, title }: any) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 flex w-full items-center justify-center rounded-md border-transparent px-6 py-2 text-base font-medium text-white shadow-[inset_2px_2px_2px_3px_rgb(0,0,0,0.05)] transition duration-200 ease-in-out dark:shadow-[inset_2px_2px_2px_3px_rgb(255,255,255,0.2)] md:px-10 md:py-3 md:text-lg">
      <Image
        className="mr-2 h-6 w-6"
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="Google G Logo"
        height={6}
        width={6}
      />
      <p className="text-black dark:text-white">{title} with Google</p>
    </button>
  )
}

export default GoogleButton

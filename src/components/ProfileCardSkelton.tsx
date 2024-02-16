import Skelton from './ui/skelton'

interface ProfileCardSkeltonProps {
  className?: string
}

function ProfileCardSkelton({ className }: ProfileCardSkeltonProps) {
  return (
    <>
      <div
        className={`dark:bg-skelton-dark relative mt-[10px]
         ${
           !className && 'ml-[50px]'
         } mr-[25px] h-72 w-[225px] cursor-pointer overflow-hidden rounded-[10px] ${className} bg-white shadow-lg dark:bg-slate-800 dark:text-white`}>
        <Skelton className="h-[70px] w-full rounded-[5px]" />

        <div className="mt-[-20px] flex items-center justify-center">
          <Skelton className="mt-[20px] h-[30px] w-[60px] rounded-bl-[150px] rounded-br-[150px] bg-skelton" />
        </div>

        <Skelton className="mx-[15px] mt-2 flex h-5 justify-center rounded-[5px] text-center font-bold" />

        <Skelton className="ml-[15px] mr-[15px] mt-3 flex h-24 rounded-[5px] text-[12px] font-light" />

        <Skelton className="mx-[15px] mt-2 flex h-5 justify-center rounded-[5px] text-center font-bold" />
      </div>
    </>
  )
}

export default ProfileCardSkelton

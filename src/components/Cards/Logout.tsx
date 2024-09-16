import LogoutIcon from '@/assets/icons/logout'
function Logout() {
  
  return (
    <div
     className='flex gap-3 my-[10px] items-center'>
      <LogoutIcon />
      <div className=' dark:text-bg-tertiary text-base text-bg-black group-hover:font-[800]'>
        Logout
      </div>
    </div>
  )
}

export default Logout

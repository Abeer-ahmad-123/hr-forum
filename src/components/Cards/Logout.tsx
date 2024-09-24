import LogoutIcon from '@/assets/icons/logout'

const Logout = () => {
  return (
    <div className="my-[10px] flex items-center gap-3">
      <LogoutIcon />
      <div className=" text-base text-bg-black group-hover:font-[800] dark:text-bg-tertiary">
        Logout
      </div>
    </div>
  )
}

export default Logout

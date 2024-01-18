import GoogleIcon from '@/assets/icons/googleIcon'
import './style.css'

const GoogleButton = ({ title, callbackFunction }: any) => {
  return (
    <div className="flex">
      <button
        type="button"
        className="login-with-google-btn login-container mt-10 flex w-full items-center rounded-xl text-black"
        onClick={callbackFunction}>
        <GoogleIcon />
        <span className="w-full pl-2 text-left">{title} with Google</span>
      </button>
    </div>
  )
}

export default GoogleButton

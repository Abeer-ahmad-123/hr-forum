import GoogleIcon from '@/assets/icons/googleIcon'
import './style.css'

const GoogleButton = ({ title, callbackFunction }: any) => {
  return (
    <div className="flex">
      <button
        name="google button"
        type="button"
        className="login-with-google-btn login-container mt-10 flex w-full items-center rounded-xl text-black ring-0"
        onClick={callbackFunction}>
        <GoogleIcon />
        <span className="w-fit pl-2">{title} with Google</span>
      </button>
    </div>
  )
}

export default GoogleButton

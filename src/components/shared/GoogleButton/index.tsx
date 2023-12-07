import './style.css'

import React from 'react'

const GoogleButton = ({ title, callbackFunction }: any) => {
  return (
    <button
      type="button"
      className="login-with-google-btn login-container mt-10 w-full rounded-xl  text-black"
      onClick={callbackFunction}>
      <div className="w-full text-left">{title} with Google</div>
    </button>
  )
}

export default GoogleButton

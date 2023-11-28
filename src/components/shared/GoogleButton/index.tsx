import './style.css'

import React from 'react'

const GoogleButton = ({title}: any) => {
  return (

<button type="button" className="login-with-google-btn login-container mt-10 rounded-xl w-full  text-black" >
  
  <div className='w-full text-left'> 
  {title} with Google
  </div>
</button>

  )
}

export default GoogleButton
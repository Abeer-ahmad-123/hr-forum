import { useSelector } from 'react-redux'
import './index.css'

const InitialLoading = () => {
  const darkMode = useSelector((state: any) => state.colorMode.darkMode)

  return (
    <div className="initial-loading">
      <div className={`${darkMode ? 'body-light' : ''} body`}>
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className={`${darkMode ? 'base-light' : ''} base`}>
          <span></span>
          <div className={`${darkMode ? 'face-light' : ''} face`}></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1>Getting HR Forum ready</h1>
    </div>
  )
}

export default InitialLoading

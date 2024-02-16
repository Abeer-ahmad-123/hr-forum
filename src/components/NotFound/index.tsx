'use client'
import { useDispatch } from 'react-redux'
import './index.css'
import { setNotFound } from '@/store/Slices/not-found'
import { useEffect } from 'react'

const NotFound = () => {
  const dispatch = useDispatch()

  const setNotFoundTrue = async () => {
    await dispatch(setNotFound())
  }

  useEffect(() => {
    setNotFoundTrue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="not-found">
      <div className="error-contain">
        <div className="error-text">
          <h1>404</h1>
          <p>Page not found.</p>
          <div className="center">
            <a href="/">Go Home</a>
          </div>
        </div>
        <div className="binoculars">
          <div className="back-bino"></div>
          <div className="left-bino"></div>
          <div className="right-bino"></div>
          <div className="left-bino-lense">
            <div className="eye"></div>
          </div>
          <div className="right-bino-lense">
            <div className="eye"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound

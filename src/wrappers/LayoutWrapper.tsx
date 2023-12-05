'use client'
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '@/utils/data'
import { setColor } from '@/store/Slices/colorModeSlice'
import Navbar from '@/components/Navbar/Navbar'
import '@/assets/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { getChannels } from '@/services/channel/channel'
import { setChannels, setKeyIdPairData } from '@/store/Slices/channelsSlice'
import { arrayToKeyIdNValueData } from '@/utils/channels'

const LayoutWrapper = ({ children }: any) => {
  const darkMode = useSelector((state: any) => state.colorMode.darkMode)
  const color = useSelector((state: any) => state.colorMode.color)
  const dispatch = useDispatch()

  const handleSetColor = useCallback(() => {
    dispatch(setColor(colors[1]))
  }, [dispatch])
  const styles = darkMode ? 'dark' : ''
  const getChannelsLocal = useCallback(async () => {
    try {
      let response: any = await getChannels()
      dispatch(setChannels(response.channels))
      dispatch(setKeyIdPairData(arrayToKeyIdNValueData(response.channels)))
    } catch (err) {
      console.log('err', err)
    }
  }, [])

  useEffect(() => {
    handleSetColor()
    getChannelsLocal()
  }, [handleSetColor])

  return (
    <body
      className={` ${styles} font-primary dark:bg-slate-700 theme-${color}`}>
      <Navbar />
      <ToastContainer />
      <main
        className={`bg-primary-light  min-h-screen pt-14 font-primary dark:bg-dark-background`}>
        <div className="bg-primary-light grid">
          <div className="fixed left-0 top-0 z-10 w-full"></div>
          <div className="flex dark:bg-slate-700 dark:text-white">
            <div className="max-h-auto mx-auto -mt-5 w-full bg-background min-h-[70vh] px-10 py-5 dark:bg-dark-background dark:text-white max-sm:p-[10px]">
              {children}
            </div>
          </div>
        </div>
      </main>
    </body>
  )
}

export default LayoutWrapper

'use client'

import { useState } from 'react'
import { GeneralSettings } from './general-settings'
import SecuritySettings from './SecuritySettings'
import NotificationSettings from './NotificationSetting'
import {
  GeneralSettingsIcon,
  NotificationSettingsIcon,
  SecuritySettingsIcon,
} from '@/assets/icons'

const Settings = () => {
  // const [activeTab, setActiveTab] = useState('General')

  // const handleActiveTab = (e) => {
  //   setActiveTab(e.target.textContent)
  // }
  // const returnStyles = (key) => {
  //   return activeTab === key ? 'border-b-2 border-black dark:border-white' : ''
  // }

  // const returnComponent = () => {
  //   return activeTab === 'General' ? (
  //     <GeneralSettings />
  //   ) : activeTab === 'Security' ? (
  //     <SecuritySettings />
  //   ) : (
  //     <NotificationSettings />
  //   )
  // }
  return (
    <></>
    // <div className="bg-background dark:bg-dark-background">
    //   <h1 className="text-2xl font-medium">Account</h1>
    //   <div className="mt-[30px] flex gap-[40px]">
    //     <div
    //       className={`flex cursor-pointer items-center gap-[5px] ${returnStyles(
    //         'General',
    //       )} `}
    //     >
    //       <GeneralSettingsIcon />
    //       {/* <img className={`w-[20px] ${filter}`} src={generalIcon.src} /> */}
    //       <p onClick={handleActiveTab}>General</p>
    //     </div>
    //     <div
    //       className={`flex cursor-pointer items-center gap-[5px] ${returnStyles(
    //         'Notifications',
    //       )} `}
    //     >
    //       <NotificationSettingsIcon />
    //       {/* <img className={`w-[20px] ${filter}`} src={notificationsIcon.src} /> */}
    //       <p onClick={handleActiveTab}>Notifications</p>
    //     </div>
    //     <div
    //       className={`flex cursor-pointer items-center gap-[5px] ${returnStyles(
    //         'Security',
    //       )} `}
    //     >
    //       <SecuritySettingsIcon />
    //       {/* <img className={`w-[20px] ${filter}`} src={securityIcon.src} /> */}
    //       <p onClick={handleActiveTab}>Security</p>
    //     </div>
    //   </div>
    //   {returnComponent()}
    // </div>
  )
}

export default Settings

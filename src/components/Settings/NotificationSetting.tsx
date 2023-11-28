import { useState } from 'react'
import { notificationSettings } from '@/utils/data'
import { Switch } from '../ui/switch'
import { cn } from '@/lib/utils'

const NotificationSettings = () => {
  const [activityEnabled, setActivityEnabled] = useState(false)
  const [applicationEnabled, setApplicationEnabled] = useState(false)

  const styles = {
    activityBackground: activityEnabled ? 'bg-green-600' : 'bg-gray-200',
    applicationBackground: applicationEnabled ? 'bg-green-600' : 'bg-gray-200',
    activityTransform: activityEnabled ? 'translate-x-6' : 'translate-x-1',
    applicationTransform: applicationEnabled
      ? 'translate-x-6'
      : 'translate-x-1',
  }

  const handleActivityChange = () => {
    setActivityEnabled(!activityEnabled)
  }

  const handleApplicationChange = () => {
    setApplicationEnabled(!applicationEnabled)
  }

  return (
    <div className="mt-[50px] flex flex-col gap-[20px] rounded-[16px] bg-white p-[24px] shadow-cmd dark:bg-dark-primary">
      <div className="flex justify-between max-md:flex-col max-md:gap-[20px]">
        <p>Activity</p>
        <div className="flex w-[calc(100%*8/12)] flex-col gap-[8px] rounded-[16px] bg-gray-100 p-[20px] dark:bg-dark-background-secondary max-md:w-full lg:max-xl:w-[calc(100%*10/12)]">
          {notificationSettings.activity.map((activity) => (
            <div
              className="flex items-center justify-between px-[9px] py-[12px]"
              key={activity}>
              <p className="text-sm max-sm:w-[82%]">{activity}</p>
              <Switch
                name={activity}
                checked={activityEnabled}
                onCheckedChange={handleActivityChange}
                className={cn(
                  !activityEnabled && 'ring-1',
                  `relative inline-flex h-6 w-11 items-center rounded-full ${styles.activityBackground}`,
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between max-md:flex-col max-md:gap-[20px]">
        <p>Application</p>
        <div className="flex w-[calc(100%*8/12)] flex-col gap-[8px] rounded-[16px] bg-gray-100 p-[20px] dark:bg-dark-background-secondary max-md:w-full lg:max-xl:w-[calc(100%*10/12)]">
          {notificationSettings.application.map((app) => (
            <div
              className="flex items-center justify-between px-[9px] py-[12px]"
              key={app}>
              <p className="text-sm max-sm:w-[82%]">{app}</p>
              <Switch
                name={app}
                checked={applicationEnabled}
                onCheckedChange={handleApplicationChange}
                className={cn(
                  !applicationEnabled && 'ring-1',
                  `relative inline-flex h-6 w-11 items-center rounded-full ${styles.applicationBackground}`,
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex w-fit justify-center rounded-[12px] bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default NotificationSettings

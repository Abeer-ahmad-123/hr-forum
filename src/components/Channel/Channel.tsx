import { channels } from '@/utils/data'
// import { Notification, ToggleButton } from '../shared'

const Channel = () => {
  const styles = (key: any) => {
    return key
      ? 'hover:border-green-400 hover:bg-gray-200'
      : 'hover:border-red-500 hover:bg-red-50'
  }

  return (
    <div className="mx-auto w-full max-w-5xl bg-white dark:bg-dark-primary">
      <h1>Your Channels</h1>
      <div className="absolute right-4 top-4 z-50">
        {/* <Notification /> */}
      </div>
      <ul className="flex flex-col">
        {channels.map((channel: any) => (
          <li key={channel.name} className="border-b-2 border-gray-100">
            <div
              className={`flex justify-between border-l-4 border-transparent bg-transparent px-4 py-5 ${styles(
                channel.online,
              )}`}>
              {/* :channel DETAILS */}
              <div className="flex pr-8 sm:items-center sm:pl-4">
                {/* ::channel Picture */}
                <img
                  height={8}
                  width={8}
                  src={channel.picture}
                  alt={channel.name}
                  className="mr-3 rounded-full sm:h-12 sm:w-12"
                />
                {/* ::channel Infos */}
                <div className="space-y-1">
                  {/* :::name */}
                  <p className="text-base font-bold tracking-wide text-gray-700 dark:text-white">
                    {channel.name}
                  </p>
                  {/* :::description */}
                  <p className="text-sm font-medium text-gray-500">
                    {channel.description}
                  </p>
                </div>
              </div>

              {/* :channel STATUS & BUTTON */}
              <div className="flex flex-col items-end justify-between pr-4">
                {/* ::channel Online Status */}
                {/* <ToggleButton /> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Channel

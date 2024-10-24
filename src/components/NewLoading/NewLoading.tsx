import Loading from '@/assets/icons/loading'
import HrTalkerLogo from '@/assets/icons/hrTalkerText'
import HrTalkerBackground from '@/assets/images/HRTalkers.jpg'

const NewLoading = async () => {
  return (
    <div
      className="flex h-screen w-full items-center justify-center" // Use h-screen to set a full height
      style={{
        backgroundImage: `url(${HrTalkerBackground})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto', // Keeps the image in its original size for repetition
        backgroundPosition: 'top left', // Optional: set where the image starts
      }}>
      <div className="flex gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-green">
          <Loading className="animate-spin" />
        </div>
        <div className="flex flex-col gap-3">
          <HrTalkerLogo className="text-black dark:text-white" />
          <h4 className="text-base font-medium">is Loading. Please wait.</h4>
        </div>
      </div>
    </div>
  )
}

export default NewLoading

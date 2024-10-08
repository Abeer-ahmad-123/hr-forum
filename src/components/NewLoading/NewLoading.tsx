import Loading from '@/assets/icons/loading'
import HrTalkerLogoText from '@/assets/icons/hrTalkerText'
const NewLoading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-green">
          <Loading className="animate-spin" />
        </div>
        <div className="flex flex-col gap-3">
          <HrTalkerLogoText />
          <h4 className="text-base font-medium">is Loading. Please wait.</h4>
        </div>
      </div>
    </div>
  )
}

export default NewLoading

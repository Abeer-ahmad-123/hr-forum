import Skelton from '@/components/ui/skelton'

const RenderFeedLoading = () => {
  return (
    <div className="">
      <div className="mx-auto mt-3 max-w-screen-md">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          return (
            <Skelton
              key={i}
              className="my-6 h-[300px] max-w-screen-md min-w-[680px] w-full rounded-xl"
            />
          )
        })}
      </div>
    </div>
  )
}

export default RenderFeedLoading

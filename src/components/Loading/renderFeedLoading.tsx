import Skelton from '@/components/ui/skelton'

const RenderFeedLoading = () => {
  return (
    <div className="">
      <div className="mx-auto max-w-screen-md">
        <Skelton className="my-6 h-[48px] w-full rounded-lg" />
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          return (
            <Skelton
              key={i}
              className="my-6 h-[300px] w-full max-w-screen-md rounded-xl"
            />
          )
        })}
      </div>
    </div>
  )
}

export default RenderFeedLoading

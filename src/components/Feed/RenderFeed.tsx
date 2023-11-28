import PostBar from '@/components/shared/new-post/NewPostModal'
import Feed from '@/components/Feed/Feed'

function RenderFeed() {
  const channelName = ''
  return (
    <>
      <div className="mx-auto my-5 max-w-5xl rounded-full ">
        <PostBar />
      </div>

      <div className="mx-auto mt-10 max-w-screen-lg dark:text-white">
        <p className="mb-4 text-3xl text-black dark:text-white">
          {channelName}
        </p>
        <Feed channelName={channelName} />
      </div>
    </>
  )
}
export default RenderFeed

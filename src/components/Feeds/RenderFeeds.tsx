import PostBar from '@/components/shared/new-post/NewPostModal'
import Feeds from '@/components/Feeds/Feeds'
import { toPascalCase } from '@/utils/common'

function RenderFeeds({ channelSlug = null }) {
  return (
    <div>
      <div className="mx-auto my-5 max-w-5xl rounded-full ">
        <PostBar />
      </div>

      <div className="mx-auto mt-10 max-w-screen-lg dark:text-white">
        <p className="mb-4 text-3xl text-black dark:text-white">
          {!!channelSlug &&
            toPascalCase(channelSlug?.toString()?.replaceAll('-', ' '))}
        </p>
        <Feeds channelSlug={channelSlug} />
      </div>
    </div>
  )
}
export default RenderFeeds

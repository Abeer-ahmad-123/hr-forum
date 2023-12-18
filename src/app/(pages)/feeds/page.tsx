import { RenderFeeds } from '@/components/Feeds'
import RenderFeedLoading from '@/components/Loading/renderFeedLoading'
import { Suspense } from 'react'
import PostBar from '@/components/shared/new-post/NewPostModal'
import ProfileCard from './Cards/ProfileCard'
import RulesCard from './Cards/RuleCard'
import ChannelCard from './Cards/ChannelCard'
import CardLoading from '@/components/Loading/cardLoading'


// const FeedPage = () => {
//   return (
//     <>
//       <div className='flex justify-center '>
//         <div className='flex flex-col'>
//           <ProfileCard />
//           <div className='sticky max-h-screen top-0' style={{ top: '35px' }}> <ChannelCard /></div>
//         </div>
//         <div>

//         </div>
//         <div className="mx-auto my-5 max-w-5xl rounded-full ">
//           <PostBar />
//         </div>
//         <Suspense fallback={<RenderFeedLoading />}>
//           <RenderFeeds />
//         </Suspense>  </div>
//       <div className='sticky max-h-screen top-0' style={{ top: '-50px' }}> <RulesCard /></div>
//     </div >
//       </>
//       )
// }

// export default FeedPage




const FeedPage = () => {
  return (
    <>

      <div>


        <div className=" mx-auto my-5 max-w-9xl rounded-full ">
          <PostBar />
        </div>

        <Suspense fallback={<CardLoading />}>
          <RenderFeeds />
        </Suspense>


      </div>
      {/* <div className='flex justify-center '>


        <div className='flex flex-col'>
          <ProfileCard />
          <div className='sticky max-h-screen top-0' style={{ top: '35px' }}> <ChannelCard /></div>
        </div>



        

        <div className='sticky max-h-screen top-0' style={{ top: '-50px' }}> <RulesCard /></div>


      </div> */}

    </>
  )
}

export default FeedPage
import { Card } from '../shared'
import { getAllPosts } from '@/services/posts'

// Feed is a functional component that takes data and displays it as cards
const Feed = async ({ channelName }: any) => {
  
  const { posts } = await getAllPosts({ loadReactions: true, loadUser: true })
console.log("posts",posts)
  return (
    <>
      {!!posts.length &&
        posts?.map((post: any) => {
          return <Card key={post.id} post={post} 
          
          />
        })}
    </>
  )
}

export default Feed

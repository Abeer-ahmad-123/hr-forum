// import { ContentCard } from '@/components/Feed'
import Post from '@/components/shared/post'

const SingleFeed = ({params}) => {

  const id = params.id
  console.log("I am on line 7",id)

  return  <Post postId={id} />

}

export default SingleFeed
    
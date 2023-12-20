import { Card } from '..'
import CommentCard from './CommentCard'
import NewCommentCard from './NewCommentCard'

const MainComment = () => {
  return (
    <div className="bg-neutral-light-grey flex h-full flex-col px-8 py-12 pt-24 sm:px-24">
      <Card></Card>
      <CommentCard />
      <div className="mb-4 ml-0 border-l-2 pl-5 sm:ml-10 sm:pl-10">
        <CommentCard />
      </div>
      <CommentCard />
      <div className="mb-4 ml-0 border-l-2 pl-5 sm:ml-10 sm:pl-10">
        <CommentCard />
        <CommentCard />
      </div>
      <CommentCard />
      <NewCommentCard />
    </div>
  )
}

export default MainComment

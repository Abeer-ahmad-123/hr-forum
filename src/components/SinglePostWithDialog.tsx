'use client'
import Post from '@/components/shared/post'
import PostSkelton from '@/components/shared/post/PostSkelton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/Dialog/interceptDialog'
import {
  CommentInterface,
  Pagination,
  PostsInterface,
} from '@/utils/interfaces/posts'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

export type SinglePostWithDialogProps = {
  id: string
  data?: {
    post: PostsInterface
    comments: {
      comments: CommentInterface[]
      pagination: Pagination
    }
  }
}
const SinglePostWithDialog = ({ id, data }: SinglePostWithDialogProps) => {
  const router = useRouter()
  function handleCloseModal(value: boolean) {
    if (!value) {
      router.back()
    }
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-5xl bg-white ">
        <DialogDescription>
          <Suspense fallback={<PostSkelton isDialogPost={true} />}>
            <Post isDialogPost={true} postId={id} data={data} />
          </Suspense>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
export default SinglePostWithDialog

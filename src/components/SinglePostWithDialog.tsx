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
import { Suspense, useState } from 'react'

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
  const [isOpen, setOpen] = useState(true)
  function handleCloseModal(value: boolean) {
    setOpen(value)
    if (!value) {
      router.back()
    }
  }

  return (
    <Dialog defaultOpen={isOpen} open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="w-full max-w-[759px] bg-white ">
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

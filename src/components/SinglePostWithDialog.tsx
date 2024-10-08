import Post from '@/components/shared/post'
import PostSkelton from '@/components/shared/post/PostSkelton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/Dialog/interceptDialog'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

const SinglePostWithDialog = ({ id }: any) => {
  const modalState = cookies().get('modal')?.value
  return (
    <Dialog open={Boolean(modalState)}>
      <DialogContent className="max-w-5xl bg-white ">
        <DialogHeader></DialogHeader>
        <DialogDescription>
          <Suspense fallback={<PostSkelton isDialogPost={true} />}>
            <Post isDialogPost={true} postId={id} />
          </Suspense>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
export default SinglePostWithDialog

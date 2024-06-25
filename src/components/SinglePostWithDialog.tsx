import Post from '@/components/shared/post'
import PostSkelton from '@/components/shared/post/PostSkelton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/Dialog/interceptDialog'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

const SinglePostWithDialog = ({ id, data }: any) => {
  const modalState = cookies().get('modal')?.value

  return (
    <Dialog defaultOpen={Boolean(modalState)}>
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

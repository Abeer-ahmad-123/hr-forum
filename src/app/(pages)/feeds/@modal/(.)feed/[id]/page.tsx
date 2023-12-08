import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/Dialog/interceptDialog'
import PostSkelton from '@/components/shared/post/PostSkelton'
import Post from '@/components/shared/post'
import { Suspense } from 'react'

async function SingleFeed({ params }: any) {
  const { id } = params

  return (
    <Dialog open={true}>
      <DialogContent className=" max-w-5xl overflow-scroll bg-white">
        <DialogHeader></DialogHeader>

        <DialogDescription>
          <Suspense fallback={<PostSkelton />}>
            <Post isDialogPost={true} postId={id} />
          </Suspense>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
export default SingleFeed

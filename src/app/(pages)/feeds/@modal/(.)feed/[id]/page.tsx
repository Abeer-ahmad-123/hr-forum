import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/Dialog/interceptDialog'
import PostSkelton from '@/components/shared/post/PostSkelton'
import Post from '@/components/shared/post'
import { Suspense } from 'react'

async function SingleFeed({ params, searchParams }: any) {
  const { id } = params
  console.log("Search params", searchParams)

  return (
    <Dialog open={true}>
      <DialogContent className=" max-w-5xl overflow-scroll bg-white">
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
export default SingleFeed

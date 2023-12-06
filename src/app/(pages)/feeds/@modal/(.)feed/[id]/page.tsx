import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/Dialog/interceptDialog'

import Post from '@/components/shared/post'
import { Suspense } from 'react'
import Loading from './loading'

async function SingleFeed({ params }: any) {
  const { id } = params

  return (
    <Dialog open={true}>
      <DialogContent className=" max-w-5xl overflow-scroll bg-white">
        <DialogHeader></DialogHeader>

        <DialogDescription>
          <Suspense fallback={<Loading />}>
            <Post isDialogPost={true} postId={id} />
          </Suspense>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
export default SingleFeed

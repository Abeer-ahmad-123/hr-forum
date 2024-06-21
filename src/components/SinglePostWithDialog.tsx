import Post from '@/components/shared/post'
import PostSkelton from '@/components/shared/post/PostSkelton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/Dialog/interceptDialog'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

const SinglePostWithDialog = ({ id, defaultOpen = false }: any) => {
  // * Cookie value is never set so the modal is not shown so we will in this case pass a value as default from parent.
  // * In this post case, we will open the modal by default on click so that's why defaultOpen is used with default value as false and true is set from its parent.

  const modalState = cookies().get('modal')?.value || defaultOpen
  return (
    <Dialog defaultOpen={Boolean(modalState)}>
      <DialogContent className="max-w-5xl bg-white ">
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

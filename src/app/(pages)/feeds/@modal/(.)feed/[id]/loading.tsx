import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/Dialog/interceptDialog"
//   import Post from "@/components/shared/post"
import SkeltonPost from "@/components/shared/post/PostSkelton"

  async function SingleFeed({}: any) {
    // const { id } = params

return (
    
  <Dialog open={true}>
    <DialogContent
     className="bg-white max-h-[90vh] max-w-5xl h-full overflow-scroll">
      <DialogHeader>
         </DialogHeader>
      <DialogDescription>
      <SkeltonPost />
      </DialogDescription>
    </DialogContent>
  </Dialog>
    )
  }              
export default SingleFeed
  
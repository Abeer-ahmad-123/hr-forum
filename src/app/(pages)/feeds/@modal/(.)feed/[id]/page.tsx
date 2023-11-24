import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/Dialog/interceptDialog"

  
  async function SingleFeed({ params }: any) {
    const { id } = params
    
return (
    
  <Dialog open={true}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Welcome to HR-General: </DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
    )
  }              
export default SingleFeed
  
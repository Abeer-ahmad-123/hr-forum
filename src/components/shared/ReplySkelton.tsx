import Skelton from '@/components/ui/skelton'

function ReplySkelton() {
  return (
    <div className="ml-12 flex items-center  pt-5">
      <div className="flex  ">
        <Skelton className="h-8 w-8 rounded-full bg-skelton" />
        <div className="w-64">
          <Skelton className="ml-2  h-20 rounded-lg bg-skelton" />
        </div>
      </div>
    </div>
  )
}

export default ReplySkelton

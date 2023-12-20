import { AiOutlinePlus } from 'react-icons/ai'

const PlusButton = () => (
  <div className="pointer-events-none flex h-10 items-center rounded-br-xl rounded-tr-xl">
    <div className="mr-2 flex h-7 w-7 rounded-lg bg-accent">
      <div className="flex items-center justify-center">
        <AiOutlinePlus className="ml-1.5 bg-accent text-white" />
      </div>
    </div>
  </div>
)

export default PlusButton

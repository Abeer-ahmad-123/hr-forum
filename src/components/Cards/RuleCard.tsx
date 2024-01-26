import { rulesData } from '@/utils/data'
import { ShieldPlus } from 'lucide-react'

const RulesCard = () => {
  return (
    <>
      <div className="h-auto w-[200px] rounded-[10px] border border-solid border-gray-300 bg-white px-[10px] pb-[10px] shadow-lg dark:bg-slate-800 dark:text-white">
        <p className="mb-[10px] pt-5 text-start text-[11px] font-semibold">
          Forum Rules
        </p>

        <ul className="text-left">
          {rulesData.map((item, index) => (
            <li key={index}>
              <div className="my-[10px] flex gap-2.5 text-[12px] font-medium text-gray-500 dark:text-gray-400 ">
                <ShieldPlus size={20} />
                <span>{item}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default RulesCard

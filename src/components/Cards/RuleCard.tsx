const rulesArr = [
  'Vel elit, ut ut.',
  'Cras nec purus et.',
  'Fusce auctor odio.',
  'Suspendisse non',
  'Sed euismod',
  'Vel elit, ut ut.',
  'Cras nec purus.',
  'Fusce auctor.',
  'Suspendisse.',
  'Sed euismod',
]
import { ShieldPlus } from 'lucide-react'

const RulesCard = () => {
  return (
    <>
      <div className="h-auto w-[200px] cursor-pointer rounded-[10px] bg-white px-[10px] pb-[10px] shadow-lg dark:bg-slate-800 dark:text-white">
        <p className="mb-[10px] pt-5 text-start text-[12px] font-medium">
          CHANNELS RULES
        </p>

        <ul className="text-left">
          <li>
            {rulesArr.map((item, index) => (
              <li key={index}>
                <div className="my-[10px] flex gap-2.5 text-[12px] font-medium text-gray-500 hover:text-accent">
                  <ShieldPlus size={20} />
                  <span>{item}</span>
                </div>
              </li>
            ))}
          </li>
        </ul>
      </div>
    </>
  )
}
export default RulesCard

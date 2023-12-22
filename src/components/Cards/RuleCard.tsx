import React from 'react'

const rulesArr = [
  'Rule 1: Vel elit, ut ut.',
  'Rule 2: Cras nec purus et.',
  'Rule 3: Fusce auctor odio.',
  ' Rule 4: Suspendisse non',
  ' Rule 5: Sed euismod',
  'Rule 6: Vel elit, ut ut.',
  'Rule 7: Cras nec purus.',
  'Rule 8: Fusce auctor.',
  'Rule 9: Suspendisse.',
  'Rule 10: Sed euismod',
]

const RulesCard = () => {
  return (
    <>
      <div className="cursor-cursor ml-5 h-auto w-[200px] rounded-[10px] bg-white pb-[10px] shadow-lg dark:bg-slate-800 dark:text-white ">
        <h1 className="mb-[20px] justify-center pt-5 text-center text-[15px] font-medium ">
          CHANNELS RULES
        </h1>

        <ul className="cursor-pointer pl-[7px] pr-[10px] text-left">
          <li>
            {rulesArr.map((item, index) => (
              <li key={index}>
                <div className="display-inline  mb-[10px] mt-[10px] w-full pl-[10px] text-[12px] font-medium text-gray-500 ">
                  <span>{item}</span>
                </div>
                <hr className="my-1 mt-1 border-t border-gray-400" />
              </li>
            ))}
          </li>
        </ul>
      </div>
    </>
  )
}
export default RulesCard

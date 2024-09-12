'use client'
import { rulesData } from '@/utils/data'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const RulesCard = () => {
  return (
    <div className='flex flex-col justify-between min-w-[391px] w-full h-screen max-h-[882px] bg-white pt-7 pl-3'>
      <div className="h-auto w-[331px] rounded-[10px] bg-white px-[10px] pb-[10px] dark:bg-slate-800 dark:text-white">
        <h2 className="font-[800] text-lg">
          Forum rules to abide by
        </h2>
        <Accordion type="single" collapsible>
          <ul className="text-left mt-3">
            {rulesData.map((item, index) => {
              return (
                <li key={index}>
                  <AccordionItem
                    value={item.title}
                    key={index}
                    className={`${
                      index === rulesData.length - 1 ? 'border-none' : 'border-b'
                    }
                  `}>
                    <AccordionTrigger>
                      <div className="my-[10px] flex gap-2.5 text-base font-medium hover:text-accent dark:text-gray-400 dark:hover:text-accent">
                        <div>{index+1}.</div>
                        <span className='text-left'>{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-[14px] ml-6 font-normal text-text-grey dark:text-gray-400">
                        {item.description}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </li>
              )
            })}
          </ul>
        </Accordion>
      </div>
      <div className='pl-[135px] text-color-grey text-[12px] pb-5'>© 2024 HRTalkers. All rights reserved.</div>
    </div>
  )
}
export default RulesCard

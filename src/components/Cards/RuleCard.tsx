'use client'
import { rulesData } from '@/utils/data'
import { ShieldPlus } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const RulesCard = () => {
  return (
    <div className="h-auto w-[225px] rounded-[10px] border border-solid border-gray-300 bg-white px-[10px] pb-[10px] shadow-lg dark:bg-slate-800 dark:text-white">
      <h2 className="mb-[10px] pt-5 text-start text-[11px] font-semibold">
        Forum Rules
      </h2>

      <Accordion type="single" collapsible>
        <ul className="text-left">
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
                    <div className="my-[10px] flex gap-2.5 text-[12px] font-medium text-gray-500 hover:text-accent dark:text-gray-400 dark:hover:text-accent">
                      <ShieldPlus size={20} />
                      <span>{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-[12px] font-normal text-gray-500 dark:text-gray-400">
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
  )
}
export default RulesCard

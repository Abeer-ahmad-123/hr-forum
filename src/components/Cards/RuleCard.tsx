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
    <div className="flex h-screen max-h-[882px] w-full flex-col justify-between bg-white pl-3 pt-7 dark:bg-bg-primary-dark dark:text-white">
      <div className="h-auto w-[331px] rounded-[10px] bg-white px-[10px] pb-[10px] dark:bg-bg-primary-dark dark:text-bg-tertiary">
        <h2 className="text-lg font-[800]">Forum rules to abide by</h2>
        <Accordion type="single" collapsible>
          <ul className="mt-3 text-left">
            {rulesData.map((item, index) => {
              return (
                <li key={index}>
                  <AccordionItem
                    value={item.title}
                    key={index}
                    className="border-b dark:border-none">
                    <AccordionTrigger>
                      <div className="my-[10px] flex gap-2.5 text-base font-medium dark:text-bg-tertiary">
                        <div className="dark:text-white">{index + 1}.</div>
                        <span className="text-left">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="ml-6 text-[14px] font-normal text-text-grey dark:text-bg-primary">
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
      <div className="pb-5 pl-[135px] text-[12px] text-color-grey">
        © 2024 HRTalkers. All rights reserved.
      </div>
    </div>
  )
}
export default RulesCard

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { rulesData } from '@/utils/data'

function CustomAccordion() {
  return (
    <div className='dark:bg-slate-800 rounded-2xl dark:text-white inline-block md:hidden my-4 w-full'>
      <Accordion className='dark:bg-slate-800 dark:text-white rounded-2xl bg-white' type="single" collapsible>
        <AccordionItem value="forumRules">
          <AccordionTrigger className='font-[800] text-sm px-4 py-3 '>
            Forum rules to abide by
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible>
              <ul className="text-left bg-white px-4 dark:bg-slate-800 dark:text-white rounded-2xl">
                {rulesData.map((item, index) => (
                  <li key={index}>
                    <AccordionItem
                      value={item.title}
                      key={index}
                      className={`${index === rulesData.length - 1 ? 'border-none' : 'border-b'
                        }`}
                    >
                      <AccordionTrigger>
                        <div className="my-[10px] flex gap-2.5 text-base font-medium dark:text-gray-400">
                          <div>{index + 1}.</div>
                          <span className="text-left text-sm">{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-xs ml-6 font-normal text-text-grey dark:text-gray-400">
                          {item.description}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </li>
                ))}
              </ul>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default CustomAccordion

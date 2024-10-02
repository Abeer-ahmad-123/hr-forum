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
    <div className="my-4 inline-block h-12 w-full rounded-2xl dark:bg-bg-primary-dark dark:text-white lg:hidden">
      <Accordion
        className="rounded-2xl bg-white dark:bg-bg-primary-dark dark:text-white lg:mx-5"
        type="single"
        collapsible>
        <AccordionItem value="forumRules">
          <AccordionTrigger className="px-4 py-3 text-sm font-[800] ">
            Forum rules to abide by
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible>
              <ul className="rounded-2xl bg-white px-4 text-left dark:bg-bg-primary-dark dark:text-white">
                {rulesData.map((item, index) => (
                  <li key={index}>
                    <AccordionItem
                      value={item.title}
                      key={index}
                      className={`${
                        index === rulesData.length - 1
                          ? 'border-none'
                          : 'border-b'
                      } dark:border-dark-grey`}>
                      <AccordionTrigger>
                        <div className="my-[10px] flex gap-2.5 text-base font-medium dark:text-white">
                          <div>{index + 1}.</div>
                          <span className="text-left text-sm">
                            {item.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="ml-6 text-xs font-normal text-text-grey dark:text-white">
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

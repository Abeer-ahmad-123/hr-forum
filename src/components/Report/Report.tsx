'use Client'
import React, { useState } from 'react'
import InfoIcon from '@/assets/icons/InfoIcon'

const Data = [
  {
    Reason: 'Sexual content',
    Description:
      'content that include graphics ,nudity or other type of sexual content',
  },
  {
    Reason: 'Hateful and Abusive Content',
    Description: 'content that is voilent,graphics or posted to shock viewers',
  },
  {
    Reason: 'Harness or bullying',
    Description:
      'content that promotes hatred against protected groups abusive vulnerarble individuals',
  },
  {
    Reason: 'Harmful and dangerous acts',
    Description: 'content that included acts that may physical harm',
  },
  {
    Reason: 'Misinformation',
    Description:
      'content that is misleading or deceptive with serious risk of egresious harm',
  },
  {
    Reason: 'Child Abuse',
    Description:
      'content that includes sexual , predatory or abusive communications towards minors',
  },
  {
    Reason: 'Promotes terrorism',
    Description: 'content that is intended to recruit terrorsit organizations',
  },
  {
    Reason: 'Spam or misLeading',
    Description:
      'content that is massively posted or have miss leading information',
  },
  {
    Reason: 'legal issues',
    Description: 'copyrights , privacy or other legal complaints',
  },
  {
    Reason: 'Caption issues',
    Description: 'missing inaccurate or abusive captions ',
  },
]

interface ReportInterface {
  reportType: string
  setOpenDialog: (arg0: boolean) => void
}

const Report = () => {
  const [selectedItem, setSelectedItem] = useState('')

  const handleClick = (reason: any) => {
    setSelectedItem(reason)
  }
  const handleCancel = () => {}
  const handleSubmit = async () => {}
  return (
    <div className="gap-8">
      <div className="flex justify-items-start pb-8 "> Report comment</div>
      {Data.map((text, index) => (
        <div key={index} className={`flex cursor-pointer  gap-4`}>
          <div className="flex items-center gap-4 pb-2">
            <input
              type="radio"
              id={`radioButton-${index}`}
              name="example"
              className="h-4 w-4 cursor-pointer"
              onChange={() => handleClick(text.Reason)}
              value={selectedItem}
            />

            <div className="">{text.Reason}</div>
            <div className=" relative hover:block hover:opacity-100">
              <div className="opacity-1 z-10 transition-opacity duration-300 ease-in-out">
                <div className="group relative">
                  <div className="rounded-full">
                    <InfoIcon />
                  </div>
                  <div className="invisible absolute  left-full top-0 z-10 h-20 w-[8rem] overflow-auto rounded-md bg-gray-800 p-2 text-[12px] text-white opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100">
                    {text.Description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="duration-450 flex h-10 w-32 cursor-pointer items-center justify-center rounded-md border border-solid border-accent text-accent transition hover:bg-accent hover:text-white ">
          {' '}
          cancel
        </button>
        <button
          onClick={handleSubmit}
          className={`flex h-10 w-32 cursor-pointer items-center justify-center rounded-md text-white ${
            !selectedItem ? 'bg-gray-300' : 'bg-accent'
          }`}>
          submit{' '}
        </button>
      </div>
    </div>
  )
}

export default Report

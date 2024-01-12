'use Client'
import React, { useState } from 'react'
import InfoIcon from '@/assets/icons/InfoIcon' 

const Data = [
{Reason: 'Sexual content',
Description: 'content that include graphics ,nudity or other type of sexual content'
},
{Reason: 'Hateful and Abusive Content',Description: 'content that is voilent,graphics or posted to shock viewers'},
{Reason: "Harness or bullying",Description: 'content that promotes hatred against protected groups abusive vulnerarble individuals'},
{Reason: 'Harmful and dangerous acts',Description: 'content that included acts that may physical harm'},
{Reason: 'Misinformation',Description: 'content that is misleading or deceptive with serious risk of egresious harm'},
{Reason: 'Child Abuse',Description: 'content that includes sexual , predatory or abusive communications towards minors'},
{Reason: 'Promotes terrorism',Description: 'content that is intended to recruit terrorsit organizations'},
{Reason: 'Spam or misLeading',Description: 'content that is massively posted or have miss leading information'},
{Reason: 'legal issues',Description: 'copyrights , privacy or other legal complaints'},
{Reason: 'Caption issues',Description: 'missing inaccurate or abusive captions '}
  
]

const Report = () => {
  const [selectedItem, setSelectedItem] = useState("")
  
  


  const handleClick =  (reason : any) => {
setSelectedItem(reason)

  }
  console.log("the selected item is ", selectedItem)
  return (
    <div className='gap-8' >
      <div className='flex justify-items-start pb-8 '> Report comment</div> 
      {Data.map((text , index) => 
      <div key={index}  className={`flex cursor-pointer  gap-4`}> 
      
       <div className='flex items-center gap-4 pb-2'> 
       
      <input type='radio'  id={`radioButton-${index}`} name='example'  className='cursor-pointer w-4 h-4'  onChange={() => handleClick(text.Reason)} value={selectedItem}/>
 
            <div className="">{text.Reason}</div>
            <div className=" relative hover:opacity-100 hover:block"> 
  <div className="opacity-1 transition-opacity ease-in-out duration-300 z-10">
   
  <div className="group relative">
  <div className="rounded-full">
    <InfoIcon/>
  </div>
  <div className="overflow-auto h-20  absolute top-0 rounded-md w-[8rem] text-[12px] left-full bg-gray-800 text-white p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-10">
  {text.Description}
  </div>
</div>

   
  </div>
  </div> 


</div>    
        </div> 
         )}

         <div className='flex justify-end gap-2'> 
          <button className='flex rounded-md cursor-pointer justify-center items-center border border-solid border-accent text-accent hover:bg-accent hover:text-white h-10 w-32 transition duration-450 '
        
          > cancel</button>
          <button className={`flex rounded-md cursor-pointer justify-center text-white items-center h-10 w-32 ${
    !selectedItem ? 'bg-gray-300' : 'bg-accent'
  }`}
   
          >
              submit </button>
         </div>
    </div>
  )
}

export default Report

import React from "react";
import Skelton from "../ui/skelton";


const ProfilePageLoading = ( ) => { 

    return (<>
    <div> 
        <div className=" w-full h-[500px] ">
        <Skelton className="h-[200px] w-full rounded-md " />
        <section> 
<div> 
<div className=" min-h-[23vh] mx-auto w-[80%] flex rounded-md  justify-center bg-white"> 
<div className=" flex flex-col items-center  "> 
   
    <Skelton className="h-[40px] w-[80px] rounded-bl-[150px] rounded-br-[150px] mt-0"/>
    <div className="pt-5 flex flex-col items-center"> 
    <div className=" flex flex-col items-center max-md:flex-row"> 
    <Skelton className=" mt-2 h-8 w-44 max-md:w-24  max-[380px]:w-12 rounded-md"/>
    <Skelton className=" mt-2 h-6 w-36 max-md:w-28 max-md:ml-2 max-[380px]:w-12 rounded-md"/>
    </div>
    <div className="flex gap-x-3 max-[400px]:flex-col"> 
    <Skelton className=" mt-2 h-4 w-44 max-md:w-20 max-[380px]:w-24 rounded-sm"/>
    <Skelton className=" mt-2 h-4 w-44 max-md:w-24 max-[380px]:w-24 rounded-sm"/>
    <Skelton className=" mt-2 h-4 w-44 max-md:w-24 max-[380px]:w-24 rounded-sm"/> 
    </div>
   
    </div>  
   
    </div> 
    {/* <div className=" absolute right-40"> 
<Skelton className=" mt-2 mr-7 h-8 w-16 rounded-full"/>

    </div> */}
    </div>
   

    <div className=" w-[80%] flex max-md:flex-col mx-auto  gap-x-[4rem] max-md:-gap-[4rem] mt-4">
        
      
      
      <div className=" min-w-[15rem] max-md:w-full max-[350px]:w-[8rem] rounded-md bg-white flex flex-row gap-x-2 "> 
        <div className=" flex flex-col pl-4 pt-4 gap-y-2">
<Skelton className="h-4 w-4 rounded-full"/>
<Skelton className="h-4 w-4 rounded-full"/>
<Skelton className="h-4 w-4 rounded-full mb-4"/>
        </div>
        <div className="flex w-full flex-col pl-4 pt-4 gap-y-2"> 
        <Skelton className="h-4 w-[90%] rounded-sm"/>
        <Skelton className="h-4 w-[90%] rounded-sm"/>
        <Skelton className="h-4  w-[90%] rounded-sm mb-4"/>
        </div>
        </div>



    <div className="px-5 py-5 max-md:mt-4 w-full cursor-pointer rounded-xl  bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
<div className=" flex"> 
<Skelton className="w-6 h-6  rounded-full"/>
<Skelton className="w-24 h-6  rounded-md ml-2"/>

</div>
<div> 
    <Skelton className="w-54 h-10 rounded-md mt-2 ml-7"/> 
</div>
    </div>
    </div>

</div>

        </section>
        </div>
    </div>
    </>)
}

export default ProfilePageLoading
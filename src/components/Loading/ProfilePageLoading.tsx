import React from "react";
import Skelton from "../ui/skelton";


const ProfilePageLoading = ( ) => { 

    return (<>
    <div> 
        <div className=" w-full h-[500px] ">
        <Skelton className="h-[200px] w-full rounded-md " />
        <section> 
<div> 
<div className=" h-[300px] mx-auto w-[80%] flex rounded-md  justify-center bg-white"> 
<div className=" flex flex-col items-center  "> 
   
    <Skelton className="h-[40px] w-[80px] rounded-bl-[150px] rounded-br-[150px] mt-0"/>
    <div className="pt-5 flex flex-col items-center"> 
    <div className=" flex flex-col items-center max-md:flex-row"> 
    <Skelton className=" mt-2 h-12 w-44 max-md:w-24  max-[380px]:w-12 rounded-xl"/>
    <Skelton className=" mt-2 h-12 w-36 max-md:w-28 max-md:ml-2 max-[380px]:w-12 rounded-xl"/>
    </div>
    <Skelton className=" mt-2 h-20 w-72 max-md:32 max-[380px]:w-24 rounded-xl"/> 
   
    </div>  
   
    </div> 
    {/* <div className=" absolute right-40"> 
<Skelton className=" mt-2 mr-7 h-8 w-16 rounded-full"/>

    </div> */}
    </div>
   

    <div className=" mx-auto mt-4  w-[80%] flex rounded-md  justify-around w-full">
        <div>
<Skelton className="h-20 w-60 rounded-md"/>
        </div>
    <div className="flex flex-col">
<Skelton className="h-20 w-80 rounded-md"/>
    </div>
    </div>

</div>

        </section>
        </div>
    </div>
    </>)
}

export default ProfilePageLoading
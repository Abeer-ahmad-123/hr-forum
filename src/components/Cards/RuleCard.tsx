import React from "react";

const rulesArr = [
    "Rule 1: Vel elit, ut ut.",
    "Rule 2: Cras nec purus et.",
    "Rule 3: Fusce auctor odio.",
    " Rule 4: Suspendisse non",
    " Rule 5: Sed euismod",
    "Rule 6: Vel elit, ut ut.",
    "Rule 7: Cras nec purus.",
    "Rule 8: Fusce auctor.",
    "Rule 9: Suspendisse.",
    "Rule 10: Sed euismod"



]

const RulesCard = () => {
    return (
        <>
            <div className="w-[200px] ml-6  mr-[50px] pb-[10px] bg-white dark:bg-slate-800 dark:text-white shadow-lg h-auto rounded-[10px] cursor-cursor ">
                <h1 className="text-[15px] pt-5 mb-[20px] font-medium justify-center text-center ">
                    CHANNELS RULES
                </h1>


                <ul className="text-left pl-[7px] pr-[10px] cursor-pointer">

                    <li>
                        {rulesArr.map((item, index) => (
                            <li key={index} >

                                <div className="mt-[10px]  pl-[10px] mb-[10px] text-[12px] text-gray-500 font-medium display-inline w-full hover:text-black hover:bg-gray-200 ">
                                    <span

                                    >
                                        {item}
                                    </span>
                                </div>
                                <hr className="my-1 mt-1 border-t border-gray-400" />
                            </li>
                        ))}
                    </li>
                </ul>
            </div>
        </>
    );
};
export default RulesCard;
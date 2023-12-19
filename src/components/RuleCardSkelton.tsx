import React from "react";
import Skelton from "./ui/skelton";

const RulesCardSkelton = () => {
    return (
        <>
            <div className="w-[200px] ml-6 h-[460px] mr-[50px] pb-[10px] bg-white shadow-lg rounded-[10px] cursor-cursor ">

                {/* <Skelton className="pl-[7px] pr-[10px] my-[10px] py-4 h-8 px-3 text-skelton-text w-full hover:text-black hover:bg-gray-200 " /> */}
                <div className="pt-4">
                    <Skelton className="flex justify-center text-center font-bold mx-[15px] mb-[20px] mt-[10px] h-5" />
                </div>

                <ul className="text-left pl-[7px] pr-[10px] cursor-pointer">
                    <li>

                        {Array.from({ length: 10 }).map((_, index) => (
                            <React.Fragment key={index}>
                                <Skelton className="mt-[10px]  pl-[10px] mb-[10px] h-5 px-3 text-skelton-text w-full hover:text-black hover:bg-gray-200 " />
                                {index < 9 && (
                                    <hr className="my-1 mt-1 border-t border-gray-400" />
                                )}
                            </React.Fragment>
                        ))}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default RulesCardSkelton;

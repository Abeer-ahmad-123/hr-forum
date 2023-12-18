'use client'
import React from "react";
import { useSelector } from 'react-redux'


const ResChannelCard = () => {
    const channels = useSelector((state) => state?.channels?.channels);
    return (
        <>
            <div className="w-auto mt-5 mb-5 pt-3 pb-2  bg-white dark:bg-slate-800 dark:text-white shadow-lg  h-auto rounded-[10px] cursor-cursor sticky max-h-screen top-0  ">
                <h1 className="text-[17px] font-medium justify-center text-center mt-[10px] mb-[20px]">
                    THE CHANNELS
                </h1>
                <ul className="ml-[2px] list-none text-left cursor-pointer">
                    {channels.map((channel, index) => (
                        <React.Fragment key={index}>
                            <li className="mt-[10px] pl-[10px] mb-[10px] text-[14px] text-gray-500 font-medium hover:text-black hover:bg-gray-200">
                                <span className="pr-[10px]">#</span>
                                <span>{channel.name}</span>
                            </li>
                            {index < channels.length - 1 && (
                                <hr className="my-1 border-t border-gray-400 mx-3" />
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
            <div>

            </div>
        </>
    );
};
export default ResChannelCard;
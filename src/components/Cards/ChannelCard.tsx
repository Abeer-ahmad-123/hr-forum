import React from "react";


const channels = [
    "channel no 1",
    "channel no 2",
    "channel no 3",
    "channel no 4",
    "channel no 5",
    "channel no 6",
    "channel no 7",
];

const ChannelCard = () => {
    return (
        <>
            <div className="w-[200px] mt-[25px] pt-3 pb-2 ml-[50px] bg-white dark:bg-slate-800 dark:text-white shadow-lg  h-auto rounded-[10px] cursor-cursor sticky max-h-screen top-0  ">
                <h1 className="text-[17px] font-medium justify-center text-center mt-[10px] mb-[20px]">
                    THE CHANNELS
                </h1>
                <ul className="ml-[2px] list-none text-left cursor-pointer">
                    {channels.map((channel, index) => (
                        <React.Fragment key={index}>
                            <li className="mt-[10px] pl-[10px] mb-[10px] text-[14px] text-gray-500 font-medium hover:text-black hover:bg-gray-200">
                                <span className="pr-[10px]">#</span>
                                <span>{channel}</span>
                            </li>
                            {index < channels.length - 1 && (
                                <hr className="my-1 border-t border-gray-400 ml-3 mr-3" />
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
export default ChannelCard;
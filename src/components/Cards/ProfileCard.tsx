import React, { useState, useEffect } from "react";
import ChannelCard from "./ChannelCard";
import Image from 'next/image'
const ProfileCard = () => {
    const email = "webeloper@gmail.com"
    return (
        <>
            <div   >
                <div className="relative w-[200px] shadow-lg cursor-pointer h-auto  ml-[50px] mr-[25px]  overflow-hidden bg-white dark:bg-slate-800 dark:text-white rounded-[10px]">
                    <Image
                        className="w-full h-[70px]"
                        src="https://i.pinimg.com/originals/71/dc/d9/71dcd9ddf43b7ca29f7199305af68f08.png"
                        alt="background"
                        width={200}
                        height={70}
                    />
                    <div className="flex items-center justify-center">
                        <Image
                            src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp"
                            alt="profile"
                            className="relative top-[-20px] w-14 h-14 rounded-full"
                            width={50}
                            height={50}
                        />
                    </div>
                    <p className="font-bold flex justify-center text-center"> yong Jennifer</p>
                    <p className="font-light flex ml-[15px] mr-[15px] text-[12px] text-justify">
                        is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the standard dummy text ever since the 1500s,
                    </p>
                    <hr className="my-1 border-t border-gray-400 ml-3 mr-3" />
                    <p className="font-light flex mx-[15px] mt-[10px] mb-[10px] text-xs" style={{ wordWrap: 'break-word' }}>
                        {email.length > 20 ? email.slice(0, 20).concat("...") : email}
                    </p>
                    <hr className="my-1 border-t border-gray-400 ml-3 mr-3" />
                    <p className="text-xs font-semibold flex mx-[15px] mt-[10px] mb-[10px]">
                        {" "}
                        profile view
                    </p>
                </div>
            </div>
        </>
    );
};
export default ProfileCard;
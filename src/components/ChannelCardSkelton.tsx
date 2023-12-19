import { channels } from '@/utils/data';
import React from 'react'
import Skelton from './ui/skelton';

function ChannelCardSkelton() {
    return (
        <>
            <div className="w-[200px] mt-[25px] pt-3 ml-[50px] bg-white shadow-lg h-[300px] rounded-[10px] cursor-pointer sticky max-h-screen top-0">
                {/* <Skelton
                    className="mt-[10px] mb-[20px] h-3 px-3 text-skelton-text w-full justify-center text-center font-medium"
                /> */}
                <Skelton className="flex justify-center text-center font-bold mx-[15px] mb-[20px] mt-[10px] h-5" />


                <ul className="ml-[2px] list-none text-left cursor-pointer">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <React.Fragment key={index}>
                            {/* <Skelton
                                className="mt-[10px] pl-[10px] mb-[10px] h-5 text-skelton-text hover:text-black hover:bg-gray-200"
                            /> */}

                            <Skelton className="flex justify-center text-center font-bold mx-[15px] mb-[10px] mt-2 h-5" />

                            {index < 5 && (
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
}

export default ChannelCardSkelton

import { channels } from '@/utils/data';
import React from 'react'
import Skelton from './ui/skelton';

function ChannelCardSkelton() {
    return (
        <>
            <div className="w-[200px] mt-[25px] pt-3 ml-[50px] bg-white shadow-lg h-[300px] rounded-[10px] cursor-pointer sticky max-h-screen top-0">

                <Skelton className="flex justify-center text-center font-bold mx-[30px] mb-[20px] mt-[10px] h-6" />

                <ul className="ml-[2px] list-none text-left cursor-pointer">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <React.Fragment key={index}>

                            <Skelton className="flex justify-center text-center font-bold mx-[15px] mb-[10px] mt-2 h-4 rounded-sm" />
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

'use client'
import { getUserDetails } from '@/services/user'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProfilePosts from './Posts'
import ProfileCard from '../feeds/Cards/ProfileCard'
import SideCardBadge from './SideCardBadge'
import SideCardSkill from './SideCardSkill'

interface userData {
    id: number,
    bio: string,
    email: string,
    name: string,
    profilePictureURL: string
    username: string
}

function UserProfile() {

    const [userData, setUserData] = useState<userData | null>(null)
    const usertoken = useSelector((state) => state?.loggedInUser?.token)

    const getUserData = async () => {
        const response = await getUserDetails(usertoken)
        setUserData(response)
        console.log(response)
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (

        <div className="profile-page">
            <section className="relative block h-[500px]">
                <div
                    className="absolute top-0 h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'url(https://source.unsplash.com/random)',
                    }}>
                    <span
                        id="blackOverlay"
                        className="absolute left-0 h-full w-full bg-black opacity-50"></span>
                </div>
                <div
                    className="h-70-px pointer-events-none absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden"
                    style={{ transform: 'translateZ(0px)' }}>
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0">
                        <polygon
                            className="text-blueGray-200 fill-current"
                            points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            <section className="bg-blueGray-200 relative py-16">
                <div className="mx-auto w-[80vw] px-4">
                    <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl dark:bg-dark-background">
                        <div className=" px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                                    <div className="relative bg-red">
                                        <Image
                                            alt="..."
                                            width={150}
                                            height={150}
                                            src={userData?.profilePictureURL || 'https://source.unsplash.com/random/300×300'}
                                            className="absolute -m-16 -ml-20  max-w-[150px] rounded-full border-none align-middle shadow-xl lg:-ml-16"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
                                    <div className="mt-32 px-3 py-6 sm:mt-0">
                                        <button
                                            className="mb-1 rounded bg-accent px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600  sm:mr-2"
                                            type="button">
                                            Connect
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                                                22
                                            </span>
                                            <span className="text-blueGray-400 text-sm">Friends</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                                                10
                                            </span>
                                            <span className="text-blueGray-400 text-sm">Photos</span>
                                        </div>
                                        <div className="p-3 text-center lg:mr-4">
                                            <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                                                89
                                            </span>
                                            <span className="text-blueGray-400 text-sm">
                                                Comments
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 text-center">
                                <h3 className="text-blueGray-700 mb-2 text-4xl font-semibold leading-normal">
                                    {userData?.username}
                                </h3>
                                <div className="text-blueGray-400 mb-2 mt-0 text-sm font-medium uppercase leading-normal">
                                    <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg"></i>
                                    {userData?.name}
                                </div>
                                <div className="text-blueGray-600 mb-2 mt-1">
                                    <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
                                    {userData?.email}
                                </div>
                                <div className="text-left text-blueGray-600 mb-2 pb-2">
                                    <i className="fas fa-university text-blueGray-400 mr-2 text-lg "></i>
                                    {userData?.bio || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque assumenda eligendi quod laborum, esse ad similique sed minima eum quos illum accusantium atque, est ex culpa magnam incidunt. Quibusdam reprehenderit beatae consectetur rem."}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-[4.5rem]'>
                   
  
 
    <div className='flex flex-col gap-[1.5rem] ml-[6%]'> 
    <SideCardBadge/>
    <SideCardSkill/>
    </div>
  
   
    
    
    <ProfilePosts/>

</div>
                <footer className="bg-blueGray-200 relative mt-8 pb-6 pt-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center justify-center md:justify-between">
                            <div className="mx-auto w-full px-4 text-center md:w-6/12">
                                <div className="text-blueGray-500 py-1 text-sm font-semibold">
                                    Made with{' '}
                                    <a
                                        href="https://www.creative-tim.com/product/notus-js"
                                        className="text-blueGray-500 hover:text-gray-800"
                                        target="_blank">
                                        Notus JS
                                    </a>{' '}
                                    by{' '}
                                    <a
                                        href="https://www.creative-tim.com"
                                        className="text-blueGray-500 hover:text-blueGray-800"
                                        target="_blank">
                                        {' '}
                                        Creative Tim
                                    </a>
                                    .
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        </div>
    )
}

export default UserProfile


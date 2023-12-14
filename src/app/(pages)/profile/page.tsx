'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getUserDetails } from '@/services/user'
import { useSelector } from 'react-redux'

const Profile = async () => {
  const [userData, setUserData] = useState({})

  const usertoken = useSelector((state) => state?.loggedInUser?.token)
  console.log(usertoken)

  const getUserData = async () => {
    const response = await getUserDetails(usertoken)
    setUserData(response.data)

    console.log("User Profile Data: ", userData)

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
              'url(https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80)',
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
                      src={'/baby.jpeg'}
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
                  {userData?.name}
                </h3>
                <div className="text-blueGray-400 mb-2 mt-0 text-sm font-medium uppercase leading-normal">
                  <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg"></i>
                  Los Angeles, California
                </div>
                <div className="text-blueGray-600 mb-2 mt-1">
                  <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="text-blueGray-600 mb-2">
                  <i className="fas fa-university text-blueGray-400 mr-2 text-lg"></i>
                  University of Computer Science
                </div>
              </div>

              {/* <div className="border-blueGray-200 mt-10 border-t py-10 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 lg:w-9/12">
                    <p className="text-blueGray-700 mb-4 text-lg leading-relaxed">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                    <a href="#pablo" className="font-normal text-accent">
                      Show more
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
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

export default Profile

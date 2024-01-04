import Skelton from '../ui/skelton'

const ProfilePageLoading = () => {
  const rightCardToMap = [1, 2]
  return (
    <div>
      <div className="relative h-[500px] w-full">
        <Skelton className=" h-full w-full" />
        <div className="absolute bottom-0 left-0 right-0 top-[18rem] m-auto h-[60%] w-[80%] rounded-md bg-white shadow-xl dark:bg-slate-800 max-md:w-full">
          {/* edit button */}
          <div className="absolute right-[40px] top-0 w-[130px]">
            <Skelton className="mr-[50px] mt-[10px] h-[32px] w-full max-w-[130px] rounded"></Skelton>
          </div>
          <div className="flex flex-col gap-[50px] px-4">
            {/* profile picture */}
            <Skelton className="mx-auto h-[75px] w-[150px] rounded-b-full max-md:m-0 max-md:h-[66px] max-md:w-[112px]"></Skelton>
            <div className="flex flex-col gap-[20px] ">
              {/*name */}
              <Skelton className="mx-auto h-[32px] w-full max-w-[315px] rounded max-md:m-0"></Skelton>
              {/* userman*/}

              {/* email*/}

              <Skelton className="mx-auto h-[25px] w-full max-w-[200px] rounded max-md:m-0"></Skelton>
              {/*bio*/}
              <Skelton className="mx-auto h-[50px] w-full rounded max-md:m-0"></Skelton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="mt-[80px] flex h-[88%] w-[80%] gap-[65px] rounded-md max-md:w-full max-md:flex-col max-md:gap-[20px]">
          {/*Left card */}

          <div className="h-[194px] max-h-screen min-w-[15rem] rounded-[10px] bg-white pb-2 pt-3 shadow-lg dark:bg-slate-800 ">
            <div className="flex flex-col gap-[20px] pb-3 pl-5 pt-8">
              <Skelton className="h-[22px] w-full max-w-[140px] rounded-sm" />
              <Skelton className="h-[22px] w-full max-w-[140px] rounded-sm" />
              <Skelton className="h-[22px] w-full max-w-[140px] rounded-sm" />
            </div>
          </div>

          {/*right card */}
          <div className="flex w-full flex-col gap-[5px]">
            {/**change rightCardToMap array to change map render  */}
            {rightCardToMap.map(() => (
              <div className="my-2 w-full cursor-pointer rounded-xl bg-white px-5 py-5  shadow-lg dark:bg-slate-800 dark:text-gray-300 max-md:mt-4">
                <div className="flex items-center">
                  <Skelton className="h-8 w-8  rounded-full" />
                  <Skelton className="ml-2 h-6  w-24 rounded-md" />
                </div>
                <div>
                  <Skelton className="w-54 ml-10 mt-2 h-10 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePageLoading

import { useEffect, useState } from 'react'

const Information = () => {  
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phoneNumber: null,
    address: '',
    country: '',
    stateReligion: '',
    city: '',
    zipCode: null,
    bio: '',
  })

  const handleChange = (e:any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const updateUserDetail = async () => {
    try {
      const { bio, email, name, ...otherValues } = userInfo
      let res = await api.updateUserDetail({
        bio,
        email,
        name,
        id: userInfo?.id,
      })

      if (res?.data?.success)
        sessionUpdate({ userData: { ...res?.data?.data } })
    } catch (err) {
      console.log('err', err)
    }
  }

  useEffect(() => {
    if (session) {
      setUserInfo({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        phoneNumber: null,
        address: '',
        country: '',
        stateReligion: '',
        city: '',
        zipCode: null,
        bio: session?.user?.bio || '',
      })
    }
  }, [session])

  return (
    <div className="grid gap-[20px] rounded-[16px] bg-white p-[24px] shadow-cmd dark:bg-dark-primary">
      <div className="grid grid-cols-2 gap-[20px]">
        <div className=" flex flex-col gap-[5px]">
          <label>Name</label>
          <input
            className="h-[40px] rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
            placeholder="Name"
            type="text"
            value={userInfo.name}
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className=" flex flex-col gap-[5px]">
          <label>Email</label>
          <input
            className=" h-[40px] rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
            placeholder="Email Address"
            type="email"
            value={userInfo.email}
            name="email"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2  gap-[20px]">
        <div className="flex flex-col gap-[5px]">
          <label>Phone No.</label>
          <input
            className="h-[40px] rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
            placeholder="Phone Number"
            type="number"
            value={userInfo.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <label>Address</label>
          <input
            className="h-[40px] rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
            placeholder="Address"
            type="text"
            value={userInfo.address}
            name="address"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2  gap-[20px]">
        <div className="flex flex-col gap-[5px]">
          <label>Country</label>
          <input
            className="h-[40px] rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
            placeholder="Country"
            type="text"
            value={userInfo.country}
            name="country"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <label>State/Region</label>
          <input
            className="h-[40px] rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
            placeholder="State/Region"
            type="text"
            value={userInfo.stateReligion}
            name="stateReligion"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2  gap-[20px]">
        <div className="flex flex-col gap-[5px]">
          <label>City</label>
          <input
            className="h-[40px] rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
            placeholder="City"
            type="text"
            value={userInfo.city}
            name="city"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <label>Zip/Code</label>
          <input
            className="h-[40px] rounded-[5px]  p-[10px] outline  outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
            placeholder="Zip Code"
            type="number"
            value={userInfo.zipCode}
            name="zipCode"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex w-[100%] flex-col gap-[5px]">
        <label>Bio</label>
        <textarea
          className="resize-none rounded-[5px] p-[10px]  outline outline-1 outline-offset-2 outline-gray-300 hover:outline-stone-950 focus:outline-2 focus:outline-stone-950"
          name="bio"
          value={userInfo.bio}
          rows={6}
          placeholder="Bio"
          onChange={handleChange}
        />
      </div>

      <button
        onClick={updateUserDetail}
        className="flex w-fit justify-center rounded-[12px] bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90">
        Save Changes
      </button>
    </div>
  )
}

export default Information

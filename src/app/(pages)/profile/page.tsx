function Profile() {
  return (
    <div className="min-h-screen pt-10">
      <div className="m-auto max-w-2xl overflow-hidden  bg-white shadow sm:rounded-lg">
        <div className="flex h-48 items-center justify-center bg-white">
          <img
            src="https://source.unsplash.com/random/300x300"
            alt="User Picture"
            className="h-32 w-32 rounded-full"
          />
        </div>
        <div className="flex flex-col justify-start px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            User Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details and informations about user.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Mickael Poulaz
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">User Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                MPoulaz
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                m.poul@example.com
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Salary</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                $10,000
              </dd>
            </div>
            {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"> */}
            {/* <dt className="text-sm font-medium text-gray-500">
                    About
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    To get social media testimonials like these, keep your customers engaged with your social media accounts by posting regularly yourself
                </dd> */}
            {/* </div> */}
            <div className="flex justify-end bg-white px-4 pb-4">
              <button className="focus:shadow-outline-blue rounded-md bg-primary px-4 py-2 text-white hover:bg-blue-600 focus:outline-none active:bg-blue-800">
                Edit
              </button>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Profile

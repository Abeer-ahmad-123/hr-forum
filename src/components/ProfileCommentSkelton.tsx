import Skelton from './ui/skelton'

const ProfileCommentSkelton = () => {
  return (
    <>
      <div className="mb-4">
        <div className="mb-2 ml-2 flex flex-col items-start align-baseline">
          <div className="flex flex-row items-center">
            <Skelton className="mx-2 h-6 w-24 rounded-sm bg-skelton" />
            <Skelton className="h-6 w-24 rounded-sm bg-skelton" />
          </div>
          <Skelton className="mx-2 mt-2 h-6 w-24 rounded-sm bg-skelton" />
        </div>

        <Skelton className="mx-4 h-6 w-72 rounded-sm bg-skelton" />
      </div>
      <hr className="mx-3" />
    </>
  )
}

export default ProfileCommentSkelton

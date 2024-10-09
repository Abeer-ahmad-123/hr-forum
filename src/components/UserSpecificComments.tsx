'use client'
import { useRouter } from 'next/navigation'
import ProfileComment from './ProfileComment'
import { PostsInterface } from '@/utils/interfaces/posts'
import { usePathname } from 'next/navigation'
import { userData } from '@/utils/interfaces/userData'
import Link from 'next/link'

interface UserSpecificCommentsProps {
  comments: PostsInterface[]
  user: {
    id: string
    name: string
    username: string
    profilePictureURL: string
  }
  // user: userData | Number
}

const UserSpecificComments = ({
  comments,
  user,
}: UserSpecificCommentsProps) => {
  const pathName = usePathname()
  const router = useRouter()
  const handleClick = () => {
    router.push(
      `/user-activities/${user.name?.toLowerCase().replace(/ /g, '-')}-${
        user.id
      }/comments`,
    )
  }

  return (
    <>
      {pathName.includes('/user-activities') ? (
        <>
          {comments.map((comment, index) => {
            return (
              <div
                key={index}
                className="mb-4 rounded-2xl bg-bg-secondary px-6 pb-5 pt-7 dark:bg-bg-tertiary-dark">
                {<ProfileComment comment={comment} index={index} />}
              </div>
            )
          })}
        </>
      ) : (
        comments.slice(0, 3).map((comment, index) => {
          return (
            <div
              key={index}
              className="mb-4 rounded-2xl bg-bg-secondary px-6 pb-5 pt-7 dark:bg-bg-tertiary-dark">
              {<ProfileComment comment={comment} index={index} />}
            </div>
          )
        })
      )}
      {pathName.includes('/user-activities') ? (
        ''
      ) : (
        <div className="flex cursor-pointer justify-center rounded-md border border-[#F4F4F5] py-3 text-sm dark:border-[#202020]  dark:text-white ">
          <div className="group flex justify-center">
            <Link
              href={`/user-activities/${user?.name
                ?.toLowerCase()
                .replace(/ /g, '-')}-${user?.id}`}>
              Show All Comments
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default UserSpecificComments

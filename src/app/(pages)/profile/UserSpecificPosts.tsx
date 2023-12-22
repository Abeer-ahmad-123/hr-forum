import React, { Suspense } from 'react'
import ProfilePosts from './Posts'
import Skelton from '@/components/ui/skelton'
import { UserSpecificationPostInterface } from '@/utils/interfaces/posts'

const UserSpecificPosts = ({
  posts,
}: {
  posts: UserSpecificationPostInterface[]
}) => {
  return (
    <Suspense fallback={<Skelton className="h-[300px] w-full" />}>
      <div className="flex flex-col">
        {posts?.map((_: UserSpecificationPostInterface, i: number) => (
          <ProfilePosts key={i} />
        ))}
      </div>
    </Suspense>
  )
}

export default UserSpecificPosts

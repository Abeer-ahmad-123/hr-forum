import React, { Suspense } from 'react'
import ProfilePosts from './Posts'
import Skelton from '@/components/ui/skelton'

const UserSpecificPosts = ({ posts }: any) => {
  return (
    <Suspense fallback={<Skelton className="h-[300px] w-full" />}>
      <div className="flex flex-col">
        {posts?.map((_, i) => (
          <ProfilePosts key={i} />
        ))}
      </div>
    </Suspense>
  )
}

export default UserSpecificPosts

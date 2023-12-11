import Post from '@/components/shared/post'

// const SingleFeed = ({ params }: any) => {
//     const id = params.id
//     console.log(id)
//     return <Post postId={id} />
// }

// export default SingleFeed


import React from 'react'

function page({ params }: any) {
    const id = (params.id)
    return (
        <Post postId={id} />
    )
}

export default page

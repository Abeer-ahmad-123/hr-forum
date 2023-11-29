

import React from 'react'
import UpdownButton from '../../ui/updownButton';
import Image from 'next/image'
import picture from '@/assets/avatars/img.jpeg'
import picture2 from '@/assets/avatars/img2.jpeg'
import CommentSection from '../CommentSection'
import { getPostsByPostId } from '@/services/posts'
import { getPostsComments } from '@/services/posts'
import { json } from 'node:stream/consumers';
// import { comment } from 'postcss';

async function Post
  ({ isDialogPost = false, postId }: any) {

  console.log("Here is our postId" + postId)
  const { post } = await getPostsByPostId(postId)
  const { comments } = await getPostsComments(postId,{})
  console.log("Comments array ", comments)
  
  return (
    <div className="mx-auto my-5 max-w-5xl h-screen rounded-full ">
      <div className={`mx-auto flex mb-5 max-w-screen-lg cursor-pointer rounded-xl bg-white
      ${!isDialogPost && 'shadow-lg'} 
      dark:bg-dark-primary dark:text-gray-300` }>

        <div className='mt-6'>
          <UpdownButton  count={0}/>
        </div>
        <div className='flex flex-col items-center w-full p-10 pt-0'>
          <div className='flex w-full mt-6'>
            <div className="text-4xl font-bold   text-left shrink-0 dark:text-white">
              {post.title!}            </div >
            <div className='flex place-content-around	 items-center w-full'>
              <div
                aria-label="channel-name"
                className={`rounded-lg bg-accent w-max text-white whitespace-nowrap px-6 py-1 h-fit text-sm font-semibold dark:bg-dark-background-secondary dark:text-white`}>
                QUESTION
              </div>
              <div className="flex h-10 items-center p-1.5">
                <img src='https://avatar.iran.liara.run/public/boy' className='h-8 w-8' />
              </div>

            </div>
          </div>
          <div className='w-full p-7 pl-0 pt-3 mt-0 text-gray-600 dark:text-white leading-loose h-full text-left' dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div>
            {!!post.image ? <Image
              src={picture}
              style={{ objectFit: 'fill' }
              }
              alt="Picture of the author"
              className='mb-7'
            /> : null}
          </div>
          <div className="w-full border-b mb-9 border-gray-500 pr-5"></div>
          <div className='w-full'>


            {comments.length !== 0 && comments.map((comment)=>{
             return <CommentSection comment={comment} />
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post

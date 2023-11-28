

import React from 'react'
import UpdownButton from '../../ui/updownButton';
import Image from 'next/image'
import picture from '@/assets/avatars/img.jpeg'
import picture2 from '@/assets/avatars/img2.jpeg'
import CommentSection from '../CommentSection'
import { getPostsByPostId } from '@/services/posts'
import { getPostsComments } from '@/services/posts'
import { comment } from 'postcss';
import Skelton from '../../ui/skelton';

async function Post
  ({ isDialogPost = false, postId }: any) {


  console.log("Here is out postId" + postId)

  const { post } = await getPostsByPostId(postId)
  const  {comments}  = await getPostsComments(postId)
  console.log( "Comments array ",comments)

  return (
    <div className="mx-auto my-5 max-w-5xl h-screen rounded-full ">
      <div className={`mx-auto flex mb-5 max-w-screen-lg cursor-pointer rounded-xl bg-white
      ${!isDialogPost && 'shadow-lg'} 
      dark:bg-dark-primary dark:text-gray-300` }>

        <div className='mt-6'>
          <UpdownButton />
        </div>
        <div className='flex flex-col items-center w-full p-10 pt-0'>
          <div className='flex w-full mt-6'>
            <Skelton className="text-4xl font-bold bg-skelton h-9 w-[200px] text-left shrink-0 dark:text-white" />
            <div className='flex place-content-around items-center w-full'>
            
            
              <Skelton
                className={`rounded-lg bg-accent w-max text-white whitespace-nowrap px-10 py-3 h-fit text-sm font-semibold dark:bg-dark-background-secondary dark:text-white`} />
                <div className="flex h-10 items-center p-1.5">
             <Skelton className='rounded-full bg-skelton h-8 w-8' />
              </div>

            </div>
          </div>
          <Skelton className='w-full p-7 pl-0 pt-10 mt-0 text-gray-600 bg-skelton dark:text-white leading-loose h-20 text-left'
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
          <div className="w-full border-b mt-5 mb-9 border-gray-500 pr-5"></div>

          <div className='w-full'>

          {comments.length !== 0 && <CommentSection comment={comments[0].content} />}
          {comments.length !== 0 && <CommentSection comment={comments[0].content} />}
          {comments.length !== 0 && <CommentSection comment={comments[0].content} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post

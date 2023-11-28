'use client'
// import { useState } from 'react'
import { BsBookmarkFill as BookmarkIcon } from 'react-icons/bs'
import { TbMessageCircle2Filled as MessageIcon } from 'react-icons/tb'
import { timeFormatInHours } from '@/utils/helper'
import { useRouter } from 'next/navigation'

import { channels } from '@/utils/data'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog/simpleDialog'
// import { useSelector } from 'react-redux'
import { ChannelPill, Chip } from '.'
// import { ReactionOverlap } from './reaction'
// import { channels } from '@/utils/data'
// import SingleFeed from '@/app/(pages)/feed/[id]/page'
// import { Dialog, DialogContent } from '../ui/dialog'

const Card = ({ post }: any) => {
  // const channels = useSelector(
  //   (state: any) => state.channels.channelsKeyValuePair,
  // )
  // When a user clicks on a post, a modal is opened with more information about the post.
  // The modal includes the post's tags, which are stored in the `tags` array.
  // This function limits the number of tags displayed to 3.

  // const [modalOpen, setModalOpen] = useState(false)

  // const openModal = (e: any) => {
  //   // e.stopPropagation(); // Prevent click event propagation to parent elements
  //   setModalOpen(true)
  //   pushModalState(id)
  // }

  // const closeModal = () => {
  //   setModalOpen(false)
  //   pushModalState(id)
  // }

  const {
    id,
    created_at,
    updated_at,
    title,
    content,
    slug,
    user_id,
    channel_id,
    author_details: user,
    reaction_summary,
  } = post
  const totalCount = Object.values(reaction_summary).reduce(
    (acc: any, count: any) => acc + count,
    0,
  )
  // Should useEffect be used here?
  // This pushes a new state to the browser's history, which will be used to
  // create a pop up modal when user clicks on the card.
  // On modal render, the url will change in the browser's address bar.
  // When the modal is closed, the url will revert back to the previous state.
  // const pushModalState = (id: any) => {
  //   if (id) {
  //     const modalUrl = `/feed/${id}`
  //     window.history.pushState({ modalUrl }, '', modalUrl)
  //   } else {
  //     const modalUrl = `/feed`
  //     window.history.pushState({ modalUrl }, '', modalUrl)
  //   }
  // }

  const router = useRouter()
  return (
    <div
      className="mx-auto mb-5 max-w-screen-md cursor-pointer rounded-xl bg-white shadow-lg dark:bg-dark-primary dark:text-gray-300"
      onClick={() => {
        router.push(`/feeds/feed/${id}`)
      }}>
      <div className="px-10 py-4">
        <div className="mb-8 mt-3 text-4xl font-bold dark:text-white">
          {title}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between max-md:block">
            <div className="flex items-center">
              <div className="-z-2">
                <div className="static rounded-xl ">
                  <img
                    className="inline-block w-[60px] rounded-lg object-contain ring-2 ring-white dark:ring-gray-800"
                    src={user?.profile_picture_url}
                    alt="user-picture"
                  />
                </div>
              </div>
              <div className="ml-2 text-sm">
                <div className="ml-4 flex flex-col">
                  <p
                    className="text-lg leading-none text-gray-900 dark:text-gray-300"
                    aria-label="user-name">
                    {user?.name}
                  </p>
                  <p className="text-slate-500 dark:text-gray-400">
                    {timeFormatInHours(created_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-end pb-2 pt-4">
              <div className="flex flex-col sm:flex-row">
                <ChannelPill
                  name={channels[channel_id]?.name}
                  bgColor={'bg-accent'}
                />
              </div>
            </div>
          </div>
          <p
            aria-label="content"
            className="pt-8 text-base text-gray-700 dark:text-gray-300">
            {content}
          </p>
          <div className="mb-10 mt-6 flex items-center justify-between max-md:flex-col max-md:gap-[20px]">
            <div className="flex items-center justify-center gap-3">
              {/* bg-[#F9F9F9] bg on the message button before */}
              <div className="flex rounded-full bg-background dark:bg-gray-700 dark:text-gray-300">
                <button className="p text-icon-light dark:text-icon-dark flex items-center space-x-2 p-2 font-black">
                  <BookmarkIcon color="#D2D3D5" />
                </button>
              </div>
              <div className="flex rounded-full bg-background dark:bg-gray-700 dark:text-gray-300">
                <button className="p flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300">
                  <MessageIcon color="#D2D3D5" />
                  <span className="font-light dark:text-gray-300">
                    Add response{' '}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex">
              <Chip title="Reactions">
                <div className="ml-4 text-sm text-gray-400">
                  {' '}
                  <>{totalCount}</>
                </div>
              </Chip>

              <Chip className={'ml-4'} title="Comments">
                <div className="ml-4 text-sm text-gray-400">{0}</div>
              </Chip>
            </div>

            {/* <ReactionOverlap reactions={reactions} likes={likes} /> */}
          </div>
        </div>
      </div>

      {/* {modalOpen && (
        <Dialog defaultOpen>
          <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
            <div className="mb-10 max-h-screen overflow-y-auto dark:bg-dark-background">
              <SingleFeed postId={id} />
            </div>
          </DialogContent>
        </Dialog>
      )} */}
    </div>
  )
}

export default Card

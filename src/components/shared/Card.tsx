import { timeFormatInHours } from '@/utils/helper'
import { channels } from '@/utils/data'
import { ChannelPill, Chip } from '.'
import Image from 'next/image'
import Link from 'next/link'
import PostActionBar from './PostActionBar'

const Card = ({ post }: any) => {
  const {
    id,
    created_at,
    title,
    content,
    channel_id,
    author_details: user,
    reaction_summary,
  } = post
  const totalCount = Object.values(reaction_summary).reduce(
    (acc: any, count: any) => acc + count,
    0,
  )

  return (
    <>
      <div className="mx-auto mb-5 max-w-screen-md cursor-pointer rounded-xl bg-white shadow-lg dark:bg-dark-primary dark:text-gray-300">
        <Link href={`/feeds/feed/${id}`}>
          <div className="px-10 py-4">
            <div className="mb-8 mt-3 text-left text-4xl font-semibold dark:text-white">
              {title}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between max-md:block">
                <div className="flex items-center">
                  <div className="-z-2">
                    <div className="static rounded-xl ">
                      <Image
                        className="inline-block w-[48px] rounded-full object-contain ring-2 ring-white dark:ring-gray-800"
                        width={48}
                        height={48}
                        src={user?.profile_picture_url}
                        alt="user-picture"
                      />
                    </div>
                  </div>
                  <div className="ml-2 text-sm">
                    <div className="ml-4 flex flex-col items-start">
                      <p
                        className="text-[16px] font-light leading-none text-gray-900 dark:text-gray-300"
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
              <div
                className="pt-8 text-left text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </Link>
        <hr />
        <div className="py-2">
          <PostActionBar linkToFeed={`/feeds/feed/${id}`} />
        </div>
      </div>
    </>
  )
}

export default Card

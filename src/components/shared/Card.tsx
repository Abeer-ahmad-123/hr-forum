'use client'
import ChannelPill from '@/components/shared/ChannelPill'
import { timeFormatInHours } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import PostActionBar from './PostActionBar'
import PostReactionBar from './PostReactionBar'
import { CustomLink } from './customLink/CustomLink'

const Card = ({ post, channels }: any) => {
  const {
    id,
    created_at,
    title,
    content,
    channel_id,
    author_details: user,
    reaction_summary,
    user_reaction,
    user_has_bookmarked,
    user_id,
    image_url,
  } = post
  const pathName = usePathname()
  const userDetails = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  console.log('post', post)
  return (
    <>
      <div className="mx-auto mb-5 max-w-screen-md cursor-pointer rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
        <CustomLink
          href={
            pathName.includes('/channels/')
              ? `feeds/feed/${id}`
              : ` /feeds/feed/${id}`
          }>
          <div className="px-10 py-4">
            <div className="flex items-center justify-between max-md:block">
              <div className="flex items-center">
                <div className="-z-2">
                  <div className="static rounded-xl ">
                    <img
                      className="inline-block rounded-full object-contain ring-2 ring-white dark:ring-gray-800"
                      width={32}
                      height={32}
                      src={user?.profile_picture_url}
                      alt="user-picture"
                    />
                  </div>
                </div>

                <div className="ml-2 flex flex-col items-start align-baseline">
                  <div className="flex flex-row">
                    <CustomLink
                      href={
                        userDetails?.id === user_id
                          ? '/profile'
                          : `/profile/${user_id}`
                      }>
                      <p
                        className="w-full text-sm font-normal leading-none text-gray-900 hover:bg-gray-200  dark:text-gray-300"
                        aria-label="user-name">
                        {user?.name}

                        {/* Yogesh Choudhary Paliyal */}
                      </p>
                    </CustomLink>
                    <ChannelPill channel_id={channel_id} channels={channels} />
                  </div>

                  <p className="text-xs font-light text-slate-500 dark:text-gray-400">
                    {timeFormatInHours(created_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="my-3 text-start text-[28px] font-semibold dark:text-white">
                {title}
              </div>
              {!image_url ? (
                <div
                  className="text-start text-[15px] text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <img
                  src={image_url}
                  alt="post"
                  height={400}
                  width={300}
                  className="w-full max-w-[400px]"
                />
              )}
            </div>
          </div>
        </CustomLink>

        <PostReactionBar reaction_summary={reaction_summary} postId={id} />
        <hr />

        <div className="py-1">
          <PostActionBar
            linkToFeed={`/feeds/feed/${id}`}
            postId={id}
            bookmark={user_has_bookmarked}
            user_reaction={user_reaction}
          />
        </div>
      </div>
    </>
  )
}

export default Card

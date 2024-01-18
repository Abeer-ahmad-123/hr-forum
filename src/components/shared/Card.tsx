'use client'
import ChannelPill from '@/components/shared/ChannelPill'
import { timeFormatInHours } from '@/utils/helper'
import { EmojiActionInterface, ReactionSummary } from '@/utils/interfaces/card'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { AlertOctagon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostActionBar from './PostActionBar'
import PostReactionBar from './PostReactionBar'
import { CustomLink } from './customLink/CustomLink'

const Card = ({ post, channels, setBookmarkupdated }: any) => {
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
    total_comments,
  } = post
  const pathName = usePathname()
  const userDetails = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  console.log(post)

  const [reactionSummary, setReactionSummary] = useState<ReactionSummary>({
    like_count: 0,
    love_count: 0,
    clap_count: 0,
    celebrate_count: 0,
  })
  const [userReaction, setUserReaction] = useState('')

  const updateReactionArray = (
    reactionArray: ReactionSummary,
    reactionObject: EmojiActionInterface,
  ) => {
    if (reactionObject.action === 'post') {
      incrementReactionCount(`${reactionObject.value}_count`)
    } else if (reactionObject.action === 'update') {
      updateReactions(
        `${reactionObject.value}_count`,
        `${reactionObject.previousAction}_count`,
      )
    } else if (reactionObject.action === 'delete') {
      deleteReaction(`${reactionObject.value}_count`)
    }

    return reactionArray
  }

  const updateReactions = (increment: string, decrement: string) => {
    setReactionSummary({
      ...reactionSummary,
      [increment]: reactionSummary[increment as keyof ReactionSummary] + 1,
      [decrement]: reactionSummary[decrement as keyof ReactionSummary] - 1,
    })
  }

  const incrementReactionCount = (increment: string) => {
    setReactionSummary({
      ...reactionSummary,
      [increment]: reactionSummary[increment as keyof ReactionSummary] + 1,
    })
  }
  const deleteReaction = (decrement: string) => {
    setReactionSummary({
      ...reactionSummary,
      [decrement]: reactionSummary[decrement as keyof ReactionSummary] - 1,
    })
  }

  useEffect(() => {
    if (reaction_summary) {
      setReactionSummary(reaction_summary)
    }
  }, [reaction_summary])

  useEffect(() => {
    if (user_reaction) {
      setUserReaction(user_reaction)
    }
  }, [user_reaction])

  return (
    <>
      <div
        key={Math.random()}
        className="mx-auto mb-5 max-w-screen-md cursor-pointer rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
        <CustomLink
          href={
            pathName.includes('/channels/')
              ? `feeds/feed/${id}`
              : ` /feeds/feed/${id}`
          }>
          <div className="px-10 py-4">
            <div className="flex flex-row justify-between">
              <div className="flex w-full  flex-row items-center justify-between max-custom-sm:items-start ">
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
                        </p>
                      </CustomLink>
                      <ChannelPill
                        channel_id={channel_id}
                        channels={channels}
                      />
                    </div>

                    <p className="justify-start text-xs font-light text-slate-500 dark:text-gray-400">
                      {timeFormatInHours(created_at)}
                    </p>
                  </div>
                </div>

                {post?.user_has_reported && (
                  <div className="flex w-fit cursor-default items-center justify-center rounded-md  p-1 text-[7px] font-medium text-gray-500 ring-inset ring-gray-500/10 custom-sm:ring-1">
                    {/*  */}
                    <div className="group relative inline-block">
                      <AlertOctagon
                        size={15}
                        className="hidden cursor-pointer max-custom-sm:block"
                      />
                      <div className="absolute bottom-full left-[50px] hidden -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 px-[5px] py-[2px] text-[0.5rem] text-gray-200 group-hover:block max-md:left-[50px]">
                        Reported
                      </div>
                    </div>
                    {/*  */}

                    <span className="max-custom-sm:hidden">Reported</span>
                  </div>
                )}
              </div>

              {/* {post?.user_has_reported && (
                <div className="inline-flex cursor-default items-center rounded-md bg-gray-50 px-2 py-1 text-[9px] font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10">
                  {' '}
                  Reported
                </div>
              )} */}
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

        <PostReactionBar
          reaction_summary={reactionSummary}
          postId={id}
          total_comments={total_comments}
        />
        <hr />

        <div className="py-1">
          <PostActionBar
            linkToFeed={`/feeds/feed/${id}`}
            postId={id}
            bookmark={user_has_bookmarked}
            userReaction={userReaction}
            setUserReaction={setUserReaction}
            setBookmarkupdated={setBookmarkupdated}
            updateReactionArray={updateReactionArray}
            reactionSummary={reactionSummary}
          />
        </div>
      </div>
    </>
  )
}

export default Card

'use client'
import ChannelPill from '@/components/shared/ChannelPill'
import { timeFormatInHours } from '@/utils/helper'
import { EmojiActionInterface, ReactionSummary } from '@/utils/interfaces/card'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostActionBar from './PostActionBar'
import PostReactionBar from './PostReactionBar'
import nProgress from 'nprogress'

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

  const [reactionSummary, setReactionSummary] = useState<ReactionSummary>({
    like_count: 0,
    love_count: 0,
    clap_count: 0,
    celebrate_count: 0,
  })
  const [userReaction, setUserReaction] = useState('')

  const router = useRouter()

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
  const handleNavigateProfile = () => {
    nProgress.start()
    router.push(
      `${userDetails?.id === user_id ? '/profile' : `/profile/${user_id}`}`,
    )
  }

  const handleNavigateFeed = () => {
    nProgress.start()
    router.push(
      `${
        pathName.includes('/channels/')
          ? `feeds/feed/${id}`
          : `/feeds/feed/${id}`
      }`,
    )
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

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])

  return (
    <>
      <div
        key={Math.random()}
        className="mx-auto mb-5 max-w-screen-md cursor-pointer rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
        <div className="px-10 py-4" onClick={handleNavigateFeed}>
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
                <div className="flex flex-row items-center">
                  <p
                    onClick={handleNavigateProfile}
                    className="text-xs font-normal leading-none text-gray-900 hover:bg-gray-200 dark:text-gray-300 
                        max-[380px]:text-[9px] md:text-xs lg:text-sm xl:text-sm"
                    aria-label="user-name">
                    {user?.name}
                  </p>
                  <ChannelPill channel_id={channel_id} channels={channels} />
                </div>

                <p className="text-xs font-light text-slate-500 dark:text-gray-400 max-[380px]:text-[9px] md:text-xs lg:text-sm xl:text-sm">
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

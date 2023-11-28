'use client'
import { useState, Fragment, useEffect } from 'react'
import { reactions, data } from '@/utils/data'
import avatar2 from '../../assets/avatars/image-amyrobson.webp'
import { getPostsByChannelId } from '@/services/posts'
import { useParams } from 'next/navigation'

import { timeFormatInHours } from '@/utils/helper'
import {
  getUserPostReaction,
  updatePostReaction,
  postReactions,
  deleteReactions,
} from '@/services/reactions/reactions'
import { EditPost } from '@/components/Feed'
import { ReactionButton } from '../shared/reaction'
import { CommentCard, NewCommentCard } from '../shared/comment'
import { useSelector } from 'react-redux'

const ContentCard = ({ postId }: any) => {
  const params = useParams()
  const userData = useSelector((state: any) => state.loggedInUserDta.userData)
  console.log(userData)
  const { currentUser, comments: postComments } = data
  const [userReaction, setUserReaction] = useState<any>(null)
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState(postComments)
  const [modalOpen, setModalOpen] = useState(false)

  const updateComment = (x: any, y: any) => {}

  const deleteComment = () => {}

  const getUserReaction = async (postId: any) => {
    try {
      let res = await getUserPostReaction(postId)
      // updateCurrentReaction(res?.data?.data?.reactionType?.toLowerCase());
      setUserReaction(res?.data?.data)
    } catch (err) {
      console.log('err', err)
    }
  }
  const getUserLike = async () => {
    try {
      let token = localStorage.getItem('token')
      token && (await getUserReaction(postId ?? params?.id))
    } catch (err) {
      console.log('err', err)
    }
  }
  const getPost = async () => {
    try {
      let res = await getPostsByChannelId(postId ?? params?.id)

      let data = res?.data?.data
      const totalReactionCount = Object.values(data?.reaction_summary).reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      )

      setPost({ ...data, totalReactionCount })
    } catch (err) {
      console.log('err', err)
    }
  }

  const handleEditPostModal = ({ isEdit }: any) => {
    setModalOpen(!modalOpen)
    isEdit && getPost()
  }

  const addReactions = async (reaction: any, postId: any) => {
    try {
      setEmojiLikesloading()
      let body = {
        reactionType: reaction,
      }

      userReaction?.reactionType != 'None'
        ? await updatePostReaction(body, postId)
        : await postReactions(body, postId)
      await getUserLike()
      setEmojiLikesloading()
      getPost()
    } catch (err) {
      setEmojiLikesloading()
      console.log('err', err)
    }
  }

  const setEmojiLikesloading = () => {
    setLoading((prevValue) => !prevValue)
  }

  const deleteReactions = async (postId: any) => {
    try {
      setEmojiLikesloading()
      await deleteReactions(postId)
      await getUserLike()
      setEmojiLikesloading()
      getPost()
    } catch (err) {
      setEmojiLikesloading()

      console.log('err', err)
    }
  }

  const handleReactions = async (reaction: any) => {
    reaction === 'none'
      ? await deleteReactions(post.id)
      : await addReactions(reaction, post.id)
  }

  useEffect(() => {
    getPost()
    getUserLike()

    // eslint-disable-next-line
  }, [])

  return (
    <div className="mx-auto max-w-6xl bg-transparent text-gray-800 dark:bg-dark-background dark:text-white sm:px-6 lg:px-8">
      <div className="px-4 pb-6 sm:px-0">
        <div className="rounded-lg">
          <div className="mt-4 flex items-center rounded-lg bg-transparent pt-4 dark:bg-dark-background">
            <div className=" flex w-full flex-col">
              <div className="flex flex-col rounded-lg bg-transparent dark:bg-gray-900 dark:text-white">
                <h1
                  className="mb-2 text-2xl font-bold text-gray-900 dark:text-white max-md:text-[18px]"
                  aria-label="post-title">
                  {post?.title}
                </h1>
                <div className="mb-8 mt-1 flex items-center justify-between space-x-4 max-md:flex-col-reverse max-md:items-start max-md:space-x-0">
                  <div className="items-center space-x-4 max-md:space-x-0 md:flex">
                    <a
                      href="#"
                      className="text-blue-500 hover:underline max-md:block">
                      Back to community
                    </a>
                    <a
                      href="#"
                      className="text-blue-500 hover:underline max-md:block">
                      Mute
                    </a>
                    {userData?.id === post?.user_id && (
                      <div
                        onClick={handleEditPostModal}
                        className="cursor-pointer text-blue-500 hover:underline max-md:block">
                        Edit
                      </div>
                    )}
                    <a
                      href="#"
                      className="text-blue-500 hover:underline max-md:block">
                      Report
                    </a>
                  </div>

                  <span className="rounded bg-green-500 px-2 py-1 text-sm text-white max-md:w-[173px]">
                    Diversity and Inclusion
                  </span>
                </div>
                {modalOpen && (
                  <EditPost data={post} close={handleEditPostModal} />
                )}
                <div className="flex bg-transparent dark:bg-gray-900">
                  <div className="mr-4 flex flex-col items-start justify-start">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={post?.author_details?.profile_picture_url}
                      alt="avatar"
                    />
                    <ReactionButton
                      onReact={handleReactions}
                      post={post}
                      userReaction={userReaction}
                      loading={loading}
                    />
                  </div>
                  <div className="flex w-full flex-col justify-between space-y-1">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                          {post?.author_details?.username}
                        </h2>
                        <span className="text-sm text-gray-500 dark:text-gray-300">
                          {timeFormatInHours(post?.created_at)}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4 overflow-auto break-words text-gray-600 dark:text-gray-300">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post?.content,
                        }}
                        className="text-sm font-light dark:text-gray-300"></p>
                      <div className="mt-3 flex space-x-2">
                        {post &&
                          reactions.slice(1).map((reaction, index) => {
                            let reactionCount =
                              post?.reaction_summary[reaction?.name + '_count']
                            if (reactionCount > 0)
                              return (
                                <button
                                  key={index}
                                  className="flex items-center space-x-1 text-gray-500 dark:text-gray-300">
                                  <span>{reaction.emoji}</span>
                                  {post?.reaction_summary && (
                                    <span>
                                      {
                                        post?.reaction_summary[
                                          reaction?.name + '_count'
                                        ]
                                      }
                                    </span>
                                  )}
                                </button>
                              )
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-10 mt-8 flex bg-transparent dark:bg-gray-900">
                  <div className="mr-4 flex flex-col items-start justify-start">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={avatar2.src}
                      alt="avatar"
                    />
                  </div>
                  <div className="flex w-full flex-col justify-between space-y-1">
                    <div className="flex w-full flex-col justify-between space-y-1">
                      <textarea
                        autoFocus={false}
                        className="w-100 mr-4 h-20 resize-none rounded-md border-[1px] px-4 py-2 dark:bg-dark-primary"
                        placeholder="Type a reply to juliusomo"></textarea>
                    </div>
                    <div className="flex justify-start">
                      <button className=" mt-3 rounded-full bg-primary px-3 py-1 text-white hover:bg-blue-600">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
                {/* Add 32 comments down here */}
                <h2 className="font-bold">32 Comments</h2>
                {comments.map((comment) => (
                  <Fragment key={comment.id}>
                    {/* Add a background color to the comment cards */}
                    <div className="mb-4  dark:bg-dark-primary">
                      {/* Render a single comment */}
                      <CommentCard
                        className="bg-gray-200"
                        key={`${comment.id} ${comment.user.username}`}
                        comment={comment}
                        currentUser={data.currentUser}
                        updateComment={updateComment}
                        deleteComment={deleteComment}
                      />
                    </div>
                    {/* Render replies if available */}
                    {comment.replies && comment.replies.length ? (
                      <div className=" ml-[22px]  border-l-2 pl-10 dark:bg-dark-primary">
                        {comment.replies.map((reply) => (
                          <div className=" dark:bg-dark-primary" key={reply.id}>
                            {/* Render a single reply */}
                            <CommentCard
                              key={`${reply.id} ${reply.user.username}`}
                              comment={reply}
                              currentUser={currentUser}
                              updateComment={(replyId: any, data: any) => {
                                updateComment(replyId, {
                                  ...data,
                                  updateReply: !data.addReply,
                                })
                              }}
                              deleteComment={deleteComment}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      ''
                    )}
                  </Fragment>
                ))}
                <NewCommentCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentCard

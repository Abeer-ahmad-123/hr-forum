'use client'
import CommentsLogic from '@/components/CommentsLogic'
import Report from '@/components/Report/Report'
import type { SinglePostWithDialogProps } from '@/components/SinglePostWithDialog'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { getChannels } from '@/services/channel/channel'
import { getComment, getPostsComments } from '@/services/comments'
import { getPostByPostId } from '@/services/posts'
import type { ReactionSummary } from '@/utils/interfaces/card'
import type { ChannelInterface } from '@/utils/interfaces/channels'
import type { CommentInterface, PostsInterface } from '@/utils/interfaces/posts'
import { SearchParams } from '@/utils/interfaces/renderFeeds'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SignInDialog from '../NewPost/SignInDialog'
import ArrowLeft from '@/assets/icons/ArrowLeftIcon'
import DeletePost from './DeletePost'
import PostSkelton from './PostSkelton'

import Card from '../Card'
import { userData } from '@/utils/interfaces/userData'

type Props = Omit<SinglePostWithDialogProps, 'id'> & {
  postId: string
  isDialogPost?: boolean
  searchParams?: { commentId?: string; replyId?: string } | SearchParams
}
const Post = ({ isDialogPost = false, postId, searchParams, data }: Props) => {
  const { id } = useParams()
  postId = postId ? postId : String(id)
  const paramsSearch = useSearchParams()
  const [commentResult, setCommentResult] = useState<CommentInterface[] | null>(
    data?.comments?.comments ?? null,
  )
  const [reactionSummary, setReactionSummary] = useState<ReactionSummary>({
    like_count: 0,
    love_count: 0,
    clap_count: 0,
    celebrate_count: 0,
  })
  const [paginationResult, setPaginationResult] = useState(
    data?.comments?.pagination,
  )

  const [reported, setReported] = useState<boolean>(false)
  const [channels, setChannels] = useState<ChannelInterface[] | []>([])
  const [post, setPost] = useState<PostsInterface | null>(data?.post ?? null)
  const router = useRouter()
  const [showSignModal, setShowSignModal] = useState<boolean>(false)
  const [userData, setUserData] = useState<userData | undefined>()
  const { handleRedirect } = useFetchFailedClient()

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)

  const userId = userData?.id ?? null

  const getPost = async () => {
    const response = await getPostByPostId(postId ? String(postId) : '', {
      loadUser: true,
      userId: userId?.toString(),
    })
    if (!response.success) {
      router.push('/feeds')
    }

    setPost(response?.data?.post)
  }

  const commentId =
    (searchParams as { commentId: string })?.commentId ??
    Number(paramsSearch.get('commentId'))
  const replyId =
    (searchParams as { replyId: string })?.replyId ??
    Number(paramsSearch.get('replyId'))

  const getPostComments = async () => {
    if (commentId) {
      const { comment } = await getComment(
        commentId ? String(commentId) : '',
        {
          loadNestedComments: replyId ? true : false,
          allReplies: replyId ? true : false,
        },
        userId?.toString(),
      )
      setCommentResult(comment)
    } else {
      let { comments, pagination } = await getPostsComments(
        String(postId),
        {},
        userId?.toString(),
      )
      setCommentResult(comments)
      setPaginationResult(pagination)
    }
  }

  const getChannel = async () => {
    try {
      const { channels: channelsData } = await getChannels()
      setChannels(channelsData)
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleRedirect({ error })
      }
    }
  }

  const handleBack = () => {
    router.back()
  }

  useEffect(() => {
    if (commentId || postId) getPostComments()
  }, [commentId, postId, userData])

  useEffect(() => {
    if (!data) getPost()
  }, [postId, userData, reported])

  useEffect(() => {
    if (!channels.length) getChannel()
  }, [])

  return post && post?.author_details?.name && commentResult !== null ? (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white sm:max-w-[500px]">
          <Report
            reportType="post"
            setOpenDialog={setOpenDialog}
            postId={postId ? String(postId) : ''}
            getPostCommets={() => {}}
            setReported={setReported}
            setReportedReplyId={() => {}}
            setDeletedCommentId={() => {}}
            getUserSpecificDetailFunc={() => {}}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="bg-white sm:max-w-[500px]">
          <DeletePost
            setOpenDeleteDialog={setOpenDeleteDialog}
            postId={post?.id as unknown as string}
            setReported={() => {}}
            updatePosts={() => {}}
          />
        </DialogContent>
      </Dialog>
      <div
        className={`mx-auto max-w-5xl  rounded-full ${
          isDialogPost ? 'mb-5' : 'my-5'
        }`}>
        <div
          className={`mx-auto mb-5 flex max-w-[759px] rounded-[16px] bg-bg-primary 
      ${!isDialogPost && 'shadow-lg dark:border-gray-700 dark:shadow-xl'} 
      dark:bg-bg-primary-dark dark:text-gray-300 `}>
          <div
            className={`flex w-full flex-col gap-5  pt-0 ${
              isDialogPost ? '' : 'px-[24px] pb-[20px] pt-[28px]'
            }`}>
            <button
              onClick={handleBack}
              className="flex h-[40px]  w-[104px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] bg-bg-tertiary px-[15px]  py-[8px] text-[12px] opacity-60 dark:bg-bg-tertiary-dark dark:text-white  ">
              <ArrowLeft className="text-black opacity-60 dark:text-bg-tertiary dark:opacity-40" />{' '}
              <span className="tetx-black dark:text-white">Go back</span>
            </button>

            <div className="w-full ">
              <Card
                key={1}
                post={post}
                channels={channels}
                hideComments="w-full"
                getUserSpecificDetailFunc={() => {}}
              />
            </div>

            <div className="w-full">
              <CommentsLogic
                postId={postId}
                commentResult={data?.comments?.comments || commentResult}
                paginationResult={
                  data?.comments?.pagination || paginationResult
                }
                user_reaction={post?.user_reaction}
                reaction_summary={post?.reaction_summary}
                getPostCommets={getPostComments}
                reactionSummary={reactionSummary}
                setReactionSummary={setReactionSummary}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog setShowSignModal={setShowSignModal} />
      </Dialog>
    </>
  ) : (
    <PostSkelton />
  )
}

export default Post

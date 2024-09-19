'use client'
import PostBar from '@/components/shared/new-post/NewPostModal'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getSearchPosts } from '@/services/search'
import { setCommentCountInStore, setPosts } from '@/store/Slices/postSlice'
import { getChannelIdByChannelName } from '@/utils/channels'
import { makeCommentNumberKeyValuePair } from '@/utils/helper'
import { StoreChannels } from '@/utils/interfaces/channels'
import { FeedProps } from '@/utils/interfaces/feeds'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface, PostsInterfaceStore } from '@/utils/interfaces/posts'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import NoPosts from '../Cards/NoMore'
import { Card } from '../shared'
import CircularProgress from '../ui/circularProgress'

const Feeds = ({
  channelSlug,
  initialPosts,
  channels,
  morePosts,
  searchParams,
  path,
  user,
}: FeedProps) => {
  const [posts, updatePosts] = useState<Array<PostsInterface>>(
    initialPosts || [],
  )

  const storePosts = useSelector(
    (state: PostsInterfaceStore) => state.posts.posts,
  )

  const channelsInStore = useSelector(
    (state: StoreChannels) => state?.channels.channels,
  )
  const [page, setPage] = useState(2)
  const dispatch = useDispatch()
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  const [ref, inView] = useInView()
  let noMorePosts = useRef(morePosts)
  const [addPost, setAddPost] = useState<boolean>(false)
  const getPosts = async () => {
    let _data: any = {}
    if (channelSlug) {
      if (!searchParams.search) {
        const getChannelId = getChannelIdByChannelName(
          channelSlug,
          // @ts-ignore
          channelsInStore || channels,
        )
        const { data } = await getPostsByChannelId({
          id: getChannelId,
          loadReactions: true,
          loadUser: true,
          pageNumber: page,
        })
        _data = data
      } else if (searchParams.search) {
        const getChannelId =
          path === '/channels' && channelSlug
            ? getChannelIdByChannelName(channelSlug, channels) ?? undefined
            : undefined

        const { data } = await getSearchPosts({
          search: searchParams.search,
          userID: userData.id,
          channelID: getChannelId,
        })

        _data = data
      }
    } else {
      if (!searchParams.search) {
        {
          const { data } = await getAllPosts({
            loadReactions: true,
            loadUser: true,
            pageNumber: page,
            userID: userData.id,
          })
          _data = data
        }
      } else {
        const { data } = await getSearchPosts({
          search: searchParams.search,
          userID: userData.id,
        })

        _data = data
      }
    }

    setPage(page + 1)
    noMorePosts.current =
      _data?.pagination?.CurrentPage !== _data?.pagination?.TotalPages
    updatePosts((prev: PostsInterface[]) => [...prev, ..._data?.posts])
    dispatch(setPosts([...storePosts, ..._data?.posts]))
  }
  const handleCommentCount = () => {
    dispatch(setCommentCountInStore(makeCommentNumberKeyValuePair(posts)))
  }
  useEffect(() => {
    if (inView) {
      getPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    if (searchParams.search || channelSlug) {
      if (path === '/saved' && storePosts.length > 0) return
      updatePosts([...initialPosts])
      dispatch(setPosts([...initialPosts]))
    } else if (!searchParams.search && initialPosts.length) {
      updatePosts([...initialPosts])
      dispatch(setPosts([...initialPosts]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPosts])

  useEffect(() => {
    handleCommentCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts])

  useEffect(() => {
    noMorePosts.current = morePosts
  }, [morePosts])

  return (
    <>
      {path !== '/saved' && user && (
        <div className="mb-5">
          <PostBar
            setAddPost={setAddPost}
            addPost={addPost}
            path={path}
            channels={channels}
          />
        </div>
      )}

      <div className="flex min-h-[70vh] w-full max-w-[759px] flex-col gap-5">
        {!addPost && (
          <>
            {!!posts?.length ? (
              posts?.map((post: any, index: number) => {
                return (
                  <Card
                    key={index}
                    post={post}
                    channels={channels || channelsInStore}
                    updatePosts={updatePosts}
                    posts={posts}
                  />
                )
              })
            ) : (
              <NoPosts />
            )}
          </>
        )}

        {!!posts?.length && !addPost && addPost && noMorePosts?.current && (
          <CircularProgress incommingRef={ref} />
        )}
      </div>
    </>
  )
}

export default Feeds

'use client'
import PostBar from '@/components/shared/new-post/NewPostModal'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getSearchPosts } from '@/services/search'
import { getChannelIdByChannelName } from '@/utils/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface, PostsInterfaceStore } from '@/utils/interfaces/posts'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import NoPosts from '../Cards/NoMore'
import { Card } from '../shared'
import CircularProgress from '../ui/circularProgress'
import { setCommentCountInStore, setPosts } from '@/store/Slices/postSlice'
import { FeedProps } from '@/utils/interfaces/feeds'
import { makeCommentNumberKeyValuePair } from '@/utils/helper'

const Feeds = ({
  channelSlug,
  initialPosts,
  channels,
  morePosts,
  searchParams,
  path,
}: FeedProps) => {
  const [posts, updatePosts] = useState<Array<PostsInterface>>([])
  const storePosts = useSelector(
    (state: PostsInterfaceStore) => state.posts.posts,
  )
  const [page, setPage] = useState(2)
  const dispatch = useDispatch()
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  const [ref, inView] = useInView()
  let noMorePosts = useRef(morePosts)

  const getPosts = async () => {
    let _data: any = {}
    if (channelSlug) {
      if (!searchParams.search) {
        const getChannelId = getChannelIdByChannelName(channelSlug, channels)
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
      updatePosts([...initialPosts])
      dispatch(setPosts([...initialPosts]))
    } else if (!searchParams.search && initialPosts.length) {
      updatePosts([...initialPosts])
      dispatch(setPosts([...initialPosts]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPosts])

  useEffect(() => {
    if (searchParams.search || channelSlug) {
      updatePosts([...storePosts])
    } else if (!searchParams.search && storePosts.length) {
      updatePosts([...storePosts])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storePosts])

  useEffect(() => {
    handleCommentCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts])

  useEffect(() => {
    noMorePosts.current = morePosts
  }, [morePosts])

  return (
    <>
      {path !== '/saved' && (
        <div className="mb-5">
          <PostBar updatePosts={updatePosts} />
        </div>
      )}
      <div className="min-h-[70vh] w-full">
        {!!posts?.length ? (
          posts?.map((post: any, index: number) => {
            return (
              <Card
                key={index}
                post={post}
                channels={channels}
                updatePosts={updatePosts}
                posts={posts}
              />
            )
          })
        ) : (
          <NoPosts />
        )}
        {!!posts?.length && noMorePosts?.current && (
          <CircularProgress incommingRef={ref} />
        )}
      </div>
    </>
  )
}

export default Feeds

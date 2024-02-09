'use client'
import PostBar from '@/components/shared/new-post/NewPostModal'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getSearchPosts } from '@/services/search'
import { getChannelIdByChannelName } from '@/utils/channels'
import { ChannelByIdInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { SearchParams } from '@/utils/interfaces/renderFeeds'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import NoPosts from '../Cards/NoMore'
import { Card } from '../shared'
import CircularProgress from '../ui/circularProgress'
import { setPosts } from '@/store/Slices/postSlice'

interface FeedProps {
  channelSlug?: string | null
  initialPosts: PostsInterface[]
  channels: ChannelByIdInterface[]
  morePosts?: boolean
  searchParams: SearchParams
  path: string
}
const Feeds = ({
  channelSlug,
  initialPosts,
  channels,
  morePosts,
  searchParams,
  path,
}: FeedProps) => {
  const [posts, updatePosts] = useState<Array<PostsInterface>>([])
  const storePosts = useSelector((state: any) => state.posts.posts)
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
  useEffect(() => {
    if (inView) {
      getPosts()
    }
  }, [inView])

  useEffect(() => {
    if (searchParams.search) {
      updatePosts([...initialPosts])
      dispatch(setPosts([...initialPosts]))
    } else if (!searchParams.search && initialPosts.length) {
      updatePosts([...initialPosts])
      dispatch(setPosts([...initialPosts]))
    }
  }, [initialPosts])

  return (
    <>
      {path !== '/saved' && (
        <div className="mb-5">
          <PostBar updatePosts={updatePosts} />
        </div>
      )}
      <div className="min-h-[70vh] w-full">
        {!!storePosts?.length ? (
          storePosts?.map((post: any, index: number) => {
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
        {!!storePosts?.length && noMorePosts?.current && (
          <CircularProgress incommingRef={ref} />
        )}
      </div>
    </>
  )
}

export default Feeds

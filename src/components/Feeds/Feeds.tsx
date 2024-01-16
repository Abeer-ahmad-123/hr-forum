'use client'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getSearchPosts } from '@/services/search'
import { getChannelIdByChannelName } from '@/utils/channels'
import { ChannelByIdInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { SearchParams } from '@/utils/interfaces/renderFeeds'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import NoPosts from '../Cards/NoMore'
import { Card } from '../shared'
import CircularProgress from '../ui/circularProgress'

// Feed is a functional component that takes data and displays it as cards
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
  const [posts, setPosts] = useState(
    ...[initialPosts.filter((post) => !post.user_has_reported)],
  )
  const [page, setPage] = useState(2)
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
    const filteredPosts = _data?.posts?.filter(
      (post: PostsInterface) => !post?.user_has_reported || post.id == 32, //
    )
    debugger

    setPage(page + 1)
    noMorePosts.current =
      _data?.pagination?.CurrentPage !== _data?.pagination?.TotalPages
    setPosts([...posts, ...filteredPosts])
  }
  useEffect(() => {
    if (inView) {
      getPosts()
    }
  }, [inView])

  return (
    <div className=" min-h-[70vh]  w-full">
      {!!posts?.length ? (
        posts?.map((post: any) => {
          return <Card key={post?.title} post={post} channels={channels} />
        })
      ) : (
        <NoPosts />
      )}
      {noMorePosts?.current && <CircularProgress incommingRef={ref} />}
    </div>
  )
}

export default Feeds

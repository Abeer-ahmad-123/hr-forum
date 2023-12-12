'use client'
import { Card } from '../shared'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getChannelIdByChannelName } from '@/utils/channels'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import CircularProgress from '../ui/circularProgress'


// Feed is a functional component that takes data and displays it as cards
interface FeedProps {
  channelSlug?: string
}
const Feeds = ({
  channelSlug,
  initialPosts,
  channels,
  morePosts,
}: FeedProps) => {
  const [posts, setPosts] = useState([...initialPosts])
  const [page, setPage] = useState(2)
  const [ref, inView] = useInView()
  let noMorePosts = useRef(morePosts)

  const getPosts = async () => {
    let _data: any = {}
    if (channelSlug) {
      const getChannelId = getChannelIdByChannelName(channelSlug, channels)
      const { data } = await getPostsByChannelId({
        id: getChannelId,
        loadReactions: true,
        loadUser: true,
        pageNumber: page,
      })
      _data = data
    } else {
      const { data } = await getAllPosts({
        loadReactions: true,
        loadUser: true,
        pageNumber: page,
      })
      _data = data
    }

    setPage(page + 1)
    noMorePosts.current =
      _data?.pagination?.CurrentPage !== _data?.pagination?.TotalPages
    setPosts([...posts, ..._data?.posts])
  }

  useEffect(() => {
    if (inView) {
      getPosts()
    }
  }, [inView])
  
  return (
    <div className="min-h-[70vh]">
      {!!posts?.length &&
        posts?.map((post: any) => {
          return <Card key={post?.title} post={post} channels={channels} />
        })}
      {noMorePosts?.current && <CircularProgress incommingRef={ref} />}
    </div>
  )
}

export default Feeds

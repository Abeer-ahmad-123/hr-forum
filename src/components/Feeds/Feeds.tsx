'use client'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getSearchPosts } from '@/services/search'
import { getChannelIdByChannelName } from '@/utils/channels'
import { FeedProps } from '@/utils/interfaces/feeds'
import { PostsInterface } from '@/utils/interfaces/posts'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import NoPosts from '../Cards/NoMore'
import { Card } from '../shared'
import CircularProgress from '../ui/circularProgress'
import NewPostForm from '../shared/NewPost/NewPostForm'
import ChannelsBanner from '../ChannelsBanner'
import { usePathname } from 'next/navigation'
import PostBar from '../shared/NewPost/Postbar'

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

  const [page, setPage] = useState(2)
  const [ref, inView] = useInView()
  let noMorePosts = useRef(morePosts)
  const [addPost, setAddPost] = useState<boolean>(false)
  const pathName = usePathname()

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
          userID: user?.id?.toString(),
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
            userID: user?.id?.toString(),
          })
          _data = data
        }
      } else {
        const { data } = await getSearchPosts({
          search: searchParams.search,
          userID: user?.id?.toString(),
        })

        _data = data
      }
    }

    setPage(page + 1)
    noMorePosts.current =
      _data?.pagination?.CurrentPage !== _data?.pagination?.TotalPages
    updatePosts((prev: PostsInterface[]) => [...prev, ..._data?.posts])
  }

  const renderPostbarOrBanner = () => {
    if (addPost) {
      return <NewPostForm setAddPost={setAddPost} />
    }
    return (
      <div className="mb-5">
        {pathName.includes('/popular') ? (
          ''
        ) : pathName.includes('/saved') && user ? (
          <ChannelsBanner
            channelSlug={channelSlug}
            path={`Saved`}
            setAddPost={setAddPost}
          />
        ) : pathName.includes('/channels') ? (
          pathName.includes('/channels') && (
            <ChannelsBanner
              channelSlug={channelSlug}
              path={'save'}
              setAddPost={setAddPost}
            />
          )
        ) : pathName.includes('/feeds') && user?.id ? (
          <PostBar setAddPost={setAddPost} addPost={addPost} user={user} />
        ) : (
          ''
        )}
      </div>
    )
  }

  useEffect(() => {
    if (inView) {
      getPosts()
    }
  }, [inView])

  useEffect(() => {
    if (searchParams.search || channelSlug) {
      if (path === '/saved') return
      updatePosts([...initialPosts])
    } else if (!searchParams.search && initialPosts.length) {
      updatePosts([...initialPosts])
    }
  }, [initialPosts])

  useEffect(() => {
    noMorePosts.current = morePosts
  }, [morePosts])

  return (
    <>
      {renderPostbarOrBanner()}
      <div className="flex min-h-[70vh] w-full max-w-full flex-col  lg:max-w-[759px] lg:px-0 lg:py-0">
        {!addPost && (
          <>
            {!!posts?.length ? (
              posts?.map((post: any, index: number) => {
                return (
                  <Card
                    key={index}
                    post={post}
                    channels={channels}
                    updatePosts={updatePosts}
                    posts={posts}
                    userDetails={user}
                    getUserSpecificDetailFunc={() => {}}
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

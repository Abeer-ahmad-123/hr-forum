'use server'
import { getChannelIdByChannelName } from '@/utils/channels'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import {
  ChannelByIdInterface,
  ChannelInterface,
} from '@/utils/interfaces/channels'
import { RenderFeedWithLoadingProps } from '@/utils/interfaces/feeds'
import { PostsInterface } from '@/utils/interfaces/posts'
import { BookmarkData } from '@/utils/interfaces/renderFeeds'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getBookmarkPosts } from '../bookmark/bookmarkService'
import { getChannels } from '../channel/channel'
import { getSearchPosts } from '../search'
import { getAllPosts, getPostsByChannelId } from '.'
import { revalidatePath } from 'next/cache'

export async function getGenericPosts({
  channelSlug,
  searchParams,
  path,
}: RenderFeedWithLoadingProps) {
  let channelData: ChannelInterface[] | ChannelByIdInterface[] = []
  let initialPosts: PostsInterface[] | [] = []
  let morePosts = true
  const userDetailsCookies = await cookies().get('user-details')
  try {
    const { channels } = await getChannels()
    channelData = channels
  } catch (error) {
    if (error instanceof Error && error.message) {
      handleFetchFailed(error)
    }
  }

  if (channelSlug) {
    if (
      (channelData as ChannelInterface[]).some(
        (channel: ChannelInterface) => channel.slug === channelSlug,
      )
    ) {
      if (!searchParams.search) {
        try {
          const getChannelId = getChannelIdByChannelName(
            channelSlug,
            channelData as ChannelByIdInterface[],
          )

          const { data } = await getPostsByChannelId({
            id: getChannelId,

            userID:
              (userDetailsCookies?.value &&
                JSON.parse(userDetailsCookies?.value!)?.id) ??
              undefined,

            loadReactions: true,
            loadUser: true,
          })
          initialPosts = data?.posts as PostsInterface[]
          morePosts =
            data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
        } catch (error) {
          if (error instanceof Error) {
            handleFetchFailed(error)
          }
        }
      } else {
        try {
          const getChannelId =
            path === '/channels' && channelSlug
              ? getChannelIdByChannelName(
                  channelSlug,
                  channelData as ChannelByIdInterface[],
                ) || undefined
              : undefined
          const { data } = await getSearchPosts({
            search: searchParams.search,
            userID:
              (userDetailsCookies &&
                JSON.parse(userDetailsCookies?.value!)?.id) ??
              undefined,
            channelID: getChannelId,
          })

          initialPosts = data?.posts as PostsInterface[]
          morePosts =
            data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
        } catch (error) {
          if (error instanceof Error) {
            handleFetchFailed(error)
          }
        }
      }
    } else {
      redirect('/not-found')
    }
  } else {
    if (Object.keys(searchParams).length && searchParams.search) {
      try {
        const { data } = await getSearchPosts({
          search: searchParams.search,
          userID:
            (userDetailsCookies &&
              JSON.parse(userDetailsCookies?.value!)?.id) ??
            '',
        })

        initialPosts = data?.posts as PostsInterface[]
        morePosts =
          data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
      } catch (error) {
        if (error instanceof Error) {
          handleFetchFailed(error)
        }
      }
    } else {
      if (path === '/feed') {
        try {
          const { data } = await getAllPosts({
            loadReactions: true,
            loadUser: true,
            userID:
              (userDetailsCookies &&
                JSON.parse(userDetailsCookies?.value!)?.id) ??
              undefined,
          })
          initialPosts = data?.posts as PostsInterface[]
          morePosts =
            data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
        } catch (error) {
          if (error instanceof Error) {
            handleFetchFailed(error)
          }
        }
      } else if (path === '/saved') {
        try {
          const res = await getBookmarkPosts(
            (userDetailsCookies &&
              JSON.parse(userDetailsCookies?.value!)?.id) ??
              '',
          )

          initialPosts = res.data.Bookmarks.map((item: BookmarkData) => {
            const { userID, postID, bookmarkedAt, post, ...rest } = item
            return {
              ...rest,
              ...post,
              user_has_bookmarked: true,
            }
          })
          morePosts = false
        } catch (error) {
          if (error instanceof Error) {
            handleFetchFailed(error)
          }
        }
      }
    }
  }
  revalidatePath('page')
  return { channelData, initialPosts, morePosts }
}

'use server'
import { getChannelIdByChannelName } from '@/utils/channels'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import {
  ChannelByIdInterface,
  ChannelInterface,
} from '@/utils/interfaces/channels'
import { RenderFeedWithLoadingProps } from '@/utils/interfaces/feeds'
import {
  GET_ALL_POSTS_PROPS,
  Pagination,
  PostsInterface,
} from '@/utils/interfaces/posts'
import { BookmarkData } from '@/utils/interfaces/renderFeeds'
import {
  CustomFetchFunction,
  SuccessAPIResponse,
} from '@/utils/types/customFetch'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { API_BASE_URL } from '..'
import { getBookmarkPosts } from '../bookmark/bookmarkService'
import { getChannels } from '../channel/channel'
import { getSearchPosts } from '../search'
import { DELETE_POST } from './route'

const GET_POSTS_BY_CHANNELID = API_BASE_URL + '/channels/channelId/posts'
const GET_All_POSTS = API_BASE_URL + '/posts'
const GET_POST_BY_ID = API_BASE_URL + '/posts/postId'
const USER_SPECIFIC_POSTS = API_BASE_URL + '/users/userId/posts'
const USER_REACTED_POSTS = API_BASE_URL + '/users/userId/reactions'
const USER_REPORTED_POSTS = API_BASE_URL + '/users/userId/reports/posts'

export async function getAllPosts({
  loadUser = false,
  loadReactions = false,
  channelID,
  userID,
  pageNumber = 1,
  pageSize = 10,
}: GET_ALL_POSTS_PROPS = {}) {
  try {
    let url = `${GET_All_POSTS}?loadUser=${loadUser}&loadReactions=${loadReactions}`
    if (channelID) {
      url += `&channelID=${channelID}`
    }
    if (userID) {
      url += `&userID=${userID}`
    }

    url += `&page=${pageNumber}&pageSize=${pageSize}`
    let res: any = await fetch(url, { next: { revalidate: 0 } })
    if (!res.ok) {
      throw 'error'
    } else {
      const data: SuccessAPIResponse<{
        posts: PostsInterface[]
        pagination: Pagination
      }> = await res.json()
      return data
    }
  } catch (err) {
    throw err
  }
}

export async function getPostsByChannelId({
  id,
  userID,
  loadReactions = true,
  loadUser = true,
  pageNumber = 1,
  pageSize = 10,
}: any) {
  if (id) {
    try {
      const urlWithId = GET_POSTS_BY_CHANNELID.replace(
        'channelId',
        id?.toString(),
      )
      let res = await fetch(
        `${urlWithId}?loadUser=${loadUser}${
          userID ? `&userID=${userID}` : ''
        }&loadReactions=${loadReactions}&page=${pageNumber}&pageSize=${pageSize}`,
        {
          cache: 'no-store',
        },
      )
      const response = await res.json()

      return response
    } catch (err) {
      throw err
    }
  } else {
    return { posts: null }
  }
}

export async function getPostByPostId(
  id: string,
  { loadUser = true, loadReactions = true, userId = '' },
) {
  try {
    const postId = GET_POST_BY_ID.replace('postId', id)

    let res = await fetch(
      `${postId}?loadReactions=${loadReactions}&loadUser=${loadUser}${
        userId ? `&userID=${userId}` : ''
      }`,
      {
        cache: 'no-store',
      },
    )
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function postCreatePostInChannel({
  channelID,
  body,
  customFetch,
  token,
  refreshToken,
}: any) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      refreshToken: refreshToken,
    }
    const requestBody = JSON.stringify(body)

    let res = await customFetch(
      `https://api.enxsis.com/api/v1/channels/${channelID}/posts`,
      {
        method: 'POST',
        headers,
        body: requestBody,
      },
    )
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function feedImageCreateInChannel({
  postId,
  file,
  customFetch,
  token,
  refreshToken,
}: any) {
  try {
    const headers = {
      Accept: 'application/json',
      authorization: `Bearer ${token}`,
      refreshToken: refreshToken,
    }

    let res = await customFetch(
      `https://api.enxsis.com/api/v1/images/posts/${postId}/upload`,
      {
        method: 'POST',
        headers,
        body: file,
      },
    )
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function getUserSpecificPosts(
  userId: string,
  pageNumber = 1,
  { loadReactions = true, loadUser = true },
) {
  try {
    const formatedRequestUrl = USER_SPECIFIC_POSTS.replace('userId', userId)

    let res = await fetch(
      `${`${formatedRequestUrl}?page=${pageNumber}&loadReactions=${loadReactions}&loadUser=${loadUser}`}`,
      {
        cache: 'no-store',
      },
    )
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function getReportedPosts(
  userId: string,
  { page = 1, pageSize = 10 },
) {
  try {
    const formatedRequestUrl = USER_REPORTED_POSTS.replace('userId', userId)

    let res = await fetch(
      `${`${formatedRequestUrl}?page=${page}&pageSize=${pageSize}`}`,
      {
        cache: 'no-store',
      },
    )
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}

export async function getUserReactedPosts(
  userId: string,
  { page = 1, pageSize = 10 },
) {
  try {
    const formatedRequestUrl = USER_REACTED_POSTS.replace('userId', userId)

    let res = await fetch(
      `${`${formatedRequestUrl}?page=${page}&pageSize=${pageSize}`}`,
      {
        cache: 'no-store',
      },
    )
    const response = await res.json()

    return response
  } catch (err) {
    throw err
  }
}

export async function deletePost(
  postId: string,
  customFetch: CustomFetchFunction,
  token: string,
  refreshToken: string,
) {
  try {
    let reportPostUrl = DELETE_POST.replace('postid', postId)

    let res = await customFetch(reportPostUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + token,
        refreshToken: refreshToken,
      },
    })

    return res
  } catch (err) {
    throw err
  }
}

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

  return { channelData, initialPosts, morePosts }
}

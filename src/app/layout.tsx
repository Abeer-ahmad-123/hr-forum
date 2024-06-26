import { LayoutWrapper } from '@/wrappers/index'
import StoreProvider from '@/Providers/StoreProvider'
import '@/assets/styles/globals.css'
import type { Metadata } from 'next'
import { shareMetaData } from '@/utils/share-metadata'
import { Suspense } from 'react'
import { initializeStore } from '@/store'
import { getChannels } from '@/services/channel/channel'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import { getAllPosts } from '@/services/posts'
import { makeCommentNumberKeyValuePair } from '@/utils/helper'
import { cookies } from 'next/headers'
import InitialLoading from '@/components/InitialLoading'

export const metadata: Metadata = {
  title: 'HR-Forum: Shaping the Future of HR',
  ...shareMetaData,
}

const getPosts = async () => {
  const { data } = await getAllPosts({
    loadReactions: true,
    loadUser: true,
    pageNumber: 1,
    pageSize: 10,
  })
  return data
}
async function RootLayout({ children }: any) {
  const { channels } = await getChannels()
  const user = await cookies().get('user-details')?.value
  const token = await cookies().get('refresh-token')?.value
  const refreshToken = await cookies().get('access-token')?.value
  const serverState = {
    channels: {
      channels,
      channelsKeyValuePair: arrayToKeyIdNValueData(channels),
    },
    posts: {
      posts: [],
      commentCount: {},
    },
    colorMode: {
      darkMode: false,
    },
    notFound: {
      notFound: false,
    },
    loggedInUser: {
      token: token || null,
      userData: user
        ? JSON.parse(user)
        : {
            id: null,
            email: '',
            username: '',
            name: '',
            bio: '',
            profilePictureURL: '',
          },
      refreshToken: refreshToken || null,
    },
  }

  return (
    <html lang="en">
      <body className="theme-default dark:bg-dark-background bg-background">
        <StoreProvider serverStore={serverState}>
          <Suspense fallback={null}>
            <LayoutWrapper serverState={serverState}>{children}</LayoutWrapper>
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  )
}

export default RootLayout

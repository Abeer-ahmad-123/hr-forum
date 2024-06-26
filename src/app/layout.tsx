import '@/assets/styles/globals.css'
import StoreProvider from '@/Providers/StoreProvider'
import { getChannels } from '@/services/channel/channel'
import { getAllPosts } from '@/services/posts'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import type { ChannelInterface } from '@/utils/interfaces/channels'
import type { PostsInterface } from '@/utils/interfaces/posts'
import { shareMetaData } from '@/utils/share-metadata'
import { LayoutWrapper } from '@/wrappers/index'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'HR-Forum: Shaping the Future of HR',
  ...shareMetaData,
}

const getPosts: () => Promise<PostsInterface> = async () => {
  const { data } = await getAllPosts({
    loadReactions: true,
    loadUser: true,
    pageNumber: 1,
    pageSize: 10,
  })
  return data
}

async function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body className="theme-default bg-background dark:bg-dark-background">
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

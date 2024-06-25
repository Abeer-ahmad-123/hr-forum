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
  const { posts } = await getPosts()
  const store = initializeStore({
    channels: {
      channels,
      channelsKeyValuePair: arrayToKeyIdNValueData(channels),
    },
    posts: {
      posts,
      commentCount: makeCommentNumberKeyValuePair(posts),
    },
  })

  return (
    <html lang="en">
      <body className="theme-default">
        <StoreProvider serverStore={store.getState()}>
          <Suspense fallback={null}>
            <LayoutWrapper>{children}</LayoutWrapper>
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  )
}

export default RootLayout

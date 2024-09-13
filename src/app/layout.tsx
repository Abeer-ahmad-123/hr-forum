import '@/assets/styles/globals.css'
import StoreProvider from '@/Providers/StoreProvider'
import { getChannels } from '@/services/channel/channel'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import { getUserFromCookie } from '@/utils/cookies'
import { shareMetaData } from '@/utils/share-metadata'
import { LayoutWrapper } from '@/wrappers/index'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { headers } from 'next/headers'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'HR-Forum: Shaping the Future of HR',
  ...shareMetaData,
}

const avenirBold = localFont({
  src: '../assets/fonts/AvenirNextLTPro-Bold.otf',
  variable: '--font-avenir-bold',
  weight: '100 900',
})
const avenirRegular = localFont({
  src: '../assets/fonts/AvenirNextLTPro-Regular.otf',
  variable: '--font-avenir-regular',
})

async function RootLayout({ children }: { children: React.ReactNode }) {
  /**
   * ServerSide state of channels.
   */
  const { channels } = await getChannels()
  const { user, token, refreshToken } = await getUserFromCookie()
  const pathname = headers().get("x-next-pathname")

  const isError = pathname ==="/error";

  /**
   * ServerSide state of redux for initial rendering.
   */
  const serverState = {
    channels: {
      channels,
      channelsKeyValuePair: arrayToKeyIdNValueData(channels),
    },
    posts: {
      posts: [],
      commentCount: {},
    },
   
    loggedInUser: {
      token: token || null,
      userData: user,
      refreshToken: refreshToken || null,
    },
  }

  return (
    <html lang="en">
      <body className={`theme-default bg-bg-secondary ${isError ? "bg-white" : "dark:bg-dark-background dark:text-white"} ${avenirRegular.variable} ${avenirBold.variable} `}>
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

import CardLoading from '@/components/Loading/CardLoading'
import UserCommentsFeeds from '@/components/UserCommentsFeeds'
import { getSpecificUserDetails } from '@/services/user'
import { getUserFromCookie } from '@/utils/cookies'
import { capitalizeWord, filterIdFromName } from '@/utils/helper'
import { ReportedParamsProps } from '@/utils/interfaces/userData'
import { headers } from 'next/headers'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum • User Activity • ${capitalizeWord(
      filterIdFromName(params?.slug),
    )} • Comments`,
  }
}

const UserComments = async ({ params }: ReportedParamsProps) => {
  const pathname = headers().get('x-next-pathname')
  const { user, token } = await getUserFromCookie()

  const parts = pathname?.split('/')
  const lastPart = parts?.[2] // 'james-bob-115'
  const idParts = lastPart?.split('-')
  const userId = idParts?.[idParts.length - 1] // '115'

  // Conditionally call otherdetailData only if userId exists
  let otherUser = null
  if (userId) {
    const otherdetailData = async () => {
      const response = await getSpecificUserDetails(Number(userId))
      return response?.data?.user
    }
    otherUser = await otherdetailData()
  }

  return (
    <Suspense fallback={<CardLoading />}>
      <UserCommentsFeeds
        slug={params.slug}
        userData={otherUser ? otherUser : user}
        accessToken={token}
      />
    </Suspense>
  )
}

export default UserComments

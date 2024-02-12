import ReportedPostsFeeds from '@/components/ReportedPostsFeeds'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function ReportedPosts() {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return <ReportedPostsFeeds />
  }
}

export default ReportedPosts

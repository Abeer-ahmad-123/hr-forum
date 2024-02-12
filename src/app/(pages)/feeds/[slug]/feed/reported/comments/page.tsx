import ReportedCommentsFeeds from '@/components/ReportedCommentsFeeds'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function ReportedComments() {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return <ReportedCommentsFeeds />
  }
}
export default ReportedComments

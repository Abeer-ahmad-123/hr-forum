import { redirect } from 'next/navigation'

export const handleFetchFailed = (error: { message: string }) => {
  if (error.message.includes('fetch failed')) {
    redirect('/error')
  }
}

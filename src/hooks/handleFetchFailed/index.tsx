import { useRouter } from 'next/navigation'

export const handleFetchFailedClient = () => {
  const router = useRouter()
  const handleRedirect = ({ error }: { error: { message?: string } }) => {
    console.log(error)
    if (error?.message?.includes('fetch failed')) {
      router.push('/error')
    }
  }
  return { handleRedirect }
}

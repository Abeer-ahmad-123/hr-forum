import { useRouter } from 'next/navigation'

export const useFetchFailedClient = () => {
  const router = useRouter()

  const handleRedirect = ({ error }: { error: { message?: string } }) => {
    if (error?.message?.includes('fetch failed')) {
      router.push('/error')
    }
  }
  return { handleRedirect }
}

'use client'

import { default as CustomErrorPage } from '@/components/error'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): JSX.Element {
  return <CustomErrorPage message={error.message} />
}

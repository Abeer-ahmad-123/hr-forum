'use client'

import { default as CustomErrorPage } from '@/components/error'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): JSX.Element {
  return error.message ? (
    <div>
      <h2>{error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </button>
    </div>
  ) : (
    <CustomErrorPage />
  )
}

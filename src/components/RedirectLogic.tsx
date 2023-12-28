'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function RedirectLogic({ redirect }: any) {
  const router = useRouter()
  useEffect(() => {
    router.refresh()
    // router.replace(`/feeds/${redirect}`)

    // #TODO: This logic need to be improved
    window.location.href = `/feeds/${redirect}`
  })

  return <></>
}

export default RedirectLogic

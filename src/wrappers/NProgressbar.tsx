'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const NProgressbar = () => {
  return (
    <ProgressBar
      height="2px"
      color="var(--bg-green)"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}

export default NProgressbar

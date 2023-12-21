'use client'
import React, { useState } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { Button } from './button'

//@ts-ignore
const UpdownButton = ({ count }: number) => {
  const [currentVote, setCurrentVote] = useState(0)
  const [color, setColor] = useState('')
  const preVote = 0

  const handleUp = (current: number, previous: number) => {
    if (current > previous) {
      setColor('')
      setCurrentVote(previous)
    } else {
      previous = previous + 1
      setColor('text-primary fill-primary')
      setCurrentVote(previous)
    }
  }

  const handleDown = (current: number, previous: number) => {
    if (current < previous) {
      setColor('')
      setCurrentVote(previous)
    } else {
      current = previous - 1
      setColor('text-rose-500 fill-rose-500')
      setCurrentVote(current)
    }
  }
  return (
    <div className="flex flex-col gap-4 pb-4 pr-6 sm:w-20 sm:gap-0 sm:pb-0">
      {/* upvote */}
      <Button
        onClick={() => {
          handleUp(currentVote, preVote)
        }}
        size="sm"
        className={`${
          color === 'fill-primary text-primary' ? color : ''
        } hover:text-white`}
        variant="ghost"
        aria-label="upvote">
        <ArrowUp className={`h-5 w-5 `} />
      </Button>

      <p className="text-red-700 py-2 text-center text-sm font-medium">
        {currentVote}
      </p>

      {/* downvote */}
      <Button
        onClick={() => {
          handleDown(currentVote, preVote)
        }}
        size="sm"
        className={`${
          color === 'fill-rose-500 text-rose-500' ? color : ''
        } hover:text-white`}
        variant="ghost"
        aria-label="downvote">
        <ArrowDown className={`h-5 w-5`} />
      </Button>
    </div>
  )
}

export default UpdownButton

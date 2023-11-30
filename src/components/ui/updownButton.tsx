'use client'
import React, { useState, useEffect } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

const UpdownButton = ({ count }) => {
    const [currentVote, setCurrentVote] = useState(0);
    const [color, setColor] = useState('')
    const preVote = 0;
    
    const handleUp = (current, previous) => {
        if (current > previous) {
            setColor('')
            setCurrentVote(previous)
        }
        else {
            previous = previous + 1
            setColor('text-primary fill-primary')
            setCurrentVote(previous)
            console.log(currentVote)
        }
    };

    const handleDown = (current, previous) => {
        if (current < previous) {
            setColor('')
            setCurrentVote(previous)
            console.log(currentVote)
        }
        else {
            current = previous - 1
            setColor('text-rose-500 fill-rose-500')
            setCurrentVote(current)
            console.log(currentVote)
        }
    };
    return (
        <div className='flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0'>
            {/* upvote */}
            <Button
                onClick={() => { handleUp(currentVote, preVote) }}
                size='sm'
                className={`${color === 'text-primary fill-primary' ? color : ''} hover:text-white`}
                variant='ghost'
                aria-label='upvote'>
                <ArrowUp
                    className={`h-5 w-5 `}
                />
            </Button>

            <p className='text-center py-2 font-medium text-sm text-red-700'>

                {currentVote}
            </p>

            {/* downvote */}
            <Button
                onClick={() => { handleDown(currentVote, preVote) }}
                size='sm' 
                className={`${color === 'text-rose-500 fill-rose-500' ? color : ''} hover:text-white`}
                variant='ghost'
                aria-label='downvote'>
                <ArrowDown
                    className={`h-5 w-5`}
                />
            </Button>
        </div>

    )
}


export default UpdownButton
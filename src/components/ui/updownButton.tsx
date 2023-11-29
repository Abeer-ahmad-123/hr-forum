import React from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

const UpdownButton = ({count}) => {
    return (
        <div className='flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0'>
            {/* upvote */}
            <Button

                size='sm'
                variant='ghost'
                aria-label='upvote'>
                <ArrowUp
                    className={cn('h-5 w-5 text-zinc-700', {
                        'text-emerald-500 fill-emerald-500': false,
                    })}
                />
            </Button>

            {/* score */}
            <p className='text-center py-2 font-medium text-sm text-red-700'>
                {count}
            </p>

            {/* downvote */}
            <Button

                size='sm'
                variant='ghost'
                aria-label='downvote'>
                <ArrowDown
                    className={cn('h-5 w-5 text-red-700', {
                        'text-red-500 fill-red-500': true,
                    })}
                />
            </Button>
        </div>

    )
}

export default UpdownButton
import React from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'


import { Button } from '@/components/ui/button'
import Skelton from '@/components/ui/skelton';

const UpdownButtonSkelton = () => {
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
            <Skelton className='text-center py-2 h-8 w-16 bg-skelton font-medium text-sm text-red-700' />
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

export default UpdownButtonSkelton
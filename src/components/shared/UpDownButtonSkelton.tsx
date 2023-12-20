import React from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import Skelton from '@/components/ui/skelton'

const UpdownButtonSkelton = () => {
  return (
    <div className="flex flex-col gap-4 pb-4 pr-6 sm:w-20 sm:gap-0 sm:pb-0">
      {/* upvote */}
      <Button size="sm" variant="ghost" aria-label="upvote">
        <ArrowUp
          className={cn('h-5 w-5 text-zinc-700', {
            'fill-emerald-500 text-emerald-500': false,
          })}
        />
      </Button>
      {/* score */}
      <Skelton className="text-red-700 ml-1 h-8 w-12 rounded-lg bg-skelton py-2 text-center text-sm font-medium" />
      {/* downvote */}
      <Button size="sm" variant="ghost" aria-label="downvote">
        <ArrowDown
          className={cn('text-red-700 h-5 w-5', {
            'text-red-500 fill-red-500': true,
          })}
        />
      </Button>
    </div>
  )
}

export default UpdownButtonSkelton

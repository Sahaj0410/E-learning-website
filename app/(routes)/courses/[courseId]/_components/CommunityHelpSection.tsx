import { Button } from '@/components/ui/button'
import React from 'react'

function CommunityHelpSection() {
  return (
    <div className='font-game p-6 border-4  rounded-xl shadow-[3px_3px_0px_#1f1f1f] flex flex-col items-center text-center gap-2 mt-7'>
      <h2 className='text-xl md:text-2xl font-bold text-white'>
        Need Help?
      </h2>
      <p className='text-base md:text-lg text-gray-300'>
        Ask a question in our community
      </p>
      <Button
        className='w-full mt-3 text-base md:text-lg'
        variant='pixel'
      >
        Go to Community
      </Button>
    </div>
  )
}

export default CommunityHelpSection

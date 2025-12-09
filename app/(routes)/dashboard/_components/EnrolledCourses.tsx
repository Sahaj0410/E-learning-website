"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
function EnrolledCourses() {
    const [enrolledCourses, setEnrolledCourses] = React.useState([]);
  return (
    <div className='mt-8'>
        <h2 className='text-3xl mb-2 font-game'>Your enrolled Courses</h2>
        {enrolledCourses?.length==0?
        <div className='flex flex-col items-center gap-3 p-7 border rounded-2xl bg-zinc-900'>
            <Image src={'/books.png'} alt='books' width={90} height={90} />
            <h2 className='font-game text-xl'>You don't have any enrolled courses</h2>
            <Link href={'/courses'}>
            <Button variant={'pixel'} className='font-game text-lg' size={'lg'}>Browse All Courses</Button>
            </Link>
        </div>
          : <div>
            List of courses
          </div>
        }
    </div>

  )
}

export default EnrolledCourses
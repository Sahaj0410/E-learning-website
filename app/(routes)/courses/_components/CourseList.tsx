"use client"

import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import Image from 'next/image';
import { ChartNoAxesColumnIncreasing, ChartNoAxesColumnIncreasingIcon } from 'lucide-react';

type course = {
    id: number;
    title: string;
    desc: string;
    level: string;
    bannerImage: string;
    tags: string;
}

function CourseList() {
      const [courseList,setCourseList] =useState<course[]>([]);
      const [loading,setLoading]=useState(false);
    useEffect(()=>{
        GetAllCourses();
    },[])

  const GetAllCourses=async()=>{
    setLoading(true);
    const result = await axios.get('/api/course');
    console.log(result);
    setCourseList(result?.data);
    setLoading(false);
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-3'>
    {courseList?.map((course, index) => (
    <div key={index} className='border-4 rounded-xl hover:bg-zinc-900 cursor-pointer'>
       <Image src={course.bannerImage} alt={course.title} width={400} height={400}
       className='w-full h-[200px] object-cover rounded-t-xl' />
       <div className='p-4'>
        <h2 className='font-game text-2xl' >{course?.title}</h2>
        <p className='font-game text-xl text-gray-400 line-clamp-3'>{course?.desc}</p>

        <h2 className='bg-zinc-800 flex gap-2 font-game p-1 inline-flex items-center rounded-2xl px-4 mt-3'>
             <ChartNoAxesColumnIncreasingIcon className='h-4 w-4' /> {course?.level}
        </h2>
       </div>
    </div>
))}

    </div>
  )
}

export default CourseList
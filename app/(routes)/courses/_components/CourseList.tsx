"use client"

import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import Image from 'next/image';
import { ChartNoAxesColumnIncreasingIcon } from 'lucide-react';
import Link from 'next/link';

export type course = {
    id: number;
    title: string;
    desc: string;
    level: string;
    bannerImage: string;
    tags: string;
    chapters?: Chapter[];
    userEnrolled?: boolean;
    courseEnrolledInfo?: courseEnrolledInfo;
    completedExercises?: CompletedExercise[];



}

export type courseEnrolledInfo = {
    xpEarned: number;
    enrolledDate : any;
}

export type Chapter = {
    chapterID: number;
    courseID: number;
    desc: string;
    name: string;
    id : number;
    exercises: exercise[] 
}

export type exercise = {
     id:number;
    name: string;
    slug: string;
    xp: number;
    difficulty: string;

}

type CompletedExercise = {
  chapterId: number;
  courseId: number;
  exerciseId : number;
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
      <Link href={'/courses/'+course?.id} key={index}> 
        <div className='border-4 rounded-xl hover:bg-zinc-900 cursor-pointer'>
          <Image src={course.bannerImage} alt={course.title} width={400} height={400}
            className='w-full h-[200px] object-cover rounded-t-xl' />

          <div className='p-4'>
            <h2 className='font-game text-2xl'>{course?.title}</h2>
            <p className='font-game text-xl text-gray-400 line-clamp-3'>{course?.desc}</p>

            <h2 className='bg-zinc-800 flex gap-2 font-game p-1 inline-flex items-center rounded-2xl px-4 mt-3'>
              <ChartNoAxesColumnIncreasingIcon className='h-4 w-4' /> {course?.level}
            </h2>
          </div>
        </div>
      </Link>
    ))}
    </div>
  )
}

export default CourseList

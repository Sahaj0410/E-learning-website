"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import CourseProgressCard from "./CourseProgressCard";

export type EnrolledCourseInfo = {
  bannerImage: string;
  courseId: number;
  completedExercises: number;
  level: string;
  title: string;
  totalExercises: number;
  xpEarned: number;
};

function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserEnrolledCourses = async () => {
      setLoading(true);
      const result = await axios.get("/api/course?courseid=enrolled");
      setEnrolledCourses(result?.data);
      setLoading(false);
    };
    getUserEnrolledCourses();
  }, []);

  return (
    <section className="mt-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl mb-3 font-game">
        Your Enrolled Courses
      </h2>

      {loading && (
        <Skeleton className="w-full h-[160px] sm:h-[180px] rounded-2xl my-5" />
      )}

      {!loading && enrolledCourses.length === 0 && (
        <div className="flex flex-col items-center gap-4 p-6 sm:p-8 border border-zinc-800 rounded-2xl bg-zinc-900 text-center">
          <Image src="/books.png" alt="books" width={80} height={80} />
          <h2 className="font-game text-base sm:text-lg md:text-xl">
            You don't have any enrolled courses
          </h2>
          <Link href="/courses">
            <Button variant="pixel" className="font-game text-sm sm:text-lg">
              Browse All Courses
            </Button>
          </Link>
        </div>
      )}

      {!loading && enrolledCourses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-5">
          {enrolledCourses.map((course) => (
            <CourseProgressCard key={course.courseId} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}

export default EnrolledCourses;

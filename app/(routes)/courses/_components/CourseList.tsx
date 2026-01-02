"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import Link from "next/link";

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
  userSubscription?: "free" | "pro";
};

export type courseEnrolledInfo = {
  xpEarned: number;
  enrolledDate: any;
};

export type Chapter = {
  chapterID: number;
  courseID: number;
  desc: string;
  name: string;
  id: number;
  exercises: exercise[];
};

export type exercise = {
  id: number;
  name: string;
  slug: string;
  exerciseId: string;
  chapterId: number;
  xp: number;
  difficulty: string;
};

type CompletedExercise = {
  chapterId: number;
  courseId: number;
  exerciseId: number;
};

type Props = {
  smallerCard?: boolean;
  maxLimit?: number;
};

function CourseList({ smallerCard = false, maxLimit = 100 }: Props) {
  const [courseList, setCourseList] = useState<course[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllCourses = async () => {
      setLoading(true);
      const result = await axios.get("/api/course/all");
      setCourseList(result?.data);
      setLoading(false);
    };
    getAllCourses();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-3">
      {courseList.map(
        (course, index) =>
          maxLimit > index && (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div className="border-4 rounded-xl hover:bg-zinc-900 transition cursor-pointer h-full flex flex-col">
                <Image
                  src={course.bannerImage}
                  alt={course.title}
                  width={400}
                  height={400}
                  className={`w-full ${
                    smallerCard
                      ? "h-[110px] sm:h-[120px]"
                      : "h-[160px] sm:h-[180px] md:h-[200px]"
                  } object-cover rounded-t-xl`}
                />

                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <h2 className="font-game text-lg sm:text-xl md:text-2xl">
                    {course.title}
                  </h2>

                  <p className="font-game text-sm sm:text-base text-gray-400 line-clamp-3 mt-1 flex-1">
                    {course.desc}
                  </p>

                  <div className="mt-3">
                    <span className="bg-zinc-800 inline-flex items-center gap-2 font-game text-xs sm:text-sm px-3 py-1 rounded-2xl">
                      <ChartNoAxesColumnIncreasingIcon className="h-4 w-4" />
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
      )}

      {loading && (
        <div className="col-span-full text-center text-gray-400 font-game">
          Loading courses...
        </div>
      )}
    </div>
  );
}

export default CourseList;

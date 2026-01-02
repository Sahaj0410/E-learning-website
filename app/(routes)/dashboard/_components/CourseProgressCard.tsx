import React from "react";
import { EnrolledCourseInfo } from "./EnrolledCourses";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  course: EnrolledCourseInfo;
};

function CourseProgressCard({ course }: Props) {
  const progress =
    course?.totalExercises > 0
      ? Math.round(
          (course.completedExercises / course.totalExercises) * 100
        )
      : 0;

  return (
    <Link href={`/courses/${course.courseId}`} className="block">
      <div className="bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-800 cursor-pointer h-full flex flex-col">
        <Image
          src={course?.bannerImage?.trimEnd() || "/placeholder.png"}
          alt={course?.title || "course banner"}
          width={500}
          height={500}
          className="w-full h-[140px] sm:h-[160px] md:h-[180px] rounded-xl object-cover"
        />

        <div className="font-game mt-3 flex flex-col flex-1">
          <h2 className="text-gray-400 text-xs sm:text-sm tracking-wide">
            Course
          </h2>

          <h2 className="text-lg sm:text-xl md:text-2xl mt-1">
            {course?.title}
          </h2>

          <div className="flex justify-between mt-3 text-xs sm:text-sm text-gray-400">
            <p>
              XP:{" "}
              <span className="text-yellow-400">
                {course?.xpEarned}
              </span>
            </p>
            <p>
              {course?.completedExercises}/{course?.totalExercises} Completed
            </p>
          </div>

          <div className="w-full bg-zinc-700 rounded-full h-2 mt-2">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <Button
            variant="pixel"
            size="lg"
            className="w-full mt-4 font-game text-base sm:text-lg pointer-events-none"
          >
            {progress === 0 ? "Start Course" : "Continue"}
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default CourseProgressCard;

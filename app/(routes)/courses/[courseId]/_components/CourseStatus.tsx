"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { course } from "../../_components/CourseList";

type Props = {
  courseDetail?: course;
};

function CourseStatus({ courseDetail }: Props) {
  const [counts, setCounts] = useState<{
    totalExce: number;
    totalxp: number;
  }>({ totalExce: 0, totalxp: 0 });

  useEffect(() => {
    if (courseDetail) getCounts();
  }, [courseDetail]);

  const getCounts = () => {
    let totalExercises = 0;
    let totalxp = 0;

    courseDetail?.chapters?.forEach((chapter) => {
      totalExercises += chapter?.exercises?.length || 0;

      chapter?.exercises?.forEach((exc) => {
        totalxp += exc?.xp || 0;
      });
    });

    setCounts({
      totalExce: totalExercises,
      totalxp,
    });
  };

  const earnedXP = courseDetail?.courseEnrolledInfo?.xpEarned || 0;
  const totalXP = counts.totalxp || 1;
  const xpProgress = Math.min((earnedXP / totalXP) * 100, 100);

  const completedCount = courseDetail?.completedExercises?.length || 0;
  const totalExercises = counts.totalExce || 1;
  const exerciseProgress = Math.min((completedCount / totalExercises) * 100, 100);

  return (
    <div className="font-game p-4 border-4 rounded-xl w-full">
      <h2 className="text-3xl">Course Progress</h2>

      <div className="flex items-center gap-5 mt-4">
        <Image src="/book.png" alt="book" width={50} height={50} />
        <div className="w-full">
          <h2 className="flex justify-between text-2xl">
            Exercises{" "}
            <span className="text-gray-400">
              {completedCount}/{totalExercises}
            </span>
          </h2>

          <Progress value={exerciseProgress} className="mt-2" />
        </div>
      </div>

      <div className="flex items-center gap-5 mt-4">
        <Image src="/star.png" alt="star" width={50} height={50} />
        <div className="w-full">
          <h2 className="flex justify-between text-2xl">
            XP Earned{" "}
            <span className="text-gray-400">
              {earnedXP}/{totalXP}
            </span>
          </h2>

          <Progress value={xpProgress} className="mt-2" />
        </div>
      </div>
    </div>
  );
}

export default CourseStatus;

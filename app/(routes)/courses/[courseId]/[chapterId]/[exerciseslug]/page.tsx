"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Split from "react-split";
import { exercise } from "../../../_components/CourseList";
import ContentSection from "./_components/ContentSection";
import CodeEditor from "./_components/CodeEditor";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export type CourseExercise = {
  chapterId: number;
  courseId: number;
  desc: string;
  name: string;
  exercises: exercise[];
  exerciseData: ExerciseData;
  completedExercises?: {
    chapterId: number;
    exerciseId: string;
  }[];
};

type ExerciseData = {
  chapterId: number;
  courseId: number;
  exerciseName: string;
  exerciseId: string;
  exercisesContent: any;
  xp: number;
  technology: string;
};

function Playground() {
  const router = useRouter();
  const { courseId, chapterId, exerciseslug } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseExerciseData, setCourseExerciseData] =
    useState<CourseExercise>();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    GetExerciseCourseDetail();
  }, [courseId, chapterId, exerciseslug]);

  const GetExerciseCourseDetail = async () => {
    setLoading(true);
    const result = await axios.post("/api/exercise", {
      courseId,
      chapterId,
      exerciseId: exerciseslug,
    });
    setCourseExerciseData(result.data);
    setLoading(false);
  };

  const isExerciseCompleted =
    courseExerciseData?.completedExercises?.some(
      (item) =>
        item.chapterId === Number(chapterId) &&
        String(item.exerciseId) ===
          String(courseExerciseData?.exerciseData?.exerciseId)
    ) ?? false;

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden">
      <div className="flex-1 min-h-0 pb-[72px]">
        <Split
          className="flex h-full w-full flex-col md:flex-row"
          sizes={[45, 55]}
          minSize={200}
          gutterSize={10}
          direction="horizontal"
        >
          <div className="flex flex-col h-full min-h-0">
            <div className="flex-1 overflow-y-auto min-h-0 pr-2">
              <ContentSection
                courseExerciseData={courseExerciseData}
                loading={loading}
              />
            </div>
          </div>

          <div className="flex flex-col h-full min-h-0 border-t md:border-t-0 md:border-l border-zinc-800">
            <CodeEditor
              courseExerciseData={courseExerciseData}
              loading={loading}
              isCompleted={isExerciseCompleted}
            />
          </div>
        </Split>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-40 h-[72px]
                   font-game bg-zinc-900 text-white
                   px-4 sm:px-6
                   flex justify-between items-center
                   shadow-[0_-4px_10px_rgba(0,0,0,0.4)]"
      >
        <Button
          variant="pixel"
          className="text-sm sm:text-xl"
          onClick={() => {
            router.push(`/courses/${courseId}`);
            window.scrollTo(0, 0);
          }}
        >
          Go Back
        </Button>

        <div className="flex gap-2 sm:gap-3 items-center">
          <Image src="/star.png" alt="star" width={32} height={32} />
          <h2 className="text-sm sm:text-xl">
            Earn {courseExerciseData?.exerciseData?.xp ?? 0} XP
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Playground;

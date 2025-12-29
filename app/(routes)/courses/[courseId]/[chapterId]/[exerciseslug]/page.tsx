"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation"; // <-- added useRouter
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
  exercisesContent: ExerciseContent;
  xp: number;
};

type ExerciseContent = {
  content: string;
  hint: string;
  hintXp: string;
  starterCode: any;
  task: string;
};

function Playground() {
  const router = useRouter(); // <-- NEW ✔️
  const { courseId, chapterId, exerciseslug } = useParams();
  const [loading, setLoading] = useState(false);

  const [courseExerciseData, setCourseExerciseData] = useState<CourseExercise>();
  const [exerciseInfo, setExerciseInfo] = useState<exercise>();

  useEffect(() => {
    GetExerciseCourseDetail();
  }, []);

  useEffect(() => {
    courseExerciseData && GetExerciseDetail();
  }, [courseExerciseData]);

  const GetExerciseDetail = () => {
    const exerciseInfo = courseExerciseData?.exercises?.find(
      (item) => item.slug == exerciseslug
    );
    setExerciseInfo(exerciseInfo);
  };

  const GetExerciseCourseDetail = async () => {
    setLoading(true);
    const result = await axios.post("/api/exercise", {
      courseId: courseId,
      chapterId: chapterId,
      exerciseId: exerciseslug,
    });

    setCourseExerciseData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const isExerciseCompleted =
    courseExerciseData?.completedExercises?.some(
      (item) =>
        item.chapterId === Number(chapterId) &&
       String(item.exerciseId) === String(courseExerciseData?.exerciseData?.exerciseId)
    ) ?? false;


const exerciseList = (courseExerciseData?.exercises || []).sort(
  (a, b) => a.id - b.id
);

  const currentIndex = exerciseList.findIndex(
    (item) => item.slug === exerciseslug
  );

  const previousExercise =
    currentIndex > 0 ? exerciseList[currentIndex - 1] : null;
  const nextExercise =
    currentIndex < exerciseList.length - 1
      ? exerciseList[currentIndex + 1]
      : null;

  const navigateToExercise = (slug: string) => {
    router.push(`/courses/${courseId}/${chapterId}/${slug}`);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      <div className="flex-1 min-h-0">
        <Split
          className="flex h-full w-full"
          sizes={[40, 60]}
          minSize={200}
          gutterSize={10}
          direction="horizontal"
        >
          <div className="flex flex-col h-full min-h-0">
            <div className="flex-1 overflow-y-auto pr-2 min-h-0">
              <ContentSection
                courseExerciseData={courseExerciseData}
                loading={loading}
              />
            </div>
          </div>

          <div className="flex flex-col h-full min-h-0">
            <CodeEditor
              courseExerciseData={courseExerciseData}
              loading={loading}
              isCompleted={isExerciseCompleted}
            />
          </div>
        </Split>
      </div>

      {/* FOOTER XP FIXED */}
      <div className="font-game bg-zinc-900 text-white py-3 px-6 fixed bottom-0 left-0 right-0 z-50 flex justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.4)]">
        <Button
          variant="pixel"
          className="text-xl"
          disabled={!previousExercise}
          onClick={() =>
            previousExercise && navigateToExercise(previousExercise.slug)
          }
        >
          Previous
        </Button>

        <div className="flex gap-3 items-center">
          <Image src="/star.png" alt="star" width={40} height={40} />
          <h2 className="text-2xl">
            Earn {courseExerciseData?.exerciseData?.xp ?? 0} XP after completing
          </h2>
        </div>

        <Button
          variant="pixel"
          className="text-xl"
          disabled={!nextExercise}
          onClick={() => nextExercise && navigateToExercise(nextExercise.slug)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Playground;

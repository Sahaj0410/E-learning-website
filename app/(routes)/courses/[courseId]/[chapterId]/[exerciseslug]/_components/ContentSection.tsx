import React from "react";
import { CourseExercise } from "../page";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb } from "lucide-react";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};

function ContentSection({ courseExerciseData, loading }: Props) {
  const contentInfo = courseExerciseData?.exerciseData;

  return (
    <div className="px-5 sm:px-8 md:px-10 pb-6 w-full overflow-x-hidden">
      {loading || !contentInfo ? (
        <Skeleton className="h-[300px] w-full rounded-2xl" />
      ) : (
        <>
          <h2 className="font-game text-xl sm:text-2xl md:text-3xl my-3 break-words">
            {contentInfo.exerciseName}
          </h2>

          <div
            className="
              prose prose-invert max-w-none
              overflow-x-hidden
              break-words
              [&_img]:max-w-full
              [&_pre]:overflow-x-auto
              [&_code]:break-words
            "
            dangerouslySetInnerHTML={{
              __html: contentInfo.exercisesContent?.content || "",
            }}
          />

          <div className="mt-6">
            <h2 className="font-game text-xl sm:text-2xl md:text-3xl mb-2">
              Task
            </h2>
            <div
              className="
                p-4 border rounded-2xl bg-zinc-800
                prose prose-invert max-w-none
                overflow-x-hidden
                [&_pre]:overflow-x-auto
              "
              dangerouslySetInnerHTML={{
                __html: contentInfo.exercisesContent?.task || "",
              }}
            />
          </div>

          <div className="mt-6">
            <h2 className="font-game text-xl sm:text-2xl md:text-3xl mb-2 flex items-center gap-2 text-yellow-400">
              <Lightbulb className="h-5 w-5 shrink-0" />
              Hint
            </h2>
            <div
              className="
                p-4 border rounded-2xl bg-zinc-800
                prose prose-invert max-w-none
                overflow-x-hidden
                [&_pre]:overflow-x-auto
              "
              dangerouslySetInnerHTML={{
                __html: contentInfo.exercisesContent?.hint || "",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ContentSection;

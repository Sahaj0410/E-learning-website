"use client";

import React from "react";
import { course as Course } from "../../_components/CourseList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";

type Props = {
  loading: boolean;
  courseDetail?: Course;
  isEnrolled: boolean;
};

function CourseChapters({ loading, courseDetail, isEnrolled }: Props) {
  const subscription = courseDetail?.userSubscription || "free";
  const isPro = subscription === "pro";

  const isExerciseCompleted = (chapterId: number, slug: string) => {
    return courseDetail?.completedExercises?.some(
      (item) =>
        item.chapterId === chapterId &&
        String(item.exerciseId) === String(slug)
    );
  };

  const EnableExercise = (
    chapterIndex: number,
    exerciseIndex: number,
    chapter: any
  ) => {
    if (!isEnrolled) return false;
    if (isPro) return true;

    const completed = courseDetail?.completedExercises || [];
    if (!courseDetail?.chapters) return false;

    if (completed.length === 0) {
      return chapterIndex === 0 && exerciseIndex === 0;
    }

    const prevExercise = chapter.exercises[exerciseIndex - 1];
    if (
      prevExercise &&
      isExerciseCompleted(chapter.chapterID, prevExercise.slug)
    )
      return true;

    const prevChapter = courseDetail.chapters[chapterIndex - 1];
    if (prevChapter) {
      const prevChCompleted = prevChapter.exercises.every((e: any) =>
        isExerciseCompleted(prevChapter.chapterID, e.slug)
      );
      if (prevChCompleted && exerciseIndex === 0) return true;
    }

    return false;
  };

  return (
    <TooltipProvider delayDuration={200}>
      <section>
        {!courseDetail?.chapters?.length ? (
          <Skeleton className="w-full h-[100px] rounded-2xl" />
        ) : (
          <div className="p-4 sm:p-5 border-4 rounded-2xl">
            {courseDetail.chapters.map((chapter, chapterIndex) => (
              <Accordion type="single" collapsible key={chapterIndex}>
                <AccordionItem value={`item-${chapterIndex}`}>
                  <AccordionTrigger className="p-3 hover:bg-zinc-800 font-game text-base sm:text-xl md:text-3xl">
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-zinc-800 flex items-center justify-center rounded-full text-sm sm:text-base">
                        {chapterIndex + 1}
                      </div>
                      <h2 className="truncate">{chapter.name}</h2>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="p-4 sm:p-6 bg-zinc-900 rounded-xl">
                      {chapter.exercises.map(
                        (exercise: any, exerciseIndex: number) => {
                          const completed = isExerciseCompleted(
                            chapter.chapterID,
                            exercise.slug
                          );

                          const enabled = EnableExercise(
                            chapterIndex,
                            exerciseIndex,
                            chapter
                          );

                          const tooltipMessage = !isEnrolled
                            ? "Enroll to unlock exercises"
                            : !isPro && !enabled
                            ? "Upgrade to Pro"
                            : "Complete previous exercise";

                          return (
                            <div
                              key={exerciseIndex}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 font-game">
                                <h2 className="text-sm sm:text-lg md:text-2xl">
                                  Exercise{" "}
                                  {chapterIndex *
                                    chapter.exercises.length +
                                    exerciseIndex +
                                    1}
                                </h2>
                                <h2 className="text-sm sm:text-lg md:text-2xl">
                                  {exercise.name}
                                </h2>
                              </div>

                              {completed ? (
                                <Button
                                  variant="pixel"
                                  className="bg-green-600 text-black"
                                  disabled
                                >
                                  Completed
                                </Button>
                              ) : enabled ? (
                                <Link
                                  href={`/courses/${courseDetail.id}/${chapter.chapterID}/${exercise.slug}`}
                                >
                                  <Button variant="pixel">
                                    {exercise.xp} XP
                                  </Button>
                                </Link>
                              ) : (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="cursor-not-allowed">
                                      <Button
                                        variant="pixelDisabled"
                                        disabled
                                      >
                                        Locked
                                      </Button>
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="left"
                                    className="font-game text-sm sm:text-lg"
                                  >
                                    {tooltipMessage}
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        )}
      </section>
    </TooltipProvider>
  );
}

export default CourseChapters;

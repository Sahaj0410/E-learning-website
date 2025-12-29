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
} from "@/components/ui/tooltip";
import Link from "next/link";

type Props = {
  loading: boolean;
  courseDetail?: Course;
};

function CourseChapters({ loading, courseDetail }: Props) {
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
    const completed = courseDetail?.completedExercises || [];
    if (!courseDetail?.chapters) return false;

    // First exercise initially unlocked
    if (completed.length === 0) {
      return chapterIndex === 0 && exerciseIndex === 0;
    }

    const slug = chapter.exercises[exerciseIndex].slug;

    // Already completed -> unlocked
    if (isExerciseCompleted(chapter.chapterID, slug)) return true;

    const prevExercise = chapter.exercises[exerciseIndex - 1];

    // Previous exercise in same chapter completed
    if (
      prevExercise &&
      isExerciseCompleted(chapter.chapterID, prevExercise.slug)
    )
      return true;

    // First exercise of next chapter unlocks when prior chapter done
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
    <div>
      {!courseDetail?.chapters?.length ? (
        <Skeleton className="w-full h-[100px] rounded-2xl" />
      ) : (
        <div className="p-5 border-4 rounded-2xl">
          {courseDetail.chapters.map((chapter, chapterIndex) => (
            <Accordion type="single" collapsible key={chapterIndex}>
              <AccordionItem value={`item-${chapterIndex}`}>
                <AccordionTrigger className="p-3 hover:bg-zinc-800 font-game text-3xl">
                  <div className="flex gap-10">
                    <h2 className="h-12 w-12 bg-zinc-800 flex items-center justify-center rounded-full">
                      {chapterIndex + 1}
                    </h2>
                    <h2>{chapter.name}</h2>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="p-7 bg-zinc-900 rounded-xl">
                    {chapter.exercises.map((exercise: any, exerciseIndex: number) => {
                      const completed = isExerciseCompleted(chapter.chapterID, exercise.slug);
                      const enabled = EnableExercise(chapterIndex, exerciseIndex, chapter);

                      return (
                        <div
                          key={exerciseIndex}
                          className="flex items-center justify-between mb-7"
                        >
                          <div className="flex items-center gap-10 font-game">
                            <h2 className="text-2xl">
                              Exercise{" "}
                              {chapterIndex * chapter.exercises.length + exerciseIndex + 1}
                            </h2>
                            <h2 className="text-2xl">{exercise.name}</h2>
                          </div>

                          {completed ? (
                            <Button variant="pixel" className="bg-green-600 text-black">
                              Completed
                            </Button>
                          ) : enabled ? (
                            <Link
                              href={`/courses/${courseDetail.id}/${chapter.chapterID}/${exercise.slug}`}
                            >
                              <Button variant="pixel">{exercise.xp} xp</Button>
                            </Link>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="pixelDisabled" disabled>
                                  Locked
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="font-game text-lg">
                                Please complete previous exercise
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseChapters;

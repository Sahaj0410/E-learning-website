import { CourseChaptersTable, ExerciseTable, completedExerciseTable, coursesTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { eq, and } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { courseId, chapterId, exerciseId } = await req.json();
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress!;

    const chapterResult = await db
      .select()
      .from(CourseChaptersTable)
      .where(
        and(
          eq(CourseChaptersTable.courseID, courseId),
          eq(CourseChaptersTable.chapterID, chapterId)
        )
      );

    const courseResult = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseID, courseId));

    const exerciseResult = await db
      .select()
      .from(ExerciseTable)
      .where(
        and(
          eq(ExerciseTable.courseId, courseId),
          eq(ExerciseTable.chapterId, chapterId),
          eq(ExerciseTable.exerciseId, exerciseId)
        )
      );

    const completed = await db
      .select()
      .from(completedExerciseTable)
      .where(
        and(
          eq(completedExerciseTable.courseId, courseId),
          eq(completedExerciseTable.userId, userEmail)
        )
      );

    return NextResponse.json({
      ...chapterResult[0],
      exerciseData: {
        ...exerciseResult[0],
        technology: courseResult[0].technology?.toLowerCase() || "static"
      },
      completedExercises: completed,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

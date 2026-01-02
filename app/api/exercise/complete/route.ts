import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { completedExerciseTable, EnrolledCourseTable, ExerciseTable, usersTable } from "@/config/schema";
import { eq, and, sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { courseId, chapterId, exerciseId } = await req.json();
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress!;

    const exerciseData = await db.select()
      .from(ExerciseTable)
      .where(and(
        eq(ExerciseTable.courseId, courseId),
        eq(ExerciseTable.chapterId, chapterId),
        eq(ExerciseTable.exerciseId, exerciseId)
      ));

    const xp = exerciseData[0]?.xp ?? 10;

    const alreadyCompleted = await db
      .select()
      .from(completedExerciseTable)
      .where(and(
        eq(completedExerciseTable.courseId, courseId),
        eq(completedExerciseTable.chapterId, chapterId),
        eq(completedExerciseTable.exerciseId, exerciseId),
        eq(completedExerciseTable.userId, userEmail)
      ));

    if (!alreadyCompleted.length) {
      await db.insert(completedExerciseTable).values({
        courseId,
        chapterId,
        exerciseId,
        userId: userEmail
      });

      await db.update(EnrolledCourseTable)
        .set({
          xpEarned: sql`${EnrolledCourseTable.xpEarned} + ${xp}`
        })
        .where(and(
          eq(EnrolledCourseTable.courseId, courseId),
          eq(EnrolledCourseTable.userId, userEmail)
        ));

      await db.update(usersTable)
        .set({
          points: sql`${usersTable.points} + ${xp}`
        })
        .where(eq(usersTable.email, userEmail));
    }

    return NextResponse.json({ success: true, xp });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

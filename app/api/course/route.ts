import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { completedExerciseTable, CourseChaptersTable, coursesTable, EnrolledCourseTable } from '@/config/schema';
import { and, eq, desc } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseIdParam = searchParams.get('courseId');

    const user = await currentUser();

    if (courseIdParam) {
      const courseId = Number(courseIdParam);
      if (Number.isNaN(courseId)) {
        return NextResponse.json({ error: 'Invalid courseId' }, { status: 400 });
      }

      // Fetch single course
      const result = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseID, courseId));

      if (!result || result.length === 0) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }

      // Fetch chapters ordered
      const chapterResult = await db
        .select()
        .from(CourseChaptersTable)
        .where(eq(CourseChaptersTable.courseID, courseId))
        .orderBy(CourseChaptersTable.chapterID);

      // Sort exercises inside each chapter (if exists)
      chapterResult.forEach((chapter: any) => {
        if (chapter.exercises) {
          chapter.exercises.sort((a: any, b: any) => Number(a.xp) - Number(b.xp));
        }
      });

      // Check enrollment
      const enrolledCourse = await db
        .select()
        .from(EnrolledCourseTable)
        .where(
          and(
            eq(EnrolledCourseTable.courseId, courseId),
            eq(EnrolledCourseTable.userId, user?.primaryEmailAddress?.emailAddress || "")
          )
        );

      const isEnrolledCourse = enrolledCourse?.length > 0;

      // Completed Exercises (ordered)
      const completedExercises = await db
        .select()
        .from(completedExerciseTable)
        .where(
          and(
            eq(completedExerciseTable.courseId, courseId),
            eq(completedExerciseTable.userId, user?.primaryEmailAddress?.emailAddress || "")
          )
        )
        .orderBy(
          desc(completedExerciseTable.chapterId),
          desc(completedExerciseTable.exerciseId)
        );

      return NextResponse.json({
        ...result[0],
        chapters: chapterResult,
        userEnrolled: isEnrolledCourse,
        courseEnrolledInfo: enrolledCourse[0] || null,
        completedExercises: completedExercises
      });
    }

    // Fetch all courses if no courseId provided
    const all = await db.select().from(coursesTable);
    return NextResponse.json(
      all.map((course: any) => ({
        ...course,
        userEnrolled: false,
      }))
    );

  } catch (err) {
    console.error('GET /api/course error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

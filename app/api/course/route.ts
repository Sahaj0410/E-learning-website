import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import {
  completedExerciseTable,
  CourseChaptersTable,
  coursesTable,
  EnrolledCourseTable,
  usersTable
} from '@/config/schema';
import { and, eq, desc, asc, inArray } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseIdParam = searchParams.get('courseId');

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "";

    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail))
      .limit(1);

    const subscription = dbUser[0]?.subscriptionStatus || "free";

    if (courseIdParam) {
      const courseId = Number(courseIdParam);
      if (Number.isNaN(courseId)) {
        return NextResponse.json({ error: 'Invalid courseId' }, { status: 400 });
      }

      const courseQuery = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseID, courseId));

      if (!courseQuery.length) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }

      const chapterResult = await db
        .select()
        .from(CourseChaptersTable)
        .where(eq(CourseChaptersTable.courseID, courseId))
        .orderBy(asc(CourseChaptersTable.chapterID));

      chapterResult.forEach((chapter: any) => {
        if (chapter.exercises) {
          chapter.exercises.sort((a: any, b: any) => Number(a.xp) - Number(b.xp));
        }
      });

      const enrolledCourse = await db
        .select()
        .from(EnrolledCourseTable)
        .where(
          and(
            eq(EnrolledCourseTable.courseId, courseId),
            eq(EnrolledCourseTable.userId, userEmail)
          )
        );

      const completedExercises = await db
        .select()
        .from(completedExerciseTable)
        .where(
          and(
            eq(completedExerciseTable.courseId, courseId),
            eq(completedExerciseTable.userId, userEmail)
          )
        )
        .orderBy(
          desc(completedExerciseTable.chapterId),
          desc(completedExerciseTable.exerciseId)
        );

      return NextResponse.json({
        ...courseQuery[0],
        chapters: chapterResult,
        userEnrolled: enrolledCourse.length > 0,
        courseEnrolledInfo: enrolledCourse[0] || null,
        completedExercises,
        userSubscription: subscription 
      });
    }


    const enrolledCourses = await db
      .select()
      .from(EnrolledCourseTable)
      .where(eq(EnrolledCourseTable.userId, userEmail));

    if (enrolledCourses.length === 0) {
      const all = await db.select().from(coursesTable);
      return NextResponse.json(
        all.map((course: any) => ({
          ...course,
          userEnrolled: false,
        }))
      );
    }

    const courseIds = enrolledCourses.map(c => c.courseId);

    const courses = await db
      .select()
      .from(coursesTable)
      //@ts-ignore
      .where(inArray(coursesTable.courseID, courseIds));

    const chapters = await db
      .select()
      .from(CourseChaptersTable)
      //@ts-ignore
      .where(inArray(CourseChaptersTable.courseID, courseIds))
      .orderBy(asc(CourseChaptersTable.chapterID));

    const completed = await db
      .select()
      .from(completedExerciseTable)
      //@ts-ignore
      .where(and(inArray(completedExerciseTable.courseId, courseIds),
        eq(completedExerciseTable.userId, userEmail)))
      .orderBy(
        desc(completedExerciseTable.courseId),
        desc(completedExerciseTable.exerciseId)
      );

    const formattedResult = courses.map(course => {
      const courseEnrollInfo = enrolledCourses.find(e => e.courseId === course.courseID);

      const courseChapters = chapters.filter(ch => ch.courseID === course.courseID);
      const completedCount = completed.filter(cx => cx.courseId === course.courseID).length;

      const totalExercises = courseChapters.reduce((acc, chapter) => {
        const exercisesCount = Array.isArray(chapter.exercises) ? chapter.exercises.length : 0;
        return acc + exercisesCount;
      }, 0);

      return {
        courseId: course.courseID,
        title: course.title,
        bannerImage: course.bannerImage,
        totalExercises,
        completedExercises: completedCount,
        xpEarned: courseEnrollInfo?.xpEarned || 0,
        level: course.level,
        userSubscription: subscription, // 🔥 include here too
      };
    });

    return NextResponse.json(formattedResult);

  } catch (err) {
    console.error("GET /api/course error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

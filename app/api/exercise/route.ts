import { CourseChaptersTable, ExerciseTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import {db} from "@/config/db"
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const {courseId,chapterId,exerciseId} = await req.json()


    const courseResult = await db.select().from(CourseChaptersTable).where(
        and(
            eq(CourseChaptersTable.courseID,courseId),
            eq(CourseChaptersTable.chapterID,chapterId)
        )
    )

    const exerciseResult = await db.select().from(ExerciseTable).where(and(
        eq(ExerciseTable.courseId,courseId),
        eq(ExerciseTable.exerciseId,exerciseId)
    ))
  
  return NextResponse.json(
    {
        ...courseResult[0],
        exerciseData: exerciseResult[0]
    }
  )

}
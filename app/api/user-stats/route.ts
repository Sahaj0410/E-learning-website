import { NextResponse } from "next/server";
import { db } from "@/config/db";
import {
  completedExerciseTable,
  EnrolledCourseTable,
} from "@/config/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "";

    if (!userEmail) {
      return NextResponse.json({ error: "User not logged in" }, { status: 401 });
    }

    const enrolled = await db
      .select()
      .from(EnrolledCourseTable)
      .where(eq(EnrolledCourseTable.userId, userEmail));

    const totalXP = enrolled.reduce(
      (sum: number, item: any) => sum + (item.xpEarned || 0),
      0
    );

    const completed = await db
      .select()
      .from(completedExerciseTable)
      .where(eq(completedExerciseTable.userId, userEmail));

    const completedExercises = completed.length;

    const badges = Math.floor(completedExercises / 6); 

    return NextResponse.json({
      totalXP,
      badges,
      completedExercises, 
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch user stats" });
  }
}

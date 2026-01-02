import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";

export async function GET() {
  try {
    const result = await db.select().from(coursesTable);

    const formatted = result.map(item => ({
      id: item.courseID,
      title: item.title,
      desc: item.desc,
      level: item.level,
      bannerImage: item.bannerImage
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching all courses", error);
    return NextResponse.json({ message: "Failed to fetch courses" }, { status: 500 });
  }
}

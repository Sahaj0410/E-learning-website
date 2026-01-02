import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ isPro: false });
  }

  const email = user.primaryEmailAddress.emailAddress;

  const dbUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return NextResponse.json({
    isPro: dbUser[0]?.subscriptionStatus === "pro",
  });
}

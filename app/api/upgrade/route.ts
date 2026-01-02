import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  try {
    const session = await auth();
    const user = await currentUser();
    
    if (!session || !user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    
    const email = user.primaryEmailAddress.emailAddress;

    await db
      .update(usersTable)
      .set({ subscriptionStatus: "pro" })
      .where(eq(usersTable.email, email));

    return NextResponse.json({ success: true, message: "Upgraded to PRO 🎉" });
  } catch (err) {
    console.log("Upgrade API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

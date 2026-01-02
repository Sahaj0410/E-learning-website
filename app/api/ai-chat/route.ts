import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress.emailAddress;

    
    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (dbUser[0]?.subscriptionStatus !== "pro") {
      return NextResponse.json(
        { error: "Upgrade to Pro to use AI" },
        { status: 403 }
      );
    }

    const { message } = await req.json();

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful programming tutor. Explain clearly and step by step.",
            },
            { role: "user", content: message },
          ],
        }),
      }
    );

    if (!groqRes.ok) {
      const errorText = await groqRes.text();
      console.error("Groq API Error:", errorText);

      return NextResponse.json(
        { error: "AI provider failed" },
        { status: 500 }
      );
    }

    const data = await groqRes.json();

    const answer =
      data?.choices?.[0]?.message?.content ??
      "AI did not return a response.";

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("AI CHAT ERROR:", err);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}

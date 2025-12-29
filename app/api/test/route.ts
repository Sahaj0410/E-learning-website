import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    node_env: process.env.NODE_ENV,
    db_url: process.env.DATABASE_URL ?? "NOT FOUND 😡"
  });
}

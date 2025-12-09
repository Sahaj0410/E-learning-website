import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';

export async function GET(req: NextRequest) {
      const result = await db.select().from(coursesTable);


      return NextResponse.json(result);
}
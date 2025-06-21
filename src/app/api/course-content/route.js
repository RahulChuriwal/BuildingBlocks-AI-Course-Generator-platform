import { db } from "../../../../config/db";
import { coursesTable } from "../../../../config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
  }

  const result = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.cid, courseId));

  if (!result?.[0]) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}

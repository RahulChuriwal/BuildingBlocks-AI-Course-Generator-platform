import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../../config/db";
import { coursesTable } from "../../../../config/schema";
import { eq, desc, asc, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    // Case 1: Explore public/generative courses
    if (courseId === "0") {
        const result = await db.select().from(coursesTable)
            .where(sql`${coursesTable.courseContent}::jsonb != '{}'::jsonb`)
            .orderBy(desc(coursesTable.id));

        return NextResponse.json(result);
    }

    // Case 2: Get one specific course by ID
    if (courseId) {
        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.cid, courseId));
        return NextResponse.json(result[0]);
    }

    // Case 3: Get current user's created courses
    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.select().from(coursesTable)
        .where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress))
        .orderBy(asc(coursesTable.name));

    return NextResponse.json(result);
}

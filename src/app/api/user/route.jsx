import { NextResponse } from "next/server";
// import { db } from "../../../config/db";
import { db } from "../../../../config/db";
import { usersTable } from "../../../../config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { email, name, number } = await req.json();

  // Check if user already exists
  const users = await db.select().from(usersTable).where(eq(usersTable.email, email));

  // If not, insert new user
  if (users?.length === 0) {
    const result = await db.insert(usersTable).values({
      name: name,
      email: email,
      phone: number, 
    }).returning();

    console.log(result);
    return NextResponse.json(result);
  }

  return NextResponse.json(users[0]);
}

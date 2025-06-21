import { pgTable, integer, varchar, boolean, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar(),
  phone: varchar({ length: 20 }).notNull(),
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar().notNull().unique(),
  name: varchar(),
  description: varchar(),
  category: varchar(),
  level: varchar().notNull(),
  includeVideo: boolean().default(false),
  noOfChapters: integer().notNull(),
  courseJson: json(),
  bannerImageUrl: varchar().default(''),
  courseContent: json().default({}),
  userEmail: varchar('userEmail').references(() => usersTable.email).notNull()
});

export const enrollCourseTable = pgTable('enrollCourse', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar('cid').references(() => coursesTable.cid),
  userEmail: varchar('userEmail').references(() => usersTable.email).notNull(),
  completedChapters: json()
})


export const completedTopicsTable = pgTable("completed_topics", {
  id: varchar("id").primaryKey(), // `${userId}-${courseId}-${chapterIndex}-${topicIndex}`
  userId: varchar("user_id").notNull(),
  courseId: varchar("course_id").notNull(),
  chapterIndex: integer("chapter_index").notNull(),
  topicIndex: integer("topic_index").notNull(),
  completed: boolean("completed").default(true),
});


export default [usersTable, coursesTable, enrollCourseTable, completedTopicsTable];

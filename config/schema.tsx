import { id } from "date-fns/locale";
import { integer, json, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  points: integer().default(0),
  Subscription: varchar()
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseID: integer().notNull().unique(),
  title: varchar().notNull(),
  desc: varchar().notNull(),
  bannerImage: varchar().notNull(),
  level: varchar().default('Beginner'),
  tags: varchar()
});

export const CourseChaptersTable = pgTable('courseChapters',{
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   chapterID: integer().notNull(),
   courseID: integer().notNull(),
   name:varchar().notNull(),
description: varchar({ length: 1000 }).notNull(),
   exercises:json(),
})

export const EnrolledCourseTable = pgTable('enrollCourse',{
     id: integer().primaryKey().generatedAlwaysAsIdentity(),
     courseId: integer(),
     userId: varchar(),
     enrolledDate:timestamp().defaultNow(),
     xpEarned : integer(),

  
})

export const  completedExerciseTable = pgTable('completedExercise',{
       id: integer().primaryKey().generatedAlwaysAsIdentity(),
       courseId : integer(),
       chapterId : integer(),
       exerciseId : integer(),
       userId: varchar(),




      })

export const ExerciseTable = pgTable('exercise',{
         id: integer().primaryKey().generatedAlwaysAsIdentity(),
         courseId: integer(),
         chapterId: integer(),
          exerciseId: varchar(),
          exercisesContent: json(),
          ererciseName: varchar()
})
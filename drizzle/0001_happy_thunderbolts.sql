CREATE TABLE "enrollCourse" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "enrollCourse_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseId" integer,
	"userId" varchar,
	"enrolledDate" timestamp DEFAULT now(),
	"xpEarned" integer
);
--> statement-breakpoint
CREATE TABLE "exercise" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "exercise_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseId" integer,
	"chapterId" integer,
	"exerciseId" varchar,
	"exercisesContent" json,
	"ererciseName" varchar,
	"xp" integer DEFAULT 10
);
--> statement-breakpoint
CREATE TABLE "completedExercise" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "completedExercise_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseId" integer,
	"chapterId" integer,
	"exerciseId" varchar,
	"userId" varchar
);

CREATE TABLE "courseChapters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courseChapters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"chapterID" integer NOT NULL,
	"courseID" integer NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar(1000) NOT NULL,
	"exercises" json
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseID" integer NOT NULL,
	"title" varchar NOT NULL,
	"desc" varchar NOT NULL,
	"bannerImage" varchar NOT NULL,
	"level" varchar DEFAULT 'Beginner',
	"tags" varchar,
	CONSTRAINT "courses_courseID_unique" UNIQUE("courseID")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"points" integer DEFAULT 0,
	"Subscription" varchar,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

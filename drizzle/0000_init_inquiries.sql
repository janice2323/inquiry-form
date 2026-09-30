CREATE TABLE IF NOT EXISTS "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" varchar(32) NOT NULL,
	"email" varchar(256) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

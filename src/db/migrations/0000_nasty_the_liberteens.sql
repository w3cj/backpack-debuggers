CREATE TABLE IF NOT EXISTS "monster" (
	"id" serial NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"dex_number" integer NOT NULL,
	"size" integer NOT NULL,
	"hp" integer NOT NULL,
	"attacks" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

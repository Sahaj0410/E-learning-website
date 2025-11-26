import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { Subscript } from "lucide-react";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  points: integer().default(0),
  Subscription: varchar()
});

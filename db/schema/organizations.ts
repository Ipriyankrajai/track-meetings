import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const organizationsTable = sqliteTable("organizations", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(), // we love random words
  name: text("name"),
});

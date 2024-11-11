import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

import { sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { organizationsTable } from "./organizations";
import { organizationRole } from "./constant";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  email: text("email").unique().notNull(),
});

export const usersToOrganizations = sqliteTable(
  "users_to_organizations",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    organizationId: integer("organization_id")
      .notNull()
      .references(() => organizationsTable.id),
    role: text("role", { enum: organizationRole }).notNull().default("member"),
    createdAt: integer("created_at", { mode: "timestamp" }).default(
      sql`(strftime('%s', 'now'))`
    ),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.organizationId] }),
  })
);

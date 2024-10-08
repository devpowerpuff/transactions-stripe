import {
  pgTable,
  uuid,
  timestamp,
  text,
  varchar,
  bigint,
  integer,
} from "drizzle-orm/pg-core";
import { underwritingDetails } from "./underwritingDetails";
import { quotes } from "./quotes";

export const policies = pgTable("policies", {
  id: uuid("id").primaryKey().defaultRandom(),
  underwritingDetailsId: uuid("underwriting_details_id")
    .references(() => underwritingDetails.id, { onDelete: "cascade" })
    .notNull(),
  quoteId: uuid("quote_id")
    .references(() => quotes.id, { onDelete: "cascade" })
    .notNull(),
  status: text("status").notNull(),
  chargeId: varchar("charge_id", { length: 255 }),
  amount: integer("amount"),
  currency: varchar("currency", { length: 10 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Policy = typeof policies.$inferSelect;

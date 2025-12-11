import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const visits = pgTable("visits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  page: text("page").notNull(),
  userAgent: text("user_agent"),
  ip: text("ip"),
  referrer: text("referrer"),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

export const feedback = pgTable("feedback", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  page: text("page"),
  userAgent: text("user_agent"),
  ip: text("ip"),
  status: text("status").default("nouveau").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertVisitSchema = createInsertSchema(visits).omit({
  id: true,
  visitedAt: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const suggestions = pgTable("suggestions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pseudo: text("pseudo").default("Anonyme").notNull(),
  content: text("content").notNull(),
  status: text("status").default("nouveau").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSuggestionSchema = createInsertSchema(suggestions).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertSuggestion = z.infer<typeof insertSuggestionSchema>;
export type Suggestion = typeof suggestions.$inferSelect;

export const leaderboard = pgTable("leaderboard", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pseudo: text("pseudo").notNull(),
  univers: text("univers").notNull(),
  score: integer("score").notNull(),
  ip: text("ip"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeaderboardSchema = createInsertSchema(leaderboard).omit({
  id: true,
  ip: true,
  createdAt: true,
});

export type InsertLeaderboard = z.infer<typeof insertLeaderboardSchema>;
export type Leaderboard = typeof leaderboard.$inferSelect;

export const editableContent = pgTable("editable_content", {
  id: varchar("id").primaryKey(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertEditableContentSchema = createInsertSchema(editableContent).omit({
  updatedAt: true,
});

export type InsertEditableContent = z.infer<typeof insertEditableContentSchema>;
export type EditableContent = typeof editableContent.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVisit = z.infer<typeof insertVisitSchema>;
export type Visit = typeof visits.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;

export const customGuides = pgTable("custom_guides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  categoryId: text("category_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content"),
  icon: text("icon").default("BookOpen").notNull(),
  color: text("color").default("from-blue-500 to-cyan-600").notNull(),
  link: text("link"),
  externalLink: text("external_link"),
  featured: integer("featured").default(0).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCustomGuideSchema = createInsertSchema(customGuides).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCustomGuide = z.infer<typeof insertCustomGuideSchema>;
export type CustomGuide = typeof customGuides.$inferSelect;

export const fleetCompositions = pgTable("fleet_compositions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  composition: text("composition").notNull(),
  strategy: text("strategy"),
  universe: text("universe"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFleetCompositionSchema = createInsertSchema(fleetCompositions).omit({
  id: true,
  createdAt: true,
});

export type InsertFleetComposition = z.infer<typeof insertFleetCompositionSchema>;
export type FleetComposition = typeof fleetCompositions.$inferSelect;

export const defenseCompositions = pgTable("defense_compositions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  composition: text("composition").notNull(),
  strategy: text("strategy"),
  universe: text("universe"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDefenseCompositionSchema = createInsertSchema(defenseCompositions).omit({
  id: true,
  createdAt: true,
});

export type InsertDefenseComposition = z.infer<typeof insertDefenseCompositionSchema>;
export type DefenseComposition = typeof defenseCompositions.$inferSelect;

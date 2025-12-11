import { users, visits, feedback, suggestions, leaderboard, type User, type InsertUser, type InsertVisit, type Visit, type InsertFeedback, type Feedback, type InsertSuggestion, type Suggestion, type InsertLeaderboard, type Leaderboard } from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, gte } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  recordVisit(visit: InsertVisit): Promise<Visit>;
  getVisitStats(): Promise<{
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    recentVisits: Visit[];
    pageStats: { page: string; count: number }[];
  }>;
  getPopularGuides(limit: number, minViews: number): Promise<{ slug: string; views: number }[]>;
  createFeedback(data: InsertFeedback): Promise<Feedback>;
  listFeedback(): Promise<Feedback[]>;
  updateFeedbackStatus(id: string, status: string): Promise<Feedback | undefined>;
  createSuggestion(data: InsertSuggestion): Promise<Suggestion>;
  listSuggestions(): Promise<Suggestion[]>;
  addLeaderboardEntry(data: InsertLeaderboard & { ip?: string | null }): Promise<Leaderboard>;
  getLeaderboard(limit?: number): Promise<Leaderboard[]>;
  getPublicLeaderboard(limit?: number): Promise<Omit<Leaderboard, 'ip'>[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async recordVisit(visit: InsertVisit): Promise<Visit> {
    const [newVisit] = await db.insert(visits).values(visit).returning();
    return newVisit;
  }

  async getVisitStats(): Promise<{
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    recentVisits: Visit[];
    pageStats: { page: string; count: number }[];
  }> {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(todayStart);
    monthStart.setMonth(monthStart.getMonth() - 1);

    const [totalResult] = await db.select({ count: sql<number>`count(*)` }).from(visits);
    const [todayResult] = await db.select({ count: sql<number>`count(*)` }).from(visits).where(gte(visits.visitedAt, todayStart));
    const [weekResult] = await db.select({ count: sql<number>`count(*)` }).from(visits).where(gte(visits.visitedAt, weekStart));
    const [monthResult] = await db.select({ count: sql<number>`count(*)` }).from(visits).where(gte(visits.visitedAt, monthStart));

    const recentVisits = await db.select().from(visits).orderBy(desc(visits.visitedAt)).limit(50);

    const pageStats = await db
      .select({
        page: visits.page,
        count: sql<number>`count(*)`,
      })
      .from(visits)
      .groupBy(visits.page)
      .orderBy(desc(sql`count(*)`));

    return {
      total: Number(totalResult?.count || 0),
      today: Number(todayResult?.count || 0),
      thisWeek: Number(weekResult?.count || 0),
      thisMonth: Number(monthResult?.count || 0),
      recentVisits,
      pageStats: pageStats.map(p => ({ page: p.page, count: Number(p.count) })),
    };
  }

  async getPopularGuides(limit: number = 4, minViews: number = 5): Promise<{ slug: string; views: number }[]> {
    const results = await db
      .select({
        page: visits.page,
        count: sql<number>`count(*)`,
      })
      .from(visits)
      .where(sql`${visits.page} LIKE '/guide/%'`)
      .groupBy(visits.page)
      .having(sql`count(*) >= ${minViews}`)
      .orderBy(desc(sql`count(*)`))
      .limit(limit);

    return results.map(r => ({
      slug: r.page.replace('/guide/', ''),
      views: Number(r.count)
    }));
  }

  async createFeedback(data: InsertFeedback): Promise<Feedback> {
    const [newFeedback] = await db.insert(feedback).values(data).returning();
    return newFeedback;
  }

  async listFeedback(): Promise<Feedback[]> {
    return await db.select().from(feedback).orderBy(desc(feedback.createdAt));
  }

  async updateFeedbackStatus(id: string, status: string): Promise<Feedback | undefined> {
    const [updated] = await db.update(feedback).set({ status }).where(eq(feedback.id, id)).returning();
    return updated || undefined;
  }

  async createSuggestion(data: InsertSuggestion): Promise<Suggestion> {
    const [newSuggestion] = await db.insert(suggestions).values(data).returning();
    return newSuggestion;
  }

  async listSuggestions(): Promise<Suggestion[]> {
    return await db.select().from(suggestions).orderBy(desc(suggestions.createdAt));
  }

  async addLeaderboardEntry(data: InsertLeaderboard & { ip?: string | null }): Promise<Leaderboard> {
    if (data.ip) {
      const [existing] = await db.select().from(leaderboard).where(eq(leaderboard.ip, data.ip));
      if (existing) {
        if (data.score > existing.score) {
          const [updated] = await db.update(leaderboard)
            .set({ 
              pseudo: data.pseudo, 
              univers: data.univers, 
              score: data.score,
              createdAt: new Date()
            })
            .where(eq(leaderboard.id, existing.id))
            .returning();
          return updated;
        }
        return existing;
      }
    }
    const [entry] = await db.insert(leaderboard).values(data).returning();
    return entry;
  }

  async getLeaderboard(limit: number = 20): Promise<Leaderboard[]> {
    return await db.select().from(leaderboard).orderBy(desc(leaderboard.score)).limit(limit);
  }

  async getPublicLeaderboard(limit: number = 20): Promise<Omit<Leaderboard, 'ip'>[]> {
    const entries = await db
      .select({
        id: leaderboard.id,
        pseudo: leaderboard.pseudo,
        univers: leaderboard.univers,
        score: leaderboard.score,
        createdAt: leaderboard.createdAt,
      })
      .from(leaderboard)
      .orderBy(desc(leaderboard.score))
      .limit(limit);
    return entries;
  }
}

export const storage = new DatabaseStorage();

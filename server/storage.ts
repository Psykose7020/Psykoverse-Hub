import { users, visits, type User, type InsertUser, type InsertVisit, type Visit } from "@shared/schema";
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
}

export const storage = new DatabaseStorage();

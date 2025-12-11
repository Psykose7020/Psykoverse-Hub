import { users, visits, feedback, suggestions, leaderboard, editableContent, customGuides, type User, type InsertUser, type InsertVisit, type Visit, type InsertFeedback, type Feedback, type InsertSuggestion, type Suggestion, type InsertLeaderboard, type Leaderboard, type EditableContent, type InsertEditableContent, type CustomGuide, type InsertCustomGuide } from "@shared/schema";
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
  addLeaderboardEntry(data: InsertLeaderboard & { ip?: string | null }): Promise<{ entry: Leaderboard; isNew: boolean; isBetter: boolean; previousBest?: number }>;
  getLeaderboard(limit?: number): Promise<Leaderboard[]>;
  getPublicLeaderboard(limit?: number): Promise<Omit<Leaderboard, 'ip'>[]>;
  getEditableContent(id: string): Promise<EditableContent | undefined>;
  getAllEditableContent(): Promise<EditableContent[]>;
  upsertEditableContent(data: InsertEditableContent): Promise<EditableContent>;
  getCustomGuides(): Promise<CustomGuide[]>;
  getCustomGuidesByCategory(categoryId: string): Promise<CustomGuide[]>;
  createCustomGuide(data: InsertCustomGuide): Promise<CustomGuide>;
  updateCustomGuide(id: string, data: Partial<InsertCustomGuide>): Promise<CustomGuide | undefined>;
  deleteCustomGuide(id: string): Promise<boolean>;
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

  async addLeaderboardEntry(data: InsertLeaderboard & { ip?: string | null }): Promise<{ entry: Leaderboard; isNew: boolean; isBetter: boolean; previousBest?: number }> {
    // Permettre plusieurs entrées par IP, mais un seul score par pseudo
    const [existing] = await db.select().from(leaderboard).where(eq(leaderboard.pseudo, data.pseudo));
    if (existing) {
      // Mettre à jour uniquement si le nouveau score est meilleur
      if (data.score > existing.score) {
        const [updated] = await db.update(leaderboard)
          .set({ 
            univers: data.univers, 
            score: data.score,
            ip: data.ip,
            createdAt: new Date()
          })
          .where(eq(leaderboard.id, existing.id))
          .returning();
        return { entry: updated, isNew: false, isBetter: true, previousBest: existing.score };
      }
      return { entry: existing, isNew: false, isBetter: false, previousBest: existing.score };
    }
    const [entry] = await db.insert(leaderboard).values(data).returning();
    return { entry, isNew: true, isBetter: true };
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

  async getEditableContent(id: string): Promise<EditableContent | undefined> {
    const [content] = await db.select().from(editableContent).where(eq(editableContent.id, id));
    return content || undefined;
  }

  async getAllEditableContent(): Promise<EditableContent[]> {
    return await db.select().from(editableContent);
  }

  async upsertEditableContent(data: InsertEditableContent): Promise<EditableContent> {
    const existing = await this.getEditableContent(data.id);
    if (existing) {
      const [updated] = await db.update(editableContent)
        .set({ content: data.content, updatedAt: new Date() })
        .where(eq(editableContent.id, data.id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(editableContent).values(data).returning();
    return created;
  }

  async getCustomGuides(): Promise<CustomGuide[]> {
    return await db.select().from(customGuides).orderBy(customGuides.sortOrder);
  }

  async getCustomGuidesByCategory(categoryId: string): Promise<CustomGuide[]> {
    return await db.select().from(customGuides)
      .where(eq(customGuides.categoryId, categoryId))
      .orderBy(customGuides.sortOrder);
  }

  async createCustomGuide(data: InsertCustomGuide): Promise<CustomGuide> {
    const [guide] = await db.insert(customGuides).values(data).returning();
    return guide;
  }

  async updateCustomGuide(id: string, data: Partial<InsertCustomGuide>): Promise<CustomGuide | undefined> {
    const [updated] = await db.update(customGuides)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(customGuides.id, id))
      .returning();
    return updated;
  }

  async deleteCustomGuide(id: string): Promise<boolean> {
    const result = await db.delete(customGuides).where(eq(customGuides.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();

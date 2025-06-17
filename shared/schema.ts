import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const vocabularyCards = pgTable("vocabulary_cards", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  wordCount: integer("word_count").notNull(),
  studyCount: integer("study_count").default(0),
  createdAt: text("created_at").notNull(),
});

export const vocabularyWords = pgTable("vocabulary_words", {
  id: serial("id").primaryKey(),
  cardId: integer("card_id").references(() => vocabularyCards.id),
  word: text("word").notNull(),
  pronunciation: text("pronunciation"),
  partOfSpeech: text("part_of_speech").notNull(),
  definition: text("definition").notNull(),
  vietnamese: text("vietnamese").notNull(),
  example: text("example").notNull(),
  exampleVietnamese: text("example_vietnamese").notNull(),
  tags: text("tags").array().default([]),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertVocabularyCardSchema = createInsertSchema(vocabularyCards).omit({
  id: true,
});

export const insertVocabularyWordSchema = createInsertSchema(vocabularyWords).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type VocabularyCard = typeof vocabularyCards.$inferSelect;
export type VocabularyWord = typeof vocabularyWords.$inferSelect;
export type InsertVocabularyCard = z.infer<typeof insertVocabularyCardSchema>;
export type InsertVocabularyWord = z.infer<typeof insertVocabularyWordSchema>;

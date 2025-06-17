import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVocabularyCardSchema, insertVocabularyWordSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Vocabulary Cards API
  app.get("/api/vocabulary-cards", async (req, res) => {
    try {
      const cards = await storage.getAllVocabularyCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vocabulary cards" });
    }
  });

  app.get("/api/vocabulary-cards/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const card = await storage.getVocabularyCard(id);
      if (!card) {
        return res.status(404).json({ error: "Vocabulary card not found" });
      }
      res.json(card);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vocabulary card" });
    }
  });

  app.post("/api/vocabulary-cards", async (req, res) => {
    try {
      const validatedData = insertVocabularyCardSchema.parse(req.body);
      const card = await storage.createVocabularyCard(validatedData);
      res.status(201).json(card);
    } catch (error) {
      res.status(400).json({ error: "Invalid vocabulary card data" });
    }
  });

  app.patch("/api/vocabulary-cards/:id/favorite", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { isFavorited } = req.body;
      const card = await storage.updateVocabularyCardFavorite(id, isFavorited);
      if (!card) {
        return res.status(404).json({ error: "Vocabulary card not found" });
      }
      res.json(card);
    } catch (error) {
      res.status(500).json({ error: "Failed to update vocabulary card favorite" });
    }
  });

  // Vocabulary Words API
  app.get("/api/vocabulary-cards/:cardId/words", async (req, res) => {
    try {
      const cardId = parseInt(req.params.cardId);
      const words = await storage.getVocabularyWordsByCardId(cardId);
      res.json(words);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vocabulary words" });
    }
  });

  app.get("/api/vocabulary-words/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const word = await storage.getVocabularyWord(id);
      if (!word) {
        return res.status(404).json({ error: "Vocabulary word not found" });
      }
      res.json(word);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vocabulary word" });
    }
  });

  app.post("/api/vocabulary-words", async (req, res) => {
    try {
      const validatedData = insertVocabularyWordSchema.parse(req.body);
      const word = await storage.createVocabularyWord(validatedData);
      res.status(201).json(word);
    } catch (error) {
      res.status(400).json({ error: "Invalid vocabulary word data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

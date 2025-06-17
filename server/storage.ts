import { 
  users, 
  type User, 
  type InsertUser,
  type VocabularyCard,
  type VocabularyWord,
  type InsertVocabularyCard,
  type InsertVocabularyWord
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vocabulary Cards
  getAllVocabularyCards(): Promise<VocabularyCard[]>;
  getVocabularyCard(id: number): Promise<VocabularyCard | undefined>;
  createVocabularyCard(card: InsertVocabularyCard): Promise<VocabularyCard>;
  
  // Vocabulary Words
  getVocabularyWordsByCardId(cardId: number): Promise<VocabularyWord[]>;
  getVocabularyWord(id: number): Promise<VocabularyWord | undefined>;
  createVocabularyWord(word: InsertVocabularyWord): Promise<VocabularyWord>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vocabularyCards: Map<number, VocabularyCard>;
  private vocabularyWords: Map<number, VocabularyWord>;
  private currentUserId: number;
  private currentCardId: number;
  private currentWordId: number;

  constructor() {
    this.users = new Map();
    this.vocabularyCards = new Map();
    this.vocabularyWords = new Map();
    this.currentUserId = 1;
    this.currentCardId = 1;
    this.currentWordId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample vocabulary cards
    const sampleCards: VocabularyCard[] = [
      {
        id: 1,
        title: "Business - 20/04",
        description: "Essential business vocabulary for professional communication",
        category: "Business",
        difficulty: "Intermediate",
        wordCount: 12,
        studyCount: 7,
        createdAt: "2025-04-20"
      },
      {
        id: 2,
        title: "Technology - 15/04",
        description: "Modern technology terms and concepts",
        category: "Technology", 
        difficulty: "Advanced",
        wordCount: 15,
        studyCount: 3,
        createdAt: "2025-04-15"
      },
      {
        id: 3,
        title: "Environment - 12/04",
        description: "Environmental vocabulary and climate terms",
        category: "Environment",
        difficulty: "Intermediate",
        wordCount: 18,
        studyCount: 12,
        createdAt: "2025-04-12"
      },
      {
        id: 4,
        title: "Company - 10/04",
        description: "Corporate structure and company-related vocabulary",
        category: "Company",
        difficulty: "Beginner",
        wordCount: 10,
        studyCount: 5,
        createdAt: "2025-04-10"
      }
    ];

    // Sample vocabulary words for Business card
    const sampleWords: VocabularyWord[] = [
      {
        id: 1,
        cardId: 1,
        word: "Resilience",
        pronunciation: "/rɪˈzɪljəns/",
        partOfSpeech: "N",
        definition: "The capacity to recover quickly from difficulties; toughness",
        vietnamese: "Khả năng phục hồi, sức bền",
        example: "The company showed great resilience during the economic downturn.",
        exampleVietnamese: "Công ty đã thể hiện sức bền tuyệt vời trong thời kỳ suy thoái kinh tế.",
        tags: ["business", "strength", "recovery"]
      },
      {
        id: 2,
        cardId: 1,
        word: "Comprehensive",
        pronunciation: "/ˌkɒmprɪˈhensɪv/",
        partOfSpeech: "Adj",
        definition: "Including all or nearly all elements or aspects of something",
        vietnamese: "Toàn diện, bao quát",
        example: "We need a comprehensive analysis of the market trends.",
        exampleVietnamese: "Chúng ta cần một phân tích toàn diện về xu hướng thị trường.",
        tags: ["analysis", "complete", "thorough"]
      },
      {
        id: 3,
        cardId: 1,
        word: "Collaborate",
        pronunciation: "/kəˈlæbəreɪt/",
        partOfSpeech: "V",
        definition: "To work together with others to achieve a common goal",
        vietnamese: "Hợp tác, cộng tác",
        example: "Teams must collaborate effectively to meet project deadlines.",
        exampleVietnamese: "Các nhóm phải hợp tác hiệu quả để đáp ứng thời hạn dự án.",
        tags: ["teamwork", "cooperation", "partnership"]
      },
      {
        id: 4,
        cardId: 1,
        word: "go down a rabbit hole",
        pronunciation: "",
        partOfSpeech: "Idiom",
        definition: "A bizarre or confusing situation or environment, often one that becomes increasingly complicated the deeper one explores it",
        vietnamese: "Một tình huống kỳ quái hoặc rối rắm, thường trở nên phức tạp hơn khi bạn càng tìm hiểu sâu",
        example: "I just wanted to look up one recipe, but three hours later, I was deep down a YouTube rabbit hole about medieval cooking.",
        exampleVietnamese: "Tôi chỉ muốn tìm một công thức nấu ăn thôi, vậy mà ba tiếng sau lại sa đã vào cả loạt video YouTube về ẩm thực thời trung cổ.",
        tags: ["idiom", "distraction", "internet"]
      }
    ];

    sampleCards.forEach(card => {
      const cardWithDefaults: VocabularyCard = {
        ...card,
        description: card.description || null,
        studyCount: card.studyCount || 0
      };
      this.vocabularyCards.set(card.id, cardWithDefaults);
      this.currentCardId = Math.max(this.currentCardId, card.id + 1);
    });

    sampleWords.forEach(word => {
      const wordWithDefaults: VocabularyWord = {
        ...word,
        cardId: word.cardId || null,
        pronunciation: word.pronunciation || null,
        tags: word.tags || null
      };
      this.vocabularyWords.set(word.id, wordWithDefaults);
      this.currentWordId = Math.max(this.currentWordId, word.id + 1);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllVocabularyCards(): Promise<VocabularyCard[]> {
    return Array.from(this.vocabularyCards.values());
  }

  async getVocabularyCard(id: number): Promise<VocabularyCard | undefined> {
    return this.vocabularyCards.get(id);
  }

  async createVocabularyCard(insertCard: InsertVocabularyCard): Promise<VocabularyCard> {
    const id = this.currentCardId++;
    const card: VocabularyCard = { 
      ...insertCard, 
      id,
      description: insertCard.description || null,
      studyCount: insertCard.studyCount || 0
    };
    this.vocabularyCards.set(id, card);
    return card;
  }

  async getVocabularyWordsByCardId(cardId: number): Promise<VocabularyWord[]> {
    return Array.from(this.vocabularyWords.values()).filter(
      (word) => word.cardId === cardId
    );
  }

  async getVocabularyWord(id: number): Promise<VocabularyWord | undefined> {
    return this.vocabularyWords.get(id);
  }

  async createVocabularyWord(insertWord: InsertVocabularyWord): Promise<VocabularyWord> {
    const id = this.currentWordId++;
    const word: VocabularyWord = { 
      ...insertWord, 
      id,
      cardId: insertWord.cardId || null,
      pronunciation: insertWord.pronunciation || null,
      tags: insertWord.tags || null
    };
    this.vocabularyWords.set(id, word);
    return word;
  }
}

export const storage = new MemStorage();

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
  updateVocabularyCardFavorite(id: number, isFavorited: boolean): Promise<VocabularyCard | undefined>;
  
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
        title: "Từ vựng Kinh doanh Cơ bản",
        description: "Tổng hợp các từ vựng thiết yếu trong giao tiếp công sở và môi trường kinh doanh hiện đại",
        category: "Business",
        difficulty: "Intermediate",
        wordCount: 12,
        studyCount: 7,
        isFavorited: 0,
        createdAt: "2025-04-20"
      },
      {
        id: 2,
        title: "Công nghệ Thông tin",
        description: "Thuật ngữ và khái niệm công nghệ hiện đại, từ vựng IT và digital transformation",
        category: "Technology", 
        difficulty: "Advanced",
        wordCount: 15,
        studyCount: 3,
        isFavorited: 0,
        createdAt: "2025-04-15"
      },
      {
        id: 3,
        title: "Môi trường & Khí hậu",
        description: "Từ vựng về môi trường, biến đổi khí hậu và phát triển bền vững",
        category: "Environment",
        difficulty: "Intermediate",
        wordCount: 18,
        studyCount: 12,
        isFavorited: 0,
        createdAt: "2025-04-12"
      },
      {
        id: 4,
        title: "Cấu trúc Công ty",
        description: "Từ vựng về tổ chức công ty, chức danh và quy trình làm việc trong doanh nghiệp",
        category: "Company",
        difficulty: "Beginner",
        wordCount: 10,
        studyCount: 5,
        isFavorited: 0,
        createdAt: "2025-04-10"
      },
      {
        id: 5,
        title: "Từ vựng Kinh doanh Nâng cao",
        description: "Bộ từ vựng chuyên sâu cho giao tiếp kinh doanh, bao gồm các thuật ngữ về hợp tác, phân tích và khả năng phục hồi",
        category: "Business",
        difficulty: "Advanced",
        wordCount: 5,
        studyCount: 0,
        isFavorited: 0,
        createdAt: "2025-06-17"
      },
      {
        id: 6,
        title: "Thành ngữ & Cách diễn đạt",
        description: "Những thành ngữ và cách diễn đạt tự nhiên thường gặp trong giao tiếp hàng ngày và văn phong học thuật",
        category: "Idioms",
        difficulty: "Advanced",
        wordCount: 1,
        studyCount: 0,
        isFavorited: 0,
        createdAt: "2025-06-17"
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
      },
      // Business Vocabulary - Complete card (id: 5)
      {
        id: 5,
        cardId: 5,
        word: "Resilience",
        pronunciation: "/rɪˈzɪljəns/",
        partOfSpeech: "N",
        definition: "The ability to become strong, healthy, or successful again after something bad happens. The quality of being able to return quickly to a previous good condition after problems.",
        vietnamese: "Khả năng phục hồi nhanh chóng sau khó khăn, tính kiên cường và bền bỉ. Sự dẻo dai trong việc vượt qua thử thách.",
        example: "The company showed great resilience during the economic downturn and managed to stay profitable.",
        exampleVietnamese: "Công ty đã thể hiện sự kiên cường tuyệt vời trong thời kỳ suy thoái kinh tế và vẫn duy trì được lợi nhuận.",
        tags: ["business", "strength", "recovery"]
      },
      {
        id: 6,
        cardId: 5,
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
        id: 7,
        cardId: 5,
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
        id: 8,
        cardId: 5,
        word: "Fragile",
        pronunciation: "/ˈfrædʒaɪl/",
        partOfSpeech: "Adj",
        definition: "Easily broken or damaged; delicate",
        vietnamese: "Dễ vỡ, dễ bị hư hại",
        example: "The economic recovery remains fragile and could be affected by external factors.",
        exampleVietnamese: "Sự phục hồi kinh tế vẫn còn mong manh và có thể bị ảnh hưởng bởi các yếu tố bên ngoài.",
        tags: ["delicate", "vulnerable", "breakable"]
      },
      {
        id: 9,
        cardId: 5,
        word: "However",
        pronunciation: "/haʊˈevə/",
        partOfSpeech: "Adv",
        definition: "Used to introduce a statement that contrasts with something that has been said previously",
        vietnamese: "Tuy nhiên, mặc dù vậy",
        example: "The project was challenging; however, the team managed to complete it on time.",
        exampleVietnamese: "Dự án rất thử thách; tuy nhiên, nhóm đã hoàn thành đúng thời hạn.",
        tags: ["contrast", "transition", "conjunction"]
      },
      // Idioms & Expressions card (id: 6)
      {
        id: 10,
        cardId: 6,
        word: "Go down a rabbit hole",
        pronunciation: "/ɡəʊ daʊn ə ˈræbɪt həʊl/",
        partOfSpeech: "Idiom",
        definition: "A bizarre or confusing situation or environment, often one that becomes increasingly complicated the deeper one explores it. The term is also used to describe getting deeply involved in an activity or topic, especially on the internet.",
        vietnamese: "Một tình huống kỳ quái hoặc rối rắm, thường trở nên phức tạp hơn khi bạn càng tìm hiểu sâu. Cũng dùng để chỉ việc bạn 'sa đà' vào một chủ đề hay hoạt động (đặc biệt trên mạng) đến mức mất thời gian mà không để ý.",
        example: "I just wanted to look up one recipe, but three hours later, I was deep down a YouTube rabbit hole about medieval cooking.",
        exampleVietnamese: "Tôi chỉ muốn tìm một công thức nấu ăn thôi, vậy mà ba tiếng sau lại sa đà vào cả loạt video YouTube về ẩm thực thời trung cổ.",
        tags: ["idiom", "distraction", "internet", "time-wasting"]
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
    const cards = Array.from(this.vocabularyCards.values());
    // Update word count for each card based on actual words
    return cards.map(card => ({
      ...card,
      wordCount: Array.from(this.vocabularyWords.values()).filter(word => word.cardId === card.id).length
    }));
  }

  async getVocabularyCard(id: number): Promise<VocabularyCard | undefined> {
    const card = this.vocabularyCards.get(id);
    if (!card) return undefined;
    
    // Update word count based on actual words
    const wordCount = Array.from(this.vocabularyWords.values()).filter(word => word.cardId === card.id).length;
    return {
      ...card,
      wordCount
    };
  }

  async createVocabularyCard(insertCard: InsertVocabularyCard): Promise<VocabularyCard> {
    const id = this.currentCardId++;
    const card: VocabularyCard = { 
      ...insertCard, 
      id,
      description: insertCard.description || null,
      studyCount: insertCard.studyCount || 0,
      isFavorited: 0
    };
    this.vocabularyCards.set(id, card);
    return card;
  }

  async updateVocabularyCardFavorite(id: number, isFavorited: boolean): Promise<VocabularyCard | undefined> {
    const card = this.vocabularyCards.get(id);
    if (!card) return undefined;
    
    const updatedCard = { ...card, isFavorited: isFavorited ? 1 : 0 };
    this.vocabularyCards.set(id, updatedCard);
    return updatedCard;
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

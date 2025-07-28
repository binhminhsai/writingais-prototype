import { 
  users, 
  type User, 
  type InsertUser,
  type VocabularyCard,
  type VocabularyWord,
  type InsertVocabularyCard,
  type InsertVocabularyWord,
  type EssayGrading,
  type InsertEssayGrading
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
  
  // Essay Grading
  createEssayGrading(essay: InsertEssayGrading): Promise<EssayGrading>;
  updateEssayGradingScores(id: number, scores: {
    overallScore: number;
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
    feedback: string;
  }): Promise<EssayGrading | undefined>;
  getAllEssayGradings(): Promise<EssayGrading[]>;
  getEssayGrading(id: number): Promise<EssayGrading | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vocabularyCards: Map<number, VocabularyCard>;
  private vocabularyWords: Map<number, VocabularyWord>;
  private essayGradings: Map<number, EssayGrading>;
  private currentUserId: number;
  private currentCardId: number;
  private currentWordId: number;
  private currentEssayId: number;

  constructor() {
    this.users = new Map();
    this.vocabularyCards = new Map();
    this.vocabularyWords = new Map();
    this.essayGradings = new Map();
    this.currentUserId = 1;
    this.currentCardId = 1;
    this.currentWordId = 1;
    this.currentEssayId = 1;
    
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
        wordCount: 20,
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

    // Complete vocabulary words set - 20 words for Business card (ID: 1)
    const sampleWords: VocabularyWord[] = [
      {
        id: 1,
        cardId: 1,
        word: "Resilience",
        pronunciation: "/rɪˈzɪljəns/",
        partOfSpeech: "N",
        definition: "The ability to recover quickly from difficulties; toughness.",
        vietnamese: "Khả năng phục hồi nhanh chóng từ khó khăn; sức bền.",
        example: "She showed great resilience in overcoming the challenges at work.",
        exampleVietnamese: "Cô ấy đã thể hiện khả năng phục hồi tuyệt vời trong việc vượt qua những thử thách tại nơi làm việc.",
        tags: ["business", "strength", "recovery"]
      },
      {
        id: 2,
        cardId: 1,
        word: "Comprehensive",
        pronunciation: "/ˌkɒmprɪˈhensɪv/",
        partOfSpeech: "Adj",
        definition: "Including all or almost all elements or aspects.",
        vietnamese: "Bao gồm tất cả hoặc hầu hết các yếu tố hoặc khía cạnh; toàn diện.",
        example: "We need a comprehensive plan to address all the issues.",
        exampleVietnamese: "Chúng ta cần một kế hoạch toàn diện để giải quyết tất cả các vấn đề.",
        tags: ["analysis", "complete", "thorough"]
      },
      {
        id: 3,
        cardId: 1,
        word: "Collaborate",
        pronunciation: "/kəˈlæbəreɪt/",
        partOfSpeech: "V",
        definition: "To work together with someone to achieve something.",
        vietnamese: "Cộng tác, làm việc cùng nhau để đạt được điều gì đó.",
        example: "The teams collaborated effectively to complete the project on time.",
        exampleVietnamese: "Các nhóm đã cộng tác hiệu quả để hoàn thành dự án đúng thời hạn.",
        tags: ["teamwork", "cooperation", "partnership"]
      },
      {
        id: 4,
        cardId: 1,
        word: "Fragile",
        pronunciation: "/ˈfrædʒaɪl/",
        partOfSpeech: "Adj",
        definition: "Easily broken or damaged; delicate.",
        vietnamese: "Dễ vỡ hoặc hư hỏng; mỏng manh, dễ tổn thương.",
        example: "The fragile ecosystem requires careful protection.",
        exampleVietnamese: "Hệ sinh thái mỏng manh này cần được bảo vệ cẩn thận.",
        tags: ["delicate", "vulnerable", "breakable"]
      },
      {
        id: 5,
        cardId: 1,
        word: "However",
        pronunciation: "/haʊˈevə/",
        partOfSpeech: "Adv",
        definition: "Used to introduce a contrast or opposing idea.",
        vietnamese: "Tuy nhiên, được dùng để giới thiệu một ý tương phản hoặc đối lập.",
        example: "The task was difficult; however, we managed to complete it.",
        exampleVietnamese: "Nhiệm vụ rất khó khăn; tuy nhiên, chúng tôi đã hoàn thành được.",
        tags: ["contrast", "transition", "conjunction"]
      },
      {
        id: 6,
        cardId: 1,
        word: "Innovation",
        pronunciation: "/ˌɪnəˈveɪʃn/",
        partOfSpeech: "N",
        definition: "A new idea, method, or device; the act of innovating.",
        vietnamese: "Một ý tưởng, phương pháp hoặc thiết bị mới; hành động đổi mới.",
        example: "Innovation is crucial for staying competitive in the market.",
        exampleVietnamese: "Đổi mới là rất quan trọng để duy trì khả năng cạnh tranh trên thị trường.",
        tags: ["creativity", "technology", "progress"]
      },
      {
        id: 7,
        cardId: 1,
        word: "Efficiency",
        pronunciation: "/ɪˈfɪʃnsi/",
        partOfSpeech: "N",
        definition: "The ability to do something well without wasting time or resources.",
        vietnamese: "Khả năng làm việc gì đó tốt mà không lãng phí thời gian hoặc tài nguyên; hiệu quả.",
        example: "We need to improve the efficiency of our production process.",
        exampleVietnamese: "Chúng ta cần cải thiện hiệu quả của quy trình sản xuất.",
        tags: ["productivity", "optimization", "performance"]
      },
      {
        id: 8,
        cardId: 1,
        word: "Reliable",
        pronunciation: "/rɪˈlaɪəbl/",
        partOfSpeech: "Adj",
        definition: "Consistently good in quality or performance; dependable.",
        vietnamese: "Luôn tốt về chất lượng hoặc hiệu suất; đáng tin cậy.",
        example: "She is a reliable employee who always meets deadlines.",
        exampleVietnamese: "Cô ấy là một nhân viên đáng tin cậy, luôn hoàn thành công việc đúng hạn.",
        tags: ["trustworthy", "consistent", "dependable"]
      },
      {
        id: 9,
        cardId: 1,
        word: "Adaptable",
        pronunciation: "/əˈdæptəbl/",
        partOfSpeech: "Adj",
        definition: "Able to change or be changed in order to deal with new situations.",
        vietnamese: "Có khả năng thay đổi hoặc được thay đổi để đối phó với tình huống mới; thích nghi.",
        example: "An adaptable workforce is essential in today's changing economy.",
        exampleVietnamese: "Lực lượng lao động có khả năng thích nghi là thiết yếu trong nền kinh tế thay đổi ngày nay.",
        tags: ["flexibility", "adjustment", "versatile"]
      },
      {
        id: 10,
        cardId: 1,
        word: "Sustain",
        pronunciation: "/səˈsteɪn/",
        partOfSpeech: "V",
        definition: "To maintain or support over time.",
        vietnamese: "Duy trì hoặc hỗ trợ trong một thời gian dài; bền vững.",
        example: "We need to sustain our efforts to achieve long-term success.",
        exampleVietnamese: "Chúng ta cần duy trì nỗ lực để đạt được thành công lâu dài.",
        tags: ["maintain", "support", "endurance"]
      },
      {
        id: 11,
        cardId: 1,
        word: "Crucial",
        pronunciation: "/ˈkruːʃl/",
        partOfSpeech: "Adj",
        definition: "Extremely important or necessary.",
        vietnamese: "Cực kỳ quan trọng hoặc cần thiết; then chót.",
        example: "Good communication is crucial for team success.",
        exampleVietnamese: "Giao tiếp tốt là rất quan trọng cho thành công của nhóm.",
        tags: ["important", "essential", "critical"]
      },
      {
        id: 12,
        cardId: 1,
        word: "Disrupt",
        pronunciation: "/dɪsˈrʌpt/",
        partOfSpeech: "V",
        definition: "To interrupt the normal progress of something.",
        vietnamese: "Làm gián đoạn tiến trình bình thường của một việc gì đó; phá vỡ.",
        example: "New technology can disrupt traditional business models.",
        exampleVietnamese: "Công nghệ mới có thể phá vỡ các mô hình kinh doanh truyền thống.",
        tags: ["interrupt", "change", "innovation"]
      },
      {
        id: 13,
        cardId: 1,
        word: "Evaluate",
        pronunciation: "/ɪˈvæljueɪt/",
        partOfSpeech: "V",
        definition: "To judge or calculate the quality, importance, or value of something.",
        vietnamese: "Đánh giá hoặc tính toán chất lượng, tầm quan trọng hoặc giá trị của một việc gì đó.",
        example: "We need to evaluate the effectiveness of our marketing strategy.",
        exampleVietnamese: "Chúng ta cần đánh giá hiệu quả của chiến lược tiếp thị.",
        tags: ["assess", "analyze", "judge"]
      },
      {
        id: 14,
        cardId: 1,
        word: "Determine",
        pronunciation: "/dɪˈtɜːmɪn/",
        partOfSpeech: "V",
        definition: "To decide something officially or to discover the facts.",
        vietnamese: "Quyết định một việc gì đó một cách chính thức hoặc khám phá sự thật; xác định.",
        example: "The committee will determine the winner of the competition.",
        exampleVietnamese: "Ủy ban sẽ xác định người chiến thắng trong cuộc thi.",
        tags: ["decide", "establish", "identify"]
      },
      {
        id: 15,
        cardId: 1,
        word: "Strategy",
        pronunciation: "/ˈstrætədʒi/",
        partOfSpeech: "N",
        definition: "A plan of action designed to achieve a long-term or overall aim.",
        vietnamese: "Một kế hoạch hành động được thiết kế để đạt được mục tiêu dài hạn hoặc tổng thể; chiến lược.",
        example: "The company's growth strategy focuses on expanding into new markets.",
        exampleVietnamese: "Chiến lược tăng trưởng của công ty tập trung vào việc mở rộng sang các thị trường mới.",
        tags: ["planning", "approach", "method"]
      },
      {
        id: 16,
        cardId: 1,
        word: "Diverse",
        pronunciation: "/daɪˈvɜːs/",
        partOfSpeech: "Adj",
        definition: "Showing a great deal of variety; very different.",
        vietnamese: "Thể hiện sự đa dạng lớn; rất khác nhau; đa dạng.",
        example: "Our team has diverse backgrounds and experiences.",
        exampleVietnamese: "Nhóm của chúng tôi có những nền tảng và kinh nghiệm đa dạng.",
        tags: ["variety", "different", "mixed"]
      },
      {
        id: 17,
        cardId: 1,
        word: "Negotiate",
        pronunciation: "/nɪˈɡəʊʃieɪt/",
        partOfSpeech: "V",
        definition: "To discuss something in order to reach an agreement.",
        vietnamese: "Thảo luận về một việc gì đó để đạt được thỏa thuận; đàm phán.",
        example: "Both parties need to negotiate to find a mutually beneficial solution.",
        exampleVietnamese: "Cả hai bên cần đàm phán để tìm ra giải pháp có lợi cho cả hai.",
        tags: ["discuss", "bargain", "agreement"]
      },
      {
        id: 18,
        cardId: 1,
        word: "Emphasize",
        pronunciation: "/ˈemfəsaɪz/",
        partOfSpeech: "V",
        definition: "To give special importance or attention to something.",
        vietnamese: "Đưa ra tầm quan trọng hoặc sự chú ý đặc biệt cho một việc gì đó; nhấn mạnh.",
        example: "The teacher emphasized the importance of regular practice.",
        exampleVietnamese: "Giáo viên nhấn mạnh tầm quan trọng của việc luyện tập thường xuyên.",
        tags: ["highlight", "stress", "focus"]
      },
      {
        id: 19,
        cardId: 1,
        word: "Ambiguous",
        pronunciation: "/æmˈbɪɡjuəs/",
        partOfSpeech: "Adj",
        definition: "Open to more than one interpretation; unclear.",
        vietnamese: "Có thể hiểu theo nhiều cách khác nhau; không rõ ràng; mơ hồ.",
        example: "The instructions were ambiguous, leading to confusion among the team.",
        exampleVietnamese: "Những hướng dẫn mơ hồ đã dẫn đến sự nhầm lẫn trong nhóm.",
        tags: ["unclear", "confusing", "vague"]
      },
      {
        id: 20,
        cardId: 1,
        word: "Allocate",
        pronunciation: "/ˈæləkeɪt/",
        partOfSpeech: "V",
        definition: "To distribute resources or duties for a specific purpose.",
        vietnamese: "Phân phối tài nguyên hoặc nhiệm vụ cho một mục đích cụ thể; phân bổ.",
        example: "We need to allocate more budget for research and development.",
        exampleVietnamese: "Chúng ta cần phân bổ thêm ngân sách cho nghiên cứu và phát triển.",
        tags: ["distribute", "assign", "designate"]
      },
      // Sample words for other cards
      {
        id: 21,
        cardId: 2,
        word: "Algorithm",
        pronunciation: "/ˈælɡərɪðəm/",
        partOfSpeech: "N",
        definition: "A set of rules to be followed in calculations or problem-solving operations.",
        vietnamese: "Một tập hợp các quy tắc cần tuân theo trong tính toán hoặc các hoạt động giải quyết vấn đề; thuật toán.",
        example: "The algorithm efficiently processes large amounts of data.",
        exampleVietnamese: "Thuật toán xử lý hiệu quả lượng lớn dữ liệu.",
        tags: ["technology", "computing", "programming"]
      },
      {
        id: 22,
        cardId: 3,
        word: "Sustainable",
        pronunciation: "/səˈsteɪnəbl/",
        partOfSpeech: "Adj",
        definition: "Able to be maintained at a certain rate or level without depleting natural resources.",
        vietnamese: "Có thể duy trì ở một tỷ lệ hoặc mức độ nhất định mà không cạn kiệt tài nguyên thiên nhiên; bền vững.",
        example: "The company is committed to sustainable development practices.",
        exampleVietnamese: "Công ty cam kết thực hiện các hoạt động phát triển bền vững.",
        tags: ["environment", "ecology", "conservation"]
      },
      {
        id: 23,
        cardId: 4,
        word: "Executive",
        pronunciation: "/ɪɡˈzekjətɪv/",
        partOfSpeech: "N",
        definition: "A senior manager in a business organization.",
        vietnamese: "Một nhà quản lý cấp cao trong tổ chức kinh doanh; giám đốc điều hành.",
        example: "The executive made important strategic decisions.",
        exampleVietnamese: "Giám đốc điều hành đã đưa ra những quyết định chiến lược quan trọng.",
        tags: ["management", "leadership", "business"]
      },
      {
        id: 24,
        cardId: 5,
        word: "Paradigm",
        pronunciation: "/ˈpærədaɪm/",
        partOfSpeech: "N",
        definition: "A typical example or pattern of something; a model.",
        vietnamese: "Một ví dụ điển hình hoặc mô hình của một cái gì đó; mô hình, khuôn mẫu.",
        example: "The new technology represents a paradigm shift in how we work.",
        exampleVietnamese: "Công nghệ mới đại diện cho sự thay đổi mô hình trong cách chúng ta làm việc.",
        tags: ["concept", "model", "change"]
      },
      {
        id: 25,
        cardId: 6,
        word: "Go down a rabbit hole",
        pronunciation: "/ɡəʊ daʊn ə ˈræbɪt həʊl/",
        partOfSpeech: "Idiom",
        definition: "A bizarre or confusing situation or environment, often one that becomes increasingly complicated the deeper one explores it.",
        vietnamese: "Một tình huống kỳ quái hoặc rối rắm, thường trở nên phức tạp hơn khi bạn càng tìm hiểu sâu. Sa đà vào một chủ đề mà không để ý thời gian.",
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

  // Essay Grading Methods
  async createEssayGrading(essay: InsertEssayGrading): Promise<EssayGrading> {
    const id = this.currentEssayId++;
    const essayGrading: EssayGrading = {
      ...essay,
      id,
      fileName: essay.fileName || null,
      overallScore: null,
      taskAchievement: null,
      coherenceCohesion: null,
      lexicalResource: null,
      grammaticalRange: null,
      feedback: null
    };
    this.essayGradings.set(id, essayGrading);
    return essayGrading;
  }

  async updateEssayGradingScores(id: number, scores: {
    overallScore: number;
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
    feedback: string;
  }): Promise<EssayGrading | undefined> {
    const essay = this.essayGradings.get(id);
    if (!essay) return undefined;

    const updatedEssay: EssayGrading = {
      ...essay,
      ...scores
    };
    this.essayGradings.set(id, updatedEssay);
    return updatedEssay;
  }

  async getAllEssayGradings(): Promise<EssayGrading[]> {
    return Array.from(this.essayGradings.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getEssayGrading(id: number): Promise<EssayGrading | undefined> {
    return this.essayGradings.get(id);
  }
}

export const storage = new MemStorage();

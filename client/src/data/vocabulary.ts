import { WritingTestType } from "@/components/writing-practice/test-setup";

export interface VocabularyCategory {
  name: string;
  type: "neutral" | "positive" | "negative" | "academic";
  words: string[];
}

// Vocabulary categories and words based on test type and topic
const vocabularyByTestType: Record<WritingTestType, VocabularyCategory[]> = {
  "ielts-task2": [
    {
      name: "Technology Impact",
      type: "neutral",
      words: ["technological advancement", "digital transformation", "innovation", "automation", "artificial intelligence", "digital era", "smart devices"],
    },
    {
      name: "Positive Effects",
      type: "positive",
      words: ["enhance efficiency", "streamline processes", "facilitate communication", "boost productivity", "improve accessibility", "advance healthcare", "educational tools"],
    },
    {
      name: "Negative Effects",
      type: "negative",
      words: ["digital dependency", "information overload", "privacy concerns", "social isolation", "technological addiction", "cybersecurity threats", "digital divide"],
    },
    {
      name: "Academic Phrases",
      type: "academic",
      words: ["significantly impact", "contribute substantially", "considerable influence", "markedly affect", "fundamentally alter", "notably transform", "profoundly change"],
    },
  ],
  "toefl": [
    {
      name: "Education Terms",
      type: "neutral",
      words: ["academic environment", "classroom setting", "educational institution", "curriculum", "extracurricular activities", "lecture", "seminar"],
    },
    {
      name: "Learning Benefits",
      type: "positive",
      words: ["knowledge acquisition", "skill development", "critical thinking", "analytical abilities", "personal growth", "intellectual curiosity", "lifelong learning"],
    },
    {
      name: "Challenges",
      type: "negative",
      words: ["academic pressure", "time constraints", "information retention", "testing anxiety", "overwhelmed", "competitive atmosphere", "burnout"],
    },
    {
      name: "Academic Expressions",
      type: "academic",
      words: ["extensively research", "thoroughly examine", "comprehensively analyze", "carefully consider", "objectively evaluate", "systematically approach", "methodically study"],
    },
  ],
  "general": [
    {
      name: "Society & Culture",
      type: "neutral",
      words: ["societal norms", "cultural diversity", "community values", "traditions", "globalization", "demographic changes", "social institutions"],
    },
    {
      name: "Benefits & Progress",
      type: "positive",
      words: ["harmonious coexistence", "inclusive policies", "mutual understanding", "community support", "social cohesion", "cultural enrichment", "collaborative efforts"],
    },
    {
      name: "Challenges & Issues",
      type: "negative",
      words: ["social inequality", "cultural barriers", "miscommunication", "prejudice", "discrimination", "social division", "marginalization"],
    },
    {
      name: "Formal Expressions",
      type: "academic",
      words: ["widely acknowledged", "generally recognized", "commonly observed", "frequently demonstrated", "broadly accepted", "universally understood", "collectively embraced"],
    },
  ],
  "business": [
    {
      name: "Corporate Terms",
      type: "neutral",
      words: ["organizational structure", "corporate culture", "business strategy", "market position", "stakeholders", "revenue streams", "operational efficiency"],
    },
    {
      name: "Business Advantages",
      type: "positive",
      words: ["competitive edge", "market dominance", "sustainable growth", "innovative approach", "strategic partnerships", "customer loyalty", "brand recognition"],
    },
    {
      name: "Business Challenges",
      type: "negative",
      words: ["market volatility", "economic downturn", "competitive pressure", "resource constraints", "regulatory hurdles", "diminishing returns", "talent retention"],
    },
    {
      name: "Professional Language",
      type: "academic",
      words: ["implement strategies", "maximize potential", "optimize resources", "leverage capabilities", "facilitate growth", "enhance performance", "drive innovation"],
    },
  ],
};

// Function to get vocabulary based on test type and topic
export function getVocabulary(
  testType: WritingTestType,
  topic: string
): VocabularyCategory[] {
  // In a real implementation, we would analyze the topic and provide relevant vocabulary
  // For now, we'll just return vocabulary based on test type
  return vocabularyByTestType[testType];
}

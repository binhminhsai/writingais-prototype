import { WritingTestType } from "@/components/writing-practice/test-setup";

export interface PhraseCategory {
  name: string;
  phrases: string[];
  description?: string;
}

// Phân loại theo 5 nhóm chính
export const phraseCategories = [
  {
    id: "introduction",
    name: "Giới thiệu và Mở đầu chủ đề",
    description: "Các cụm từ dùng để giới thiệu chủ đề hoặc vấn đề chính"
  },
  {
    id: "arguments",
    name: "Trình bày lập luận hoặc quan điểm",
    description: "Các cụm từ thể hiện quan điểm hoặc lập luận"
  },
  {
    id: "examples",
    name: "Đưa ra ví dụ hoặc chứng minh",
    description: "Các cụm từ dùng để đưa ra ví dụ, minh họa hoặc bằng chứng"
  },
  {
    id: "comparison",
    name: "So sánh hoặc phản biện các quan điểm",
    description: "Các cụm từ dùng để trình bày các quan điểm đối lập hoặc so sánh"
  },
  {
    id: "conclusion",
    name: "Kết luận",
    description: "Các cụm từ dùng để kết luận hoặc tóm tắt luận điểm"
  }
];

// Useful phrases by test type and category
const phrasesByTestType: Record<WritingTestType, PhraseCategory[]> = {
  "ielts-task2": [
    {
      name: "Introduction",
      phrases: [
        "It is often argued that...",
        "The issue of... has generated considerable debate.",
        "In contemporary society, the question of... is of paramount importance.",
        "Recently, there has been growing interest in...",
        "Over the past few decades, ... has become a topic of heated debate.",
      ],
    },
    {
      name: "Presenting Arguments",
      phrases: [
        "Proponents of this viewpoint claim that...",
        "Those who support... maintain that...",
        "On the one hand, it can be argued that...",
        "Critics contend that...",
        "Opponents of this idea point out that...",
        "There are several reasons why...",
      ],
    },
    {
      name: "Adding Examples",
      phrases: [
        "A clear illustration of this is...",
        "For instance, research has shown that...",
        "To exemplify this point...",
        "A case in point is...",
        "This can be demonstrated by...",
        "Evidence of this can be seen in...",
      ],
    },
    {
      name: "Conclusion",
      phrases: [
        "In conclusion, I believe that...",
        "Having considered both perspectives, it seems clear that...",
        "While acknowledging..., I maintain that...",
        "To sum up, the evidence suggests that...",
        "On balance, it appears that...",
        "In light of the arguments presented, I would argue that...",
      ],
    },
  ],
  "toefl": [
    {
      name: "Introduction",
      phrases: [
        "The topic of... has been widely debated in our society.",
        "There are conflicting views about whether...",
        "Many people hold different opinions on the issue of...",
        "Over the years, there has been much discussion about...",
        "This is a complex issue with arguments on both sides.",
      ],
    },
    {
      name: "Presenting Opinion",
      phrases: [
        "In my view...",
        "I firmly believe that...",
        "From my perspective...",
        "Based on my experience, I think that...",
        "I am convinced that...",
        "It is my personal opinion that...",
      ],
    },
    {
      name: "Supporting Arguments",
      phrases: [
        "My first reason is...",
        "Another point to consider is...",
        "Furthermore, it is important to note that...",
        "In addition to this...",
        "An equally significant aspect is...",
        "What's more, we should not forget that...",
      ],
    },
    {
      name: "Conclusion",
      phrases: [
        "To conclude, I would argue that...",
        "In summary, it is clear that...",
        "For these reasons, I believe that...",
        "In conclusion, my position is that...",
        "Considering all these points, I maintain that...",
        "Therefore, I strongly believe that...",
      ],
    },
  ],
  "general": [
    {
      name: "Starting Points",
      phrases: [
        "When considering the question of...",
        "There are several aspects to explore regarding...",
        "This topic can be examined from various angles...",
        "The matter of... involves many considerations.",
        "In addressing this subject, it's important to...",
      ],
    },
    {
      name: "Comparing & Contrasting",
      phrases: [
        "On the one hand... on the other hand...",
        "While... in contrast...",
        "Despite... however...",
        "Although... nevertheless...",
        "Some argue that... whereas others suggest...",
        "There is a clear distinction between... and...",
      ],
    },
    {
      name: "Explaining Causes & Effects",
      phrases: [
        "This is primarily due to...",
        "A major factor contributing to this is...",
        "As a result of...",
        "This leads to...",
        "The primary cause of... is...",
        "Consequently, this results in...",
      ],
    },
    {
      name: "Concluding Thoughts",
      phrases: [
        "Taking everything into account...",
        "After considering the various aspects...",
        "From the evidence presented...",
        "Based on these considerations...",
        "Looking at both sides of the argument...",
        "Weighing up all the factors...",
      ],
    },
  ],
  "business": [
    {
      name: "Introduction to Business Topics",
      phrases: [
        "In today's competitive business environment...",
        "As organizations face increasing challenges...",
        "The current market conditions require...",
        "In the context of global business...",
        "From a corporate perspective...",
      ],
    },
    {
      name: "Analysis & Evaluation",
      phrases: [
        "A careful analysis reveals that...",
        "When evaluating business performance...",
        "The data clearly indicates that...",
        "Market research suggests that...",
        "From a strategic standpoint...",
        "According to business analytics...",
      ],
    },
    {
      name: "Recommendations",
      phrases: [
        "The most effective approach would be to...",
        "It is advisable for companies to...",
        "Organizations should prioritize...",
        "A viable strategy would involve...",
        "To maximize results, businesses should...",
        "I would recommend that management...",
      ],
    },
    {
      name: "Business Conclusions",
      phrases: [
        "In the final analysis, business success depends on...",
        "The key takeaway for organizations is...",
        "To remain competitive, companies must...",
        "The business implications are clear...",
        "From a management perspective, the conclusion is...",
        "For sustainable business growth, it is essential to...",
      ],
    },
  ],
};

// Các cụm từ được phân loại theo 5 nhóm chính
export const structuredPhrases = {
  introduction: [
    "The issue of... has generated considerable debate.",
    "In contemporary society, the question of... is of paramount importance.",
    "Recently, there has been growing interest in...",
    "Over the past few decades, ... has become a topic of heated debate.",
    "It is often argued that...",
    "The topic of... has been widely debated in our society.",
    "There are conflicting views about whether...",
    "Many people hold different opinions on the issue of...",
    "When considering the question of...",
    "In today's competitive business environment...",
  ],
  arguments: [
    "Proponents of this viewpoint claim that...",
    "Those who support... maintain that...",
    "Critics contend that...",
    "Opponents of this idea point out that...",
    "There are several reasons why...",
    "In my view...",
    "I firmly believe that...",
    "From my perspective...",
    "Based on my experience, I think that...",
    "I am convinced that...",
    "A careful analysis reveals that...",
  ],
  examples: [
    "A clear illustration of this is...",
    "For instance, research has shown that...",
    "To exemplify this point...",
    "A case in point is...",
    "This can be demonstrated by...",
    "Evidence of this can be seen in...",
    "The data clearly indicates that...",
    "Market research suggests that...",
    "This is evident from the fact that...",
    "To illustrate this further...",
  ],
  comparison: [
    "On the one hand... on the other hand...",
    "While... in contrast...",
    "Despite... however...",
    "Although... nevertheless...",
    "Some argue that... whereas others suggest...",
    "There is a clear distinction between... and...",
    "Compared to..., the situation with... is quite different.",
    "Unlike..., the case of... demonstrates that...",
    "This approach offers advantages over...",
    "When we contrast... with..., we can see that...",
  ],
  conclusion: [
    "In conclusion, I believe that...",
    "Having considered both perspectives, it seems clear that...",
    "While acknowledging..., I maintain that...",
    "To sum up, the evidence suggests that...",
    "On balance, it appears that...",
    "In light of the arguments presented, I would argue that...",
    "To conclude, I would argue that...",
    "In summary, it is clear that...",
    "Taking everything into account...",
    "For these reasons, I believe that...",
  ]
};

export function getPhrases(testType: WritingTestType): PhraseCategory[] {
  return phrasesByTestType[testType];
}

// Hàm lấy các cụm từ theo cấu trúc 5 nhóm
export function getStructuredPhrases() {
  return structuredPhrases;
}

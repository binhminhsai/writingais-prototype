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

// Các cụm từ được phân loại theo 5 nhóm chính với 6 câu mỗi loại
export const structuredPhrases = {
  introduction: [
    "The issue of crime causation has generated considerable debate in recent years.",
    "In contemporary society, the question of why people commit crimes is of paramount importance.",
    "Recently, there has been growing interest in understanding the root causes of criminal behavior.",
    "Over the past few decades, many theories have been proposed to explain why individuals engage in criminal activities.",
    "It is often argued that crime results from either social factors such as poverty or inherent personal traits.",
    "When considering the question of why crimes occur, both environmental and personal factors are often discussed."
  ],
  arguments: [
    "Proponents argue that poverty and social problems such as unemployment and lack of education are the main reasons why people commit crimes.",
    "Those who support this view believe that difficult living conditions push individuals towards criminal behavior as a means of survival.",
    "On the other hand, some people claim that crime stems from an individual's bad nature or moral weakness rather than external factors.",
    "Critics of the social causes perspective contend that some individuals choose to commit crimes simply because of their inherent character flaws.",
    "From my point of view, both poverty and bad nature contribute to criminal acts, but the influence of social environment is often stronger.",
    "I believe that while bad nature can lead some to crime, many criminal behaviors are triggered by desperation caused by poverty and social inequality."
  ],
  examples: [
    "A clear illustration of this is the high crime rates observed in economically disadvantaged neighborhoods, where poverty and unemployment are widespread.",
    "For instance, research has shown that areas with limited social services and poor educational opportunities tend to have higher incidences of theft and drug-related crimes.",
    "To exemplify this point, studies conducted by criminologists reveal that individuals from broken families or violent environments are more likely to engage in criminal activities.",
    "A case in point is the correlation found between juvenile delinquency and lack of parental supervision or social support.",
    "This can be demonstrated by statistical data indicating that countries with greater income inequality often experience more violent crimes.",
    "Evidence of this can be seen in various social reports that link poverty with an increased risk of involvement in illegal activities."
  ],
  comparison: [
    "While it is undeniable that poverty and social problems create conditions that may lead to crime, it is equally important to consider that not everyone facing such hardships resorts to illegal behavior.",
    "Conversely, the argument that crime stems solely from bad nature overlooks the significant impact that environment and social context have on shaping an individual's actions.",
    "Some critics of the bad nature theory point out that it may be too deterministic and neglects the possibility of change through education and rehabilitation.",
    "On the other hand, those who emphasize social causes sometimes underestimate personal accountability and the role of individual choice in committing crimes.",
    "It is worth noting that both perspectives have valid points, but neither offers a complete explanation on its own.",
    "A balanced view suggests that criminal behavior results from a complex interaction between a person's character and their social environment."
  ],
  conclusion: [
    "In conclusion, both social conditions and individual characteristics contribute to criminal behavior, and neither factor should be ignored.",
    "To sum up, while poverty and social problems may increase the likelihood of crime, personal nature ultimately influences one's decisions.",
    "In brief, a balanced understanding of crime causes must take into account both environmental and personal factors.",
    "Overall, addressing social inequalities and promoting ethical values are essential to effectively reduce crime rates.",
    "Ultimately, reducing crime requires a comprehensive approach that combines social reform with personal accountability.",
    "In summary, a multifaceted strategy is necessary to tackle the root causes of crime and build a safer society."
  ]
};

export function getPhrases(testType: WritingTestType): PhraseCategory[] {
  return phrasesByTestType[testType];
}

// Hàm lấy các cụm từ theo cấu trúc 5 nhóm
export function getStructuredPhrases() {
  return structuredPhrases;
}

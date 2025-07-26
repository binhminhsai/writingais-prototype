export interface Task1VocabularyWord {
  word: string;
  partOfSpeech: "N" | "V" | "Adj" | "Adv" | "Phrase";
  difficulty: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  meaning: string;
  example: string;
}

export interface Task1VocabularyCategory {
  name: string;
  type: "neutral" | "positive" | "negative" | "academic";
  words: Task1VocabularyWord[];
}

// Task 1 specific vocabulary categories
const task1VocabularyCategories: Task1VocabularyCategory[] = [
  {
    name: "Data Description",
    type: "neutral",
    words: [
      {
        word: "Fluctuate",
        partOfSpeech: "V",
        difficulty: "B2",
        meaning: "Dao động, biến động",
        example: "The data shows that prices fluctuated significantly throughout the period."
      },
      {
        word: "Peak",
        partOfSpeech: "N",
        difficulty: "B1",
        meaning: "Đỉnh cao, mức cao nhất",
        example: "The graph reached its peak in December 2023."
      },
      {
        word: "Decline",
        partOfSpeech: "V",
        difficulty: "B1",
        meaning: "Giảm, suy giảm",
        example: "Sales declined steadily from March to August."
      },
      {
        word: "Surge",
        partOfSpeech: "V",
        difficulty: "B2",
        meaning: "Tăng vọt, tăng mạnh",
        example: "The number of applications surged dramatically in the final quarter."
      },
      {
        word: "Plateau",
        partOfSpeech: "V",
        difficulty: "C1",
        meaning: "Đạt mức ổn định, không thay đổi",
        example: "After a period of growth, the figures plateaued at around 500."
      }
    ]
  },
  {
    name: "Trends and Patterns",
    type: "academic",
    words: [
      {
        word: "Upward trend",
        partOfSpeech: "Phrase",
        difficulty: "B2",
        meaning: "Xu hướng tăng",
        example: "The chart illustrates a clear upward trend in renewable energy consumption."
      },
      {
        word: "Downward trend",
        partOfSpeech: "Phrase",
        difficulty: "B2",
        meaning: "Xu hướng giảm",
        example: "There was a notable downward trend in traditional media usage."
      },
      {
        word: "Consistent pattern",
        partOfSpeech: "Phrase",
        difficulty: "B2",
        meaning: "Mô hình nhất quán",
        example: "The data reveals a consistent pattern of growth during summer months."
      },
      {
        word: "Gradual increase",
        partOfSpeech: "Phrase",
        difficulty: "B1",
        meaning: "Tăng dần",
        example: "The graph shows a gradual increase in online shopping from 2020 to 2023."
      },
      {
        word: "Steep rise",
        partOfSpeech: "Phrase",
        difficulty: "B2",
        meaning: "Tăng mạnh",
        example: "The chart depicts a steep rise in unemployment during the economic crisis."
      }
    ]
  },
  {
    name: "Comparisons",
    type: "neutral",
    words: [
      {
        word: "Exceed",
        partOfSpeech: "V",
        difficulty: "B2",
        meaning: "Vượt quá",
        example: "Online sales exceeded traditional retail sales by 30% in 2023."
      },
      {
        word: "Lag behind",
        partOfSpeech: "Phrase",
        difficulty: "B2",
        meaning: "Tụt lại phía sau",
        example: "Rural areas lagged behind urban centers in internet adoption."
      },
      {
        word: "Marginally higher",
        partOfSpeech: "Phrase",
        difficulty: "C1",
        meaning: "Cao hơn một chút",
        example: "The results were marginally higher than the previous year's figures."
      },
      {
        word: "Substantially lower",
        partOfSpeech: "Phrase",
        difficulty: "B2",
        meaning: "Thấp hơn đáng kể",
        example: "Production costs were substantially lower in developing countries."
      },
      {
        word: "Roughly equivalent",
        partOfSpeech: "Phrase",
        difficulty: "B2",
        meaning: "Tương đương",
        example: "The two regions showed roughly equivalent growth rates."
      }
    ]
  },
  {
    name: "Time Expressions",
    type: "academic",
    words: [
      {
        word: "Subsequently",
        partOfSpeech: "Adv",
        difficulty: "C1",
        meaning: "Sau đó",
        example: "The market crashed in 2008 and subsequently recovered by 2012."
      },
      {
        word: "Concurrently",
        partOfSpeech: "Adv",
        difficulty: "C1",
        meaning: "Đồng thời",
        example: "Concurrently, both unemployment and inflation rates increased."
      },
      {
        word: "Prior to",
        partOfSpeech: "Phrase",
        difficulty: "B2",
        meaning: "Trước khi",
        example: "Prior to 2020, the trend was relatively stable."
      },
      {
        word: "Throughout the period",
        partOfSpeech: "Phrase",
        difficulty: "B1",
        meaning: "Trong suốt thời kỳ",
        example: "Sales remained stable throughout the period from 2018 to 2021."
      },
      {
        word: "In the interim",
        partOfSpeech: "Phrase",
        difficulty: "C1",
        meaning: "Trong thời gian tạm thời",
        example: "The company launched new products, and in the interim, profits doubled."
      }
    ]
  }
];

// Topic-specific vocabulary based on chart type
const topicSpecificVocabulary: Record<string, Task1VocabularyCategory[]> = {
  "bar-charts": [
    {
      name: "Bar Chart Specifics",
      type: "academic",
      words: [
        {
          word: "Category",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Hạng mục, danh mục",
          example: "The bar chart compares data across five different categories."
        },
        {
          word: "Vertical axis",
          partOfSpeech: "Phrase",
          difficulty: "B2",
          meaning: "Trục dọc",
          example: "The vertical axis represents the number of participants."
        },
        {
          word: "Horizontal axis",
          partOfSpeech: "Phrase",
          difficulty: "B2",
          meaning: "Trục ngang",
          example: "The horizontal axis shows the different time periods."
        }
      ]
    }
  ],
  "line-charts": [
    {
      name: "Line Chart Specifics",
      type: "academic",
      words: [
        {
          word: "Data point",
          partOfSpeech: "Phrase",
          difficulty: "B2",
          meaning: "Điểm dữ liệu",
          example: "Each data point on the line represents monthly sales figures."
        },
        {
          word: "Intersection",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Điểm giao nhau",
          example: "The two lines show an intersection at the 50% mark."
        },
        {
          word: "Trajectory",
          partOfSpeech: "N",
          difficulty: "C1",
          meaning: "Quỹ đạo, đường đi",
          example: "The trajectory of the line indicates continued growth."
        }
      ]
    }
  ],
  "pie-charts": [
    {
      name: "Pie Chart Specifics",
      type: "academic",
      words: [
        {
          word: "Segment",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Phần, đoạn",
          example: "The largest segment of the pie chart represents online sales."
        },
        {
          word: "Proportion",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Tỷ lệ",
          example: "The proportion of renewable energy increased to 40%."
        },
        {
          word: "Constitute",
          partOfSpeech: "V",
          difficulty: "B2",
          meaning: "Tạo thành, chiếm",
          example: "Manufacturing constitutes the largest portion of the economy."
        }
      ]
    }
  ],
  "tables": [
    {
      name: "Table Specifics",
      type: "academic",
      words: [
        {
          word: "Column",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Cột",
          example: "The first column shows the countries, while the second shows population data."
        },
        {
          word: "Row",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Hàng",
          example: "Each row represents data for a different year."
        },
        {
          word: "Cell",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Ô",
          example: "The highlighted cell contains the most significant figure."
        }
      ]
    }
  ]
};

export function getTask1Vocabulary(questionType?: string): Task1VocabularyCategory[] {
  const generalVocabulary = task1VocabularyCategories;
  
  if (questionType && topicSpecificVocabulary[questionType]) {
    return [...generalVocabulary, ...topicSpecificVocabulary[questionType]];
  }
  
  return generalVocabulary;
}
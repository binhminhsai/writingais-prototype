import { WritingTestType } from "@/components/writing-practice/test-setup";

export interface VocabularyWord {
  word: string;
  partOfSpeech: "N" | "V" | "Adj" | "Adv" | "Phrase";
  difficulty: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  meaning: string;
  example: string;
}

export interface VocabularyCategory {
  name: string;
  type: "neutral" | "positive" | "negative" | "academic";
  words: VocabularyWord[];
}

// Vocabulary categories and words based on test type and topic
const vocabularyByTestType: Record<WritingTestType, VocabularyCategory[]> = {
  "opinion": [
    {
      name: "Technology Impact",
      type: "neutral",
      words: [
        {
          word: "Technological advancement",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Sự tiến bộ về công nghệ",
          example: "Technological advancements have transformed how we communicate in the workplace."
        },
        {
          word: "Digital transformation",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Sự chuyển đổi kỹ thuật số",
          example: "Many businesses are undergoing digital transformation to remain competitive."
        },
        {
          word: "Innovation",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Sự đổi mới, cải tiến",
          example: "Continuous innovation is necessary for companies to stay relevant in today's market."
        },
        {
          word: "Automation",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Sự tự động hóa",
          example: "Factory automation has reduced the need for manual labor in manufacturing."
        },
        {
          word: "Artificial intelligence",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Trí tuệ nhân tạo",
          example: "Artificial intelligence is being implemented in healthcare to improve diagnosis accuracy."
        }
      ],
    },
    {
      name: "Positive Effects",
      type: "positive",
      words: [
        {
          word: "Enhance efficiency",
          partOfSpeech: "Phrase",
          difficulty: "B2",
          meaning: "Nâng cao hiệu quả",
          example: "Cloud computing solutions enhance efficiency by allowing teams to collaborate in real time."
        },
        {
          word: "Streamline processes",
          partOfSpeech: "Phrase",
          difficulty: "C1",
          meaning: "Đơn giản hóa quy trình",
          example: "The new software helped to streamline processes in the accounting department."
        },
        {
          word: "Facilitate communication",
          partOfSpeech: "Phrase",
          difficulty: "B2",
          meaning: "Tạo điều kiện giao tiếp",
          example: "Video conferencing tools facilitate communication between remote team members."
        },
        {
          word: "Boost productivity",
          partOfSpeech: "Phrase",
          difficulty: "B1",
          meaning: "Tăng năng suất",
          example: "The company invested in new equipment to boost productivity in their manufacturing plant."
        }
      ],
    },
    {
      name: "Negative Effects",
      type: "negative",
      words: [
        {
          word: "Digital dependency",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Sự phụ thuộc vào công nghệ số",
          example: "Many people experience anxiety when separated from their phones due to digital dependency."
        },
        {
          word: "Information overload",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Quá tải thông tin",
          example: "Social media can cause information overload as users are bombarded with constant updates."
        },
        {
          word: "Privacy concerns",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Những lo ngại về quyền riêng tư",
          example: "The new app raised privacy concerns about how personal data would be used and stored."
        },
        {
          word: "Addiction",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Sự nghiện ngập",
          example: "Many individuals struggle with smartphone addiction, which can lead to sleep disruption."
        }
      ],
    },
    {
      name: "Academic Phrases",
      type: "academic",
      words: [
        {
          word: "Significantly impact",
          partOfSpeech: "Phrase",
          difficulty: "C1",
          meaning: "Ảnh hưởng đáng kể",
          example: "The new regulations will significantly impact how companies process consumer data."
        },
        {
          word: "Contribute substantially",
          partOfSpeech: "Phrase",
          difficulty: "C1",
          meaning: "Đóng góp đáng kể",
          example: "Remote work options contribute substantially to employee satisfaction and retention."
        },
        {
          word: "Considerable influence",
          partOfSpeech: "Phrase",
          difficulty: "B2",
          meaning: "Ảnh hưởng đáng kể",
          example: "Social media has a considerable influence on consumer purchasing decisions."
        },
        {
          word: "Fundamentally alter",
          partOfSpeech: "Phrase",
          difficulty: "C1",
          meaning: "Thay đổi căn bản",
          example: "Technology has fundamentally altered how we access and share information."
        }
      ],
    },
  ],
  "toefl": [
    {
      name: "Education Terms",
      type: "neutral",
      words: [
        {
          word: "Academic environment",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Môi trường học thuật",
          example: "The academic environment at the university encourages critical thinking and open discussion."
        },
        {
          word: "Educational institution",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Cơ sở giáo dục",
          example: "This educational institution is known for its excellent research facilities."
        },
        {
          word: "Curriculum",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Chương trình giảng dạy",
          example: "The curriculum includes both theoretical knowledge and practical experience."
        }
      ],
    },
    {
      name: "Learning Benefits",
      type: "positive",
      words: [
        {
          word: "Critical thinking",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Tư duy phản biện",
          example: "The course helps students develop critical thinking skills through case studies and debates."
        },
        {
          word: "Analytical abilities",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Khả năng phân tích",
          example: "Strong analytical abilities are highly valued in the research field."
        },
        {
          word: "Intellectual curiosity",
          partOfSpeech: "N",
          difficulty: "C1",
          meaning: "Tò mò về mặt trí tuệ",
          example: "Professors encourage intellectual curiosity by asking thought-provoking questions."
        }
      ],
    },
    {
      name: "Challenges",
      type: "negative",
      words: [
        {
          word: "Academic pressure",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Áp lực học tập",
          example: "Many students struggle with academic pressure during final exams."
        },
        {
          word: "Time constraints",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Hạn chế về thời gian",
          example: "Due to time constraints, we could only cover the essential topics in the lecture."
        },
        {
          word: "Testing anxiety",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Lo lắng khi làm bài kiểm tra",
          example: "Many students experience testing anxiety before important exams."
        }
      ],
    },
    {
      name: "Academic Expressions",
      type: "academic",
      words: [
        {
          word: "Thoroughly examine",
          partOfSpeech: "Phrase",
          difficulty: "C1",
          meaning: "Xem xét kỹ lưỡng",
          example: "The research team will thoroughly examine all the available evidence before drawing conclusions."
        },
        {
          word: "Comprehensively analyze",
          partOfSpeech: "Phrase",
          difficulty: "C1",
          meaning: "Phân tích toàn diện",
          example: "In your essay, you should comprehensively analyze both sides of the argument."
        },
        {
          word: "Objectively evaluate",
          partOfSpeech: "Phrase",
          difficulty: "C1",
          meaning: "Đánh giá khách quan",
          example: "A good researcher must objectively evaluate data without personal bias."
        }
      ],
    },
  ],
  "general": [
    {
      name: "Society & Culture",
      type: "neutral",
      words: [
        {
          word: "Cultural diversity",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Đa dạng văn hóa",
          example: "The city is known for its cultural diversity, with communities from all over the world."
        },
        {
          word: "Traditions",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Truyền thống",
          example: "Many families maintain their cultural traditions even after moving to a new country."
        },
        {
          word: "Globalization",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Toàn cầu hóa",
          example: "Globalization has made it easier for people to experience different cultures."
        }
      ],
    },
    {
      name: "Benefits & Progress",
      type: "positive",
      words: [
        {
          word: "Inclusive policies",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Các chính sách hòa nhập",
          example: "The company implemented inclusive policies to ensure equal opportunities for all employees."
        },
        {
          word: "Mutual understanding",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Sự hiểu biết lẫn nhau",
          example: "Cultural exchange programs promote mutual understanding between different communities."
        },
        {
          word: "Social cohesion",
          partOfSpeech: "N",
          difficulty: "C1",
          meaning: "Sự gắn kết xã hội",
          example: "Community events play an important role in building social cohesion in diverse neighborhoods."
        }
      ],
    },
    {
      name: "Challenges & Issues",
      type: "negative",
      words: [
        {
          word: "Social inequality",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Bất bình đẳng xã hội",
          example: "Addressing social inequality requires comprehensive policy reforms."
        },
        {
          word: "Prejudice",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Thành kiến",
          example: "Educational programs can help reduce prejudice against minority groups."
        },
        {
          word: "Discrimination",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Sự phân biệt đối xử",
          example: "Many countries have laws against discrimination in the workplace."
        }
      ],
    },
    {
      name: "Formal Expressions",
      type: "academic",
      words: [
        {
          word: "Widely acknowledged",
          partOfSpeech: "Phrase",
          difficulty: "C1",
          meaning: "Được công nhận rộng rãi",
          example: "It is widely acknowledged that climate change requires global cooperation."
        },
        {
          word: "Generally recognized",
          partOfSpeech: "Phrase",
          difficulty: "B2",
          meaning: "Được công nhận chung",
          example: "The benefits of regular exercise are generally recognized by health experts."
        },
        {
          word: "Broadly accepted",
          partOfSpeech: "Phrase",
          difficulty: "C1",
          meaning: "Được chấp nhận rộng rãi",
          example: "These scientific findings are broadly accepted in the academic community."
        }
      ],
    },
  ],
  "business": [
    {
      name: "Corporate Terms",
      type: "neutral",
      words: [
        {
          word: "Organizational structure",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Cơ cấu tổ chức",
          example: "A flat organizational structure allows for more direct communication between employees and management."
        },
        {
          word: "Corporate culture",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Văn hóa doanh nghiệp",
          example: "A positive corporate culture can increase employee retention and satisfaction."
        },
        {
          word: "Stakeholders",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Các bên liên quan",
          example: "The company regularly consults with its stakeholders before making major decisions."
        }
      ],
    },
    {
      name: "Business Advantages",
      type: "positive",
      words: [
        {
          word: "Competitive edge",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Lợi thế cạnh tranh",
          example: "Innovation gives the company a competitive edge in the technology sector."
        },
        {
          word: "Strategic partnerships",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Quan hệ đối tác chiến lược",
          example: "The firm formed strategic partnerships with suppliers to secure better pricing."
        },
        {
          word: "Brand recognition",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Sự nhận diện thương hiệu",
          example: "Their marketing campaign significantly improved brand recognition in new markets."
        }
      ],
    },
    {
      name: "Business Challenges",
      type: "negative",
      words: [
        {
          word: "Market volatility",
          partOfSpeech: "N",
          difficulty: "C1",
          meaning: "Sự biến động của thị trường",
          example: "Investors must be prepared for market volatility when trading stocks."
        },
        {
          word: "Economic downturn",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Suy thoái kinh tế",
          example: "Many businesses struggled to survive during the economic downturn."
        },
        {
          word: "Regulatory hurdles",
          partOfSpeech: "N",
          difficulty: "C1",
          meaning: "Rào cản quy định",
          example: "The new startup faced numerous regulatory hurdles before launching its service."
        }
      ],
    },
    {
      name: "Professional Language",
      type: "academic",
      words: [
        {
          word: "Implement strategies",
          partOfSpeech: "Phrase",
          difficulty: "B2",
          meaning: "Thực hiện chiến lược",
          example: "The management team will implement strategies to increase operational efficiency."
        },
        {
          word: "Optimize resources",
          partOfSpeech: "Phrase",
          difficulty: "B2",
          meaning: "Tối ưu hóa nguồn lực",
          example: "Companies must optimize resources to remain competitive in today's market."
        },
        {
          word: "Drive innovation",
          partOfSpeech: "Phrase",
          difficulty: "B2",
          meaning: "Thúc đẩy đổi mới",
          example: "Research and development teams drive innovation in the tech industry."
        }
      ],
    },
  ],
  "discussion": [
    {
      name: "Discussion Topics",
      type: "neutral",
      words: [
        {
          word: "Perspective",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Góc nhìn, quan điểm",
          example: "Different people have different perspectives on this issue."
        },
        {
          word: "Debate",
          partOfSpeech: "V",
          difficulty: "B1",
          meaning: "Tranh luận, thảo luận",
          example: "Experts continue to debate the best solution to this problem."
        }
      ]
    }
  ],
  "problem-solution": [
    {
      name: "Problem Solutions",
      type: "neutral",
      words: [
        {
          word: "Challenge",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Thách thức",
          example: "Climate change is one of the biggest challenges facing humanity."
        },
        {
          word: "Solution",
          partOfSpeech: "N",
          difficulty: "A2",
          meaning: "Giải pháp",
          example: "We need to find practical solutions to reduce pollution."
        }
      ]
    }
  ],
  "advantage-disadvantage": [
    {
      name: "Advantages & Disadvantages",
      type: "neutral",
      words: [
        {
          word: "Benefit",
          partOfSpeech: "N",
          difficulty: "B1",
          meaning: "Lợi ích",
          example: "The main benefit of online learning is flexibility."
        },
        {
          word: "Drawback",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Nhược điểm",
          example: "A major drawback is the lack of face-to-face interaction."
        }
      ]
    }
  ],
  "two-part-question": [
    {
      name: "Two-Part Questions",
      type: "neutral",
      words: [
        {
          word: "Factor",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Yếu tố",
          example: "Several factors contribute to this phenomenon."
        },
        {
          word: "Measure",
          partOfSpeech: "N",
          difficulty: "B2",
          meaning: "Biện pháp",
          example: "What measures can be taken to address this issue?"
        }
      ]
    }
  ]
};

// Function to get vocabulary based on test type and topic
export function getVocabulary(
  testType: WritingTestType,
  topic: string
): VocabularyCategory[] {
  // In a real implementation, we would analyze the topic and provide relevant vocabulary
  // For now, we'll just return vocabulary based on test type
  return vocabularyByTestType[testType] || [];
}

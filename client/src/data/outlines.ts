import { WritingTestType } from "@/components/writing-practice/test-setup";

export interface OutlineSection {
  title: string;
  points: string[];
}

// Generic outlines based on test type and adjusted for specific topics
const outlinesByTestType: Record<WritingTestType, OutlineSection[]> = {
  "ielts-task2": [
    {
      title: "Introduction",
      points: [
        "Present the topic and its importance",
        "State your position clearly",
      ],
    },
    {
      title: "Body Paragraph 1",
      points: [
        "Present the first viewpoint",
        "Examples and supporting evidence",
      ],
    },
    {
      title: "Body Paragraph 2",
      points: [
        "Present the second viewpoint",
        "Examples and supporting evidence",
      ],
    },
    {
      title: "Body Paragraph 3 (optional)",
      points: [
        "Present your personal viewpoint",
        "Justify your opinion with reasons",
      ],
    },
    {
      title: "Conclusion",
      points: [
        "Summarize main points",
        "Restate your opinion",
      ],
    },
  ],
  "toefl": [
    {
      title: "Introduction",
      points: [
        "Present the topic and provide background",
        "Clearly state your thesis/opinion",
      ],
    },
    {
      title: "First Supporting Paragraph",
      points: [
        "Introduce your first main point",
        "Provide specific examples and details",
      ],
    },
    {
      title: "Second Supporting Paragraph",
      points: [
        "Introduce your second main point",
        "Provide specific examples and details",
      ],
    },
    {
      title: "Third Supporting Paragraph",
      points: [
        "Introduce your third main point",
        "Provide specific examples and details",
      ],
    },
    {
      title: "Conclusion",
      points: [
        "Restate your thesis/opinion",
        "Summarize your main points",
      ],
    },
  ],
  "general": [
    {
      title: "Introduction",
      points: [
        "Introduce the topic and its relevance",
        "Provide a thesis statement that outlines your main argument",
      ],
    },
    {
      title: "Background/Context",
      points: [
        "Provide necessary background information",
        "Explain key terms or concepts",
      ],
    },
    {
      title: "Main Arguments",
      points: [
        "Develop your first major point with evidence",
        "Develop your second major point with evidence",
        "Address potential counterarguments",
      ],
    },
    {
      title: "Conclusion",
      points: [
        "Summarize your main points",
        "Restate your thesis in light of the evidence presented",
        "End with a thought-provoking statement or call to action",
      ],
    },
  ],
  "business": [
    {
      title: "Executive Summary",
      points: [
        "Briefly state the business issue or challenge",
        "Highlight key recommendations or findings",
      ],
    },
    {
      title: "Situation Analysis",
      points: [
        "Describe the current business situation",
        "Identify key stakeholders and their interests",
        "Outline relevant market or industry factors",
      ],
    },
    {
      title: "Options and Recommendations",
      points: [
        "Present possible approaches or solutions",
        "Evaluate advantages and disadvantages of each option",
        "Make clear recommendations with justification",
      ],
    },
    {
      title: "Implementation",
      points: [
        "Outline key steps for implementation",
        "Address potential challenges and mitigation strategies",
        "Suggest timeline and resource requirements",
      ],
    },
    {
      title: "Conclusion",
      points: [
        "Summarize key points and recommendations",
        "Emphasize expected benefits and outcomes",
      ],
    },
  ],
};

// Helper function to analyze a topic and customize generic outlines
function customizeOutlineForTopic(
  baseOutline: OutlineSection[],
  testType: WritingTestType,
  topic: string
): OutlineSection[] {
  // For technology-related topics
  if (topic.toLowerCase().includes("technology") || topic.toLowerCase().includes("digital")) {
    if (testType === "ielts-task2") {
      return [
        {
          title: "Introduction",
          points: [
            "Present the topic of technology's impact on society",
            "State your position on whether technology is beneficial or harmful",
          ],
        },
        {
          title: "Body Paragraph 1",
          points: [
            "Technology makes life complex (viewpoint 1)",
            "Examples and supporting evidence",
          ],
        },
        {
          title: "Body Paragraph 2",
          points: [
            "Technology improves human condition (viewpoint 2)",
            "Examples and supporting evidence",
          ],
        },
        {
          title: "Conclusion",
          points: [
            "Summarize main points",
            "Restate your opinion on technology's impact",
          ],
        },
      ];
    }
  }
  
  // For education-related topics
  if (topic.toLowerCase().includes("education") || topic.toLowerCase().includes("school") || topic.toLowerCase().includes("student")) {
    if (testType === "ielts-task2" || testType === "toefl") {
      return [
        {
          title: "Introduction",
          points: [
            "Introduce the educational topic and its significance",
            "State your position on the educational issue",
          ],
        },
        {
          title: "Body Paragraph 1",
          points: [
            "Discuss advantages of the educational approach",
            "Provide examples from educational systems or research",
          ],
        },
        {
          title: "Body Paragraph 2",
          points: [
            "Discuss disadvantages or challenges",
            "Offer counterexamples or limitations",
          ],
        },
        {
          title: "Body Paragraph 3",
          points: [
            "Present balanced analysis or your preferred approach",
            "Explain why this approach is most effective",
          ],
        },
        {
          title: "Conclusion",
          points: [
            "Summarize the key points about education",
            "Restate your position with final thoughts",
          ],
        },
      ];
    }
  }
  
  // Default to generic outline if no specific customization
  return baseOutline;
}

export function getOutline(
  testType: WritingTestType,
  topic: string
): OutlineSection[] {
  const baseOutline = outlinesByTestType[testType];
  return customizeOutlineForTopic(baseOutline, testType, topic);
}

import { WritingTestType } from "@/components/writing-practice/test-setup";

export interface OutlineSection {
  title: string;
  points: string[];
}

// Generic outlines based on test type and adjusted for specific topics
const outlinesByTestType: Record<WritingTestType, OutlineSection[]> = {
  "opinion": [
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
  "discussion": [
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
  "problem-solution": [
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
  "advantage-disadvantage": [
    {
      title: "Introduction",
      points: [
        "Present the topic and its importance",
        "State your position clearly",
      ],
    },
    {
      title: "Advantages",
      points: [
        "Present the main advantages",
        "Examples and supporting evidence",
      ],
    },
    {
      title: "Disadvantages", 
      points: [
        "Present the main disadvantages",
        "Examples and supporting evidence",
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
  "two-part-question": [
    {
      title: "Introduction",
      points: [
        "Present the topic and its importance",
        "Outline the two questions to be addressed",
      ],
    },
    {
      title: "Answer to Question 1",
      points: [
        "Address the first question directly",
        "Examples and supporting evidence",
      ],
    },
    {
      title: "Answer to Question 2",
      points: [
        "Address the second question directly", 
        "Examples and supporting evidence",
      ],
    },
    {
      title: "Conclusion",
      points: [
        "Summarize answers to both questions",
        "Provide final thoughts",
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
    if (testType === "opinion") {
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
    if (testType === "opinion" || testType === "discussion") {
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
  if (!baseOutline) {
    // Return a default outline structure if testType is not found
    return outlinesByTestType["opinion"] || [];
  }
  return customizeOutlineForTopic(baseOutline, testType, topic);
}

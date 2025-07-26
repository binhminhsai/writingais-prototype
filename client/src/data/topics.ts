import { WritingTestType, DifficultyLevel } from "@/components/writing-practice/test-setup";

// Define topic groups by complexity level
const basicTopics = [
  "Some people believe that technology has made our lives too complex, while others argue technology has improved the human condition. Discuss both views and give your opinion.",
  "Some people think children should begin their formal education at a very early age, while others believe they should start school at around 7 years old. Discuss both views and give your opinion.",
  "In many countries, traditional foods are being replaced by international fast foods. This has negative effects on families and society. To what extent do you agree or disagree?"
];

const intermediateTopics = [
  "In many countries, the gap between the rich and the poor is increasing. What problems might this cause? What solutions can you suggest?",
  "Some people think that governments should spend money on measures to save languages with few speakers from dying out completely. Others think this is a waste of financial resources. Discuss both views and give your opinion.",
  "Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime. Discuss both views and give your opinion."
];

const advancedTopics = [
  "The restoration of old buildings in major cities around the world costs enormous amounts of money. This money would be better spent on providing new housing and road development. To what extent do you agree or disagree?",
  "With an increasing global demand for energy, many countries are investing in the development of nuclear power plants. Is this a positive or negative trend?",
  "The threat posed by climate change is serious and irreversible. To what extent do you agree or disagree that immediate and drastic action needs to be taken at individual, national, and international levels?"
];

const expertTopics = [
  "Some people think governments should focus on reducing environmental pollution and housing problems to help people prevent illness and disease. Others believe that more money should be spent on healthcare. Discuss both views and give your opinion.",
  "In some countries, there has been an increase in the number of parents who educate their children themselves at home instead of sending them to school. Do you think the advantages of this outweigh the disadvantages?",
  "Some people believe that there should be fixed punishments for each type of crime. Others, however, argue that circumstances of an individual crime, and the motivation for committing it, should always be taken into account when deciding on the punishment. Discuss both these views and give your own opinion."
];

// Sample topics for each test type and band level
const topicsByTypeAndDifficulty: Record<WritingTestType, Record<DifficultyLevel, string[]>> = {
  "ielts-task2": {
    "band-5.0": basicTopics,
    "band-5.5": basicTopics,
    "band-6.0": intermediateTopics,
    "band-6.5": intermediateTopics,
    "band-7.0": advancedTopics,
    "band-7.5": advancedTopics,
    "band-8.0": expertTopics,
    "band-8.5": expertTopics
  },
  "toefl": {
    "band-5.0": [
      "Some students prefer to attend a small university. Others prefer to attend a big university. Which type of university do you prefer? Use specific reasons and examples to support your answer.",
      "Do you agree or disagree with the following statement? Parents are the best teachers. Use specific reasons and examples to support your answer.",
      "Some people think that family is the most important influence on young adults. Others believe that friends are the most important influence on young adults. Which view do you agree with?"
    ],
    "band-5.5": [
      "Some students prefer to attend a small university. Others prefer to attend a big university. Which type of university do you prefer? Use specific reasons and examples to support your answer.",
      "Do you agree or disagree with the following statement? Parents are the best teachers. Use specific reasons and examples to support your answer.",
      "Some people think that family is the most important influence on young adults. Others believe that friends are the most important influence on young adults. Which view do you agree with?"
    ],
    "band-6.0": [
      "It has been said, 'Not all learning takes place in the classroom.' Compare and contrast knowledge gained from personal experience with knowledge gained from classroom instruction. Which source is more important? Why?",
      "Do you agree or disagree with the following statement? Television has destroyed communication among friends and family. Use specific reasons and examples to support your opinion.",
      "Do you agree or disagree with the following statement? Universities should require every student to take a variety of courses outside the student's field of study. Use specific reasons and examples to support your answer."
    ],
    "band-6.5": [
      "It has been said, 'Not all learning takes place in the classroom.' Compare and contrast knowledge gained from personal experience with knowledge gained from classroom instruction. Which source is more important? Why?",
      "Do you agree or disagree with the following statement? Television has destroyed communication among friends and family. Use specific reasons and examples to support your opinion.",
      "Do you agree or disagree with the following statement? Universities should require every student to take a variety of courses outside the student's field of study. Use specific reasons and examples to support your answer."
    ],
    "band-7.0": [
      "Do you agree or disagree with the following statement? People should sometimes do things that they do not enjoy doing. Use specific reasons and examples to support your answer.",
      "Some people prefer to live in a small town. Others prefer to live in a big city. Which place would you prefer to live in? Use specific reasons and details to support your answer.",
      "Do you agree or disagree with the following statement? Modern technology is creating a single world culture. Use specific reasons and examples to support your opinion."
    ],
    "band-7.5": [
      "Do you agree or disagree with the following statement? People should sometimes do things that they do not enjoy doing. Use specific reasons and examples to support your answer.",
      "Some people prefer to live in a small town. Others prefer to live in a big city. Which place would you prefer to live in? Use specific reasons and details to support your answer.",
      "Do you agree or disagree with the following statement? Modern technology is creating a single world culture. Use specific reasons and examples to support your opinion."
    ],
    "band-8.0": [
      "If you could make one important change in a school that you attended, what change would you make? Use reasons and specific examples to support your answer.",
      "Do you agree or disagree with the following statement? Face-to-face communication is better than other types of communication, such as letters, email, or telephone calls. Use specific reasons and details to support your answer.",
      "Some people believe that the Earth is being harmed (damaged) by human activity. Others feel that human activity makes the Earth a better place to live. What is your opinion? Use specific reasons and examples to support your answer."
    ],
    "band-8.5": [
      "If you could make one important change in a school that you attended, what change would you make? Use reasons and specific examples to support your answer.",
      "Do you agree or disagree with the following statement? Face-to-face communication is better than other types of communication, such as letters, email, or telephone calls. Use specific reasons and details to support your answer.",
      "Some people believe that the Earth is being harmed (damaged) by human activity. Others feel that human activity makes the Earth a better place to live. What is your opinion? Use specific reasons and examples to support your answer."
    ]
  },
  "general": {
    "band-5.0": [
      "What are the advantages and disadvantages of living in a big city compared to living in the countryside?",
      "Some people prefer to travel alone, while others prefer to travel with a companion. Compare the advantages of both approaches.",
      "Should high school students be required to wear uniforms? Give reasons for your answer."
    ],
    "band-5.5": [
      "What are the advantages and disadvantages of living in a big city compared to living in the countryside?",
      "Some people prefer to travel alone, while others prefer to travel with a companion. Compare the advantages of both approaches.",
      "Should high school students be required to wear uniforms? Give reasons for your answer."
    ],
    "band-6.0": [
      "What role should technology play in education? Discuss with reference to specific examples.",
      "Is it better to pursue higher education or to start working immediately after high school? Give reasons for your answer.",
      "How important is it to maintain a balance between work and leisure time? Discuss."
    ],
    "band-6.5": [
      "What role should technology play in education? Discuss with reference to specific examples.",
      "Is it better to pursue higher education or to start working immediately after high school? Give reasons for your answer.",
      "How important is it to maintain a balance between work and leisure time? Discuss."
    ],
    "band-7.0": [
      "To what extent should governments be responsible for the welfare of their citizens?",
      "In your opinion, what defines success? Is it wealth, fame, happiness, or something else?",
      "Should artistic freedom be absolute or are there limits to what artists should be allowed to express?"
    ],
    "band-7.5": [
      "To what extent should governments be responsible for the welfare of their citizens?",
      "In your opinion, what defines success? Is it wealth, fame, happiness, or something else?",
      "Should artistic freedom be absolute or are there limits to what artists should be allowed to express?"
    ],
    "band-8.0": [
      "Discuss the role of civil disobedience in bringing about political or social change.",
      "In some countries, declining birth rates are a cause for concern. What policies could governments introduce to encourage people to have more children?",
      "To what extent is individual freedom limited by the responsibility we have towards society as a whole?"
    ],
    "band-8.5": [
      "Discuss the role of civil disobedience in bringing about political or social change.",
      "In some countries, declining birth rates are a cause for concern. What policies could governments introduce to encourage people to have more children?",
      "To what extent is individual freedom limited by the responsibility we have towards society as a whole?"
    ]
  },
  "business": {
    "band-5.0": [
      "What are the main qualities of a good team leader? Use examples to support your answer.",
      "Discuss the advantages and disadvantages of working from home versus working in an office.",
      "How important is customer service for a business? Give examples to support your answer."
    ],
    "band-5.5": [
      "What are the main qualities of a good team leader? Use examples to support your answer.",
      "Discuss the advantages and disadvantages of working from home versus working in an office.",
      "How important is customer service for a business? Give examples to support your answer."
    ],
    "band-6.0": [
      "Some businesses prefer to promote employees from within the organization, while others prefer to hire from outside. Discuss the advantages and disadvantages of both approaches.",
      "In what ways can businesses reduce their environmental impact? Discuss with reference to specific examples.",
      "How can businesses effectively motivate their employees? Discuss various strategies."
    ],
    "band-6.5": [
      "Some businesses prefer to promote employees from within the organization, while others prefer to hire from outside. Discuss the advantages and disadvantages of both approaches.",
      "In what ways can businesses reduce their environmental impact? Discuss with reference to specific examples.",
      "How can businesses effectively motivate their employees? Discuss various strategies."
    ],
    "band-7.0": [
      "To what extent should businesses prioritize profit over social responsibility?",
      "Analyze the impact of globalization on small local businesses.",
      "What ethical considerations should businesses make when using AI and automation technologies that may replace human workers?"
    ],
    "band-7.5": [
      "To what extent should businesses prioritize profit over social responsibility?",
      "Analyze the impact of globalization on small local businesses.",
      "What ethical considerations should businesses make when using AI and automation technologies that may replace human workers?"
    ],
    "band-8.0": [
      "Evaluate the effectiveness of different leadership styles in managing organizational change.",
      "Analyze the role of corporate governance in preventing financial scandals and corporate misconduct.",
      "In an increasingly digital world, assess the future of physical retail businesses and what strategies they might employ to remain competitive."
    ],
    "band-8.5": [
      "Evaluate the effectiveness of different leadership styles in managing organizational change.",
      "Analyze the role of corporate governance in preventing financial scandals and corporate misconduct.",
      "In an increasingly digital world, assess the future of physical retail businesses and what strategies they might employ to remain competitive."
    ]
  }
};

export function generateRandomTopic(testType: WritingTestType, difficulty: DifficultyLevel): string {
  const topics = topicsByTypeAndDifficulty[testType][difficulty];
  const randomIndex = Math.floor(Math.random() * topics.length);
  return topics[randomIndex];
}

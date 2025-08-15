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

// Create question-type specific topics
const opinionTopics = {
  "all": [] as string[], // Will be handled separately in generateRandomTopic
  "band-5.0": [
    "Some people think that technology makes life easier. Do you agree or disagree?",
    "Do you think students should wear uniforms at school? Give your opinion.",
    "Some people believe that money is the most important thing in life. Do you agree or disagree?"
  ],
  "band-5.5": [
    "Some people think that technology makes life easier. Do you agree or disagree?",
    "Do you think students should wear uniforms at school? Give your opinion.",
    "Some people believe that money is the most important thing in life. Do you agree or disagree?"
  ],
  "band-6.0": [
    "Some people think that parents should teach children how to be good members of society. Others believe that school is the place to learn this. Discuss both views and give your opinion.",
    "Do you agree or disagree with the statement that the internet has had a positive impact on education?",
    "Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?"
  ],
  "band-6.5": [
    "Some people think that parents should teach children how to be good members of society. Others believe that school is the place to learn this. Discuss both views and give your opinion.",
    "Do you agree or disagree with the statement that the internet has had a positive impact on education?",
    "Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?"
  ],
  "band-7.0": [
    "Some people believe that there should be fixed punishments for each type of crime. Others argue that the circumstances of an individual crime should always be taken into account. Discuss both these views and give your own opinion.",
    "To what extent do you agree that modern technology has made the world a better place to live?",
    "Some people think that strict punishments for driving offences are the key to reducing traffic accidents. Others believe that other measures would be more effective. Discuss both views and give your opinion."
  ],
  "band-7.5": [
    "Some people believe that there should be fixed punishments for each type of crime. Others argue that the circumstances of an individual crime should always be taken into account. Discuss both these views and give your own opinion.",
    "To what extent do you agree that modern technology has made the world a better place to live?",
    "Some people think that strict punishments for driving offences are the key to reducing traffic accidents. Others believe that other measures would be more effective. Discuss both views and give your opinion."
  ],
  "band-8.0": [
    "Some people think that governments should spend money on faster means of public transport. Others think that there are other more important priorities for public spending. Discuss both views and give your opinion.",
    "To what extent do you agree that the benefits of tourism outweigh its drawbacks?",
    "Some argue that cultural diversity strengthens society, while others believe it creates division. Discuss both views and give your opinion."
  ],
  "band-8.5": [
    "Some people think that governments should spend money on faster means of public transport. Others think that there are other more important priorities for public spending. Discuss both views and give your opinion.",
    "To what extent do you agree that the benefits of tourism outweigh its drawbacks?",
    "Some argue that cultural diversity strengthens society, while others believe it creates division. Discuss both views and give your opinion."
  ]
};

const discussionTopics = {
  "all": [] as string[], // Will be handled separately in generateRandomTopic
  "band-5.0": [
    "Some people prefer to work alone, while others like to work in teams. Discuss both views.",
    "Some students like online learning, others prefer classroom learning. Discuss both sides.",
    "Some people think cities are better places to live, others prefer the countryside. Discuss both views."
  ],
  "band-5.5": [
    "Some people prefer to work alone, while others like to work in teams. Discuss both views.",
    "Some students like online learning, others prefer classroom learning. Discuss both sides.",
    "Some people think cities are better places to live, others prefer the countryside. Discuss both views."
  ],
  "band-6.0": [
    "Some people believe that children should start learning a foreign language at primary school. Others think they should begin at secondary school. Discuss both views and give your opinion.",
    "Some people think that museums should be enjoyable places to entertain people. Others believe that museums should only serve educational purposes. Discuss both views.",
    "Some people prefer to buy food in supermarkets. Others prefer to buy in traditional markets. Discuss both views."
  ],
  "band-6.5": [
    "Some people believe that children should start learning a foreign language at primary school. Others think they should begin at secondary school. Discuss both views and give your opinion.",
    "Some people think that museums should be enjoyable places to entertain people. Others believe that museums should only serve educational purposes. Discuss both views.",
    "Some people prefer to buy food in supermarkets. Others prefer to buy in traditional markets. Discuss both views."
  ],
  "band-7.0": [
    "Some people think that the government should provide assistance to all kinds of artists including painters, musicians and poets. Others think that it is a waste of money. Discuss both views and give your opinion.",
    "Some people believe that international trade and communication with other countries is a positive trend, while others think it is harmful to nations. Discuss both views.",
    "Some people think that zoos are cruel and should be closed down. Others believe that zoos are useful for protecting rare animals. Discuss both views."
  ],
  "band-7.5": [
    "Some people think that the government should provide assistance to all kinds of artists including painters, musicians and poets. Others think that it is a waste of money. Discuss both views and give your opinion.",
    "Some people believe that international trade and communication with other countries is a positive trend, while others think it is harmful to nations. Discuss both views.",
    "Some people think that zoos are cruel and should be closed down. Others believe that zoos are useful for protecting rare animals. Discuss both views."
  ],
  "band-8.0": [
    "Some people believe that the government should take care of old people and provide free healthcare. Others think that individuals should save money for their own care. Discuss both views.",
    "Some people think that scientific research should be carried out by governments rather than private companies. Others believe that private companies can do it more efficiently. Discuss both views.",
    "Some people argue that space exploration is a waste of money and resources. Others believe it is essential for human advancement. Discuss both perspectives."
  ],
  "band-8.5": [
    "Some people believe that the government should take care of old people and provide free healthcare. Others think that individuals should save money for their own care. Discuss both views.",
    "Some people think that scientific research should be carried out by governments rather than private companies. Others believe that private companies can do it more efficiently. Discuss both views.",
    "Some people argue that space exploration is a waste of money and resources. Others believe it is essential for human advancement. Discuss both perspectives."
  ]
};

const problemSolutionTopics = {
  "all": [] as string[], // Will be handled separately in generateRandomTopic
  "band-5.0": [
    "Many people have trouble sleeping at night. What are the causes of this problem and what solutions can you suggest?",
    "Traffic jams are a common problem in big cities. What causes this problem and how can it be solved?",
    "Many students find it difficult to concentrate in class. What are the reasons for this and what can be done?"
  ],
  "band-5.5": [
    "Many people have trouble sleeping at night. What are the causes of this problem and what solutions can you suggest?",
    "Traffic jams are a common problem in big cities. What causes this problem and how can it be solved?",
    "Many students find it difficult to concentrate in class. What are the reasons for this and what can be done?"
  ],
  "band-6.0": [
    "Many cities around the world are facing serious air pollution problems. What are the main causes of this issue and what measures can be taken to solve it?",
    "Increasing numbers of people are living alone. What problems might this trend cause and what solutions can you suggest?",
    "Many young people today are not physically fit. What are the causes of this problem and what solutions can you suggest?"
  ],
  "band-6.5": [
    "Many cities around the world are facing serious air pollution problems. What are the main causes of this issue and what measures can be taken to solve it?",
    "Increasing numbers of people are living alone. What problems might this trend cause and what solutions can you suggest?",
    "Many young people today are not physically fit. What are the causes of this problem and what solutions can you suggest?"
  ],
  "band-7.0": [
    "In many countries, the gap between rich and poor is increasing. What problems might this cause and what solutions can you suggest?",
    "Many languages are disappearing due to globalization. What problems does this cause and how can this issue be addressed?",
    "Urban sprawl is becoming a serious problem in many cities. What are the causes of this trend and what solutions can be implemented?"
  ],
  "band-7.5": [
    "In many countries, the gap between rich and poor is increasing. What problems might this cause and what solutions can you suggest?",
    "Many languages are disappearing due to globalization. What problems does this cause and how can this issue be addressed?",
    "Urban sprawl is becoming a serious problem in many cities. What are the causes of this trend and what solutions can be implemented?"
  ],
  "band-8.0": [
    "Mental health issues among young people are increasing globally. What are the contributing factors to this problem and what comprehensive solutions can be implemented?",
    "Climate change is accelerating due to human activities. What are the primary causes and what urgent measures should be taken to address this crisis?",
    "The digital divide is creating inequality in education access. What factors contribute to this problem and how can it be effectively resolved?"
  ],
  "band-8.5": [
    "Mental health issues among young people are increasing globally. What are the contributing factors to this problem and what comprehensive solutions can be implemented?",
    "Climate change is accelerating due to human activities. What are the primary causes and what urgent measures should be taken to address this crisis?",
    "The digital divide is creating inequality in education access. What factors contribute to this problem and how can it be effectively resolved?"
  ]
};

const advantageDisadvantageTopics = {
  "all": [] as string[], // Will be handled separately in generateRandomTopic
  "band-5.0": [
    "What are the advantages and disadvantages of using social media?",
    "What are the advantages and disadvantages of studying abroad?",
    "What are the advantages and disadvantages of owning a car?"
  ],
  "band-5.5": [
    "What are the advantages and disadvantages of using social media?",
    "What are the advantages and disadvantages of studying abroad?",
    "What are the advantages and disadvantages of owning a car?"
  ],
  "band-6.0": [
    "What are the advantages and disadvantages of working from home?",
    "What are the advantages and disadvantages of living in a big city compared to a small town?",
    "What are the advantages and disadvantages of online shopping?"
  ],
  "band-6.5": [
    "What are the advantages and disadvantages of working from home?",
    "What are the advantages and disadvantages of living in a big city compared to a small town?",
    "What are the advantages and disadvantages of online shopping?"
  ],
  "band-7.0": [
    "What are the advantages and disadvantages of renewable energy sources?",
    "What are the advantages and disadvantages of artificial intelligence in healthcare?",
    "What are the advantages and disadvantages of globalization for developing countries?"
  ],
  "band-7.5": [
    "What are the advantages and disadvantages of renewable energy sources?",
    "What are the advantages and disadvantages of artificial intelligence in healthcare?",
    "What are the advantages and disadvantages of globalization for developing countries?"
  ],
  "band-8.0": [
    "What are the advantages and disadvantages of genetic engineering in agriculture?",
    "What are the advantages and disadvantages of space exploration for humanity?",
    "What are the advantages and disadvantages of implementing universal basic income?"
  ],
  "band-8.5": [
    "What are the advantages and disadvantages of genetic engineering in agriculture?",
    "What are the advantages and disadvantages of space exploration for humanity?",
    "What are the advantages and disadvantages of implementing universal basic income?"
  ]
};

const twoPartQuestionTopics = {
  "all": [] as string[], // Will be handled separately in generateRandomTopic
  "band-5.0": [
    "Many people prefer to watch movies at home rather than in cinemas. Why might this be? Is this a positive or negative development?",
    "More children are spending time playing video games. What are the reasons for this? Do you think this is a good thing?",
    "People are buying more things online nowadays. Why is this happening? What effects does this have on local shops?"
  ],
  "band-5.5": [
    "Many people prefer to watch movies at home rather than in cinemas. Why might this be? Is this a positive or negative development?",
    "More children are spending time playing video games. What are the reasons for this? Do you think this is a good thing?",
    "People are buying more things online nowadays. Why is this happening? What effects does this have on local shops?"
  ],
  "band-6.0": [
    "In many countries, people are moving from rural areas to cities. Why does this happen? What problems can this cause?",
    "More people are choosing to have fewer children or none at all. What might be the reasons for this? What are the effects on society?",
    "Many traditional festivals and celebrations are losing their popularity. Why is this happening? What can be done to preserve them?"
  ],
  "band-6.5": [
    "In many countries, people are moving from rural areas to cities. Why does this happen? What problems can this cause?",
    "More people are choosing to have fewer children or none at all. What might be the reasons for this? What are the effects on society?",
    "Many traditional festivals and celebrations are losing their popularity. Why is this happening? What can be done to preserve them?"
  ],
  "band-7.0": [
    "In many developed countries, birth rates are declining. What factors contribute to this trend? What are the potential long-term consequences for these societies?",
    "Traditional newspapers and magazines are becoming less popular. What factors are causing this decline? How might this affect the quality of journalism?",
    "Many young people are leaving their home countries to work abroad. What drives this migration? What impact does this have on both origin and destination countries?"
  ],
  "band-7.5": [
    "In many developed countries, birth rates are declining. What factors contribute to this trend? What are the potential long-term consequences for these societies?",
    "Traditional newspapers and magazines are becoming less popular. What factors are causing this decline? How might this affect the quality of journalism?",
    "Many young people are leaving their home countries to work abroad. What drives this migration? What impact does this have on both origin and destination countries?"
  ],
  "band-8.0": [
    "The phenomenon of 'brain drain' is affecting many developing countries. What complex factors contribute to this trend? How might this impact global economic and social development?",
    "Artificial intelligence is increasingly being used in decision-making processes. What drives this technological adoption? What are the potential implications for human autonomy and employment?",
    "Traditional cultural practices are disappearing in many societies. What underlying forces are causing this cultural erosion? How might this transformation affect future generations?"
  ],
  "band-8.5": [
    "The phenomenon of 'brain drain' is affecting many developing countries. What complex factors contribute to this trend? How might this impact global economic and social development?",
    "Artificial intelligence is increasingly being used in decision-making processes. What drives this technological adoption? What are the potential implications for human autonomy and employment?",
    "Traditional cultural practices are disappearing in many societies. What underlying forces are causing this cultural erosion? How might this transformation affect future generations?"
  ]
};

// Sample topics for each test type and band level
const topicsByTypeAndDifficulty: Record<WritingTestType, Record<DifficultyLevel, string[]>> = {
  "all": {} as Record<DifficultyLevel, string[]>, // Will be handled separately in generateRandomTopic
  "opinion": opinionTopics,
  "discussion": discussionTopics,
  "problem-solution": problemSolutionTopics,
  "advantage-disadvantage": advantageDisadvantageTopics,
  "two-part-question": twoPartQuestionTopics
};

export function generateRandomTopic(testType: WritingTestType, difficulty: DifficultyLevel): string {
  // Handle random selection for test type and/or difficulty
  const availableTypes: Array<Exclude<WritingTestType, "all">> = ["opinion", "discussion", "problem-solution", "advantage-disadvantage", "two-part-question"];
  const availableDifficulties: Array<Exclude<DifficultyLevel, "all">> = ["band-5.0", "band-5.5", "band-6.0", "band-6.5", "band-7.0", "band-7.5", "band-8.0", "band-8.5"];
  
  const actualTestType = testType === "all" 
    ? availableTypes[Math.floor(Math.random() * availableTypes.length)]
    : testType;
    
  const actualDifficulty = difficulty === "all"
    ? availableDifficulties[Math.floor(Math.random() * availableDifficulties.length)]
    : difficulty;
  
  const topics = topicsByTypeAndDifficulty[actualTestType][actualDifficulty];
  const randomIndex = Math.floor(Math.random() * topics.length);
  return topics[randomIndex];
}

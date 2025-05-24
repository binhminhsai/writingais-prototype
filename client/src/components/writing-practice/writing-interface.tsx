import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import { Timer } from "@/components/ui/timer";
import { WordCounter } from "@/components/ui/word-counter";
import { useTimer } from "@/hooks/use-timer";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Save, Layers, ArrowLeft, Eye, EyeOff, Smile } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getOutline } from "@/data/outlines";
import { getVocabulary } from "@/data/vocabulary";
import { getPhrases, getStructuredPhrases, phraseCategories } from "@/data/phrases";
import { WritingTestType, DifficultyLevel } from "./test-setup";
import { Link } from "wouter";

// Outline component with tabs for outline and useful expressions
function OutlineSection({ testType, topic }: { testType: WritingTestType, topic: string }) {
  const [showOutline, setShowOutline] = useState(true);
  const outline = getOutline(testType, topic);

  return (
    <div className="h-full flex flex-col">
      {showOutline ? (
        <Tabs defaultValue="outline" className="w-full h-full flex flex-col">
          <div className="flex items-end justify-between border-b-0 relative">
            <TabsList className="flex w-full bg-transparent border-0 p-0 gap-1">
              <TabsTrigger 
                value="outline" 
                className="text-base md:text-lg lg:text-xl py-4 md:py-6 px-6 md:px-12 lg:px-16 font-medium rounded-t-lg transition-all relative overflow-hidden
                        bg-gradient-to-b from-white to-gray-50 
                        data-[state=active]:from-primary/10 data-[state=active]:to-primary/5 
                        data-[state=active]:text-primary data-[state=active]:border-t-2 data-[state=active]:border-t-primary
                        data-[state=active]:shadow-[0_4px_10px_-8px_rgba(0,0,0,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span>Suggested Outline</span>
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="expressions" 
                className="text-base md:text-lg lg:text-xl py-4 md:py-6 px-6 md:px-12 lg:px-16 font-medium rounded-t-lg transition-all relative overflow-hidden
                        bg-gradient-to-b from-white to-gray-50
                        data-[state=active]:from-primary/10 data-[state=active]:to-primary/5
                        data-[state=active]:text-primary data-[state=active]:border-t-2 data-[state=active]:border-t-primary
                        data-[state=active]:shadow-[0_4px_10px_-8px_rgba(0,0,0,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Smile className="h-4 w-4" />
                  <span>Useful Expressions</span>
                </span>
              </TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 flex-shrink-0 absolute right-2 top-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 shadow-sm z-20"
              title="Hide Support"
              onClick={() => setShowOutline(false)}
            >
              <EyeOff className="h-3.5 w-3.5" />
            </Button>
          </div>

          <TabsContent 
            value="outline" 
            className="flex-1 overflow-y-auto mt-0 rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-4 shadow-md"
          >
            <ul className="space-y-4 text-xs">
              {outline.map((section, index) => (
                <li key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <span className="font-medium text-sm text-primary block mb-2">{section.title}:</span>
                  <ul className="pl-4 space-y-2 list-disc">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="leading-relaxed text-gray-700">{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent 
            value="expressions" 
            className="flex-1 overflow-y-auto mt-0 rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-4 shadow-md"
          >
            <div>
              <h4 className="font-semibold text-primary mb-3 text-sm flex items-center gap-1.5">
                <Smile className="h-4 w-4" />
                Useful Expressions - Các cách diễn đạt hữu ích
              </h4>
              <p className="text-xs mb-4 text-gray-600 italic bg-gray-50 p-2 rounded-md border border-gray-100">
                Các cách diễn đạt hữu ích có thể dùng trong bài viết
              </p>

              <Accordion type="single" collapsible className="w-full space-y-2">
                {phraseCategories.map((category, index) => {
                  const structuredPhrases = getStructuredPhrases();
                  const phrases = structuredPhrases[category.id as keyof typeof structuredPhrases] || [];
                  return (
                    <AccordionItem 
                      key={category.id} 
                      value={category.id}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    >
                      <AccordionTrigger 
                        className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                      >
                        <span className="flex items-center gap-2">
                          <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                            {index + 1}
                          </span>
                          {category.name}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="p-3 bg-white">
                        <p className="text-xs text-gray-600 mb-3 italic bg-gray-50 p-2 rounded-md">{category.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {Array.isArray(phrases) && phrases.map((phrase: string, phraseIndex: number) => (
                            <TooltipProvider key={`${category.id}-${phraseIndex}`}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge 
                                    variant="outline"
                                    className="bg-blue-50 whitespace-normal text-wrap my-0.5 p-2 text-xs border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
                                  >
                                    {phrase}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent className="p-2 bg-blue-50 border-blue-200">
                                  <div className="text-sm">
                                    <p><span className="font-medium">Nghĩa:</span> Cụm từ: {phrase}</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <Button
            variant="outline"
            size="sm"
            className="mb-4 bg-white hover:bg-gray-50 shadow-sm border-gray-200 px-4"
            onClick={() => setShowOutline(true)}
          >
            <Eye className="h-3.5 w-3.5 mr-2 text-primary" /> Show Support
          </Button>
          <p className="text-gray-700 font-medium text-base mb-2 text-center">Hãy cố gắng hết mình nhé!</p>
          <p className="text-primary font-medium text-sm text-center">Good things take time. 😉</p>
        </div>
      )}
    </div>
  );
}

// Vocabulary and Phrases component
function ResourcesSection({ testType, topic }: { testType: WritingTestType, topic: string }) {
  const [activeTab, setActiveTab] = useState("vocabulary");
  const allVocabulary = getVocabulary(testType, topic);
  const phrases = getPhrases(testType);

  // Filter vocabulary for each tab
  const vocabularyWords = allVocabulary.flatMap(category => 
    category.words
      .filter(word => ["N", "V", "Adj", "Adv"].includes(word.partOfSpeech))
      .map(word => ({ ...word, type: category.type }))
  );

  // Additional vocabulary data
  const additionalVocabulary = [
    {
      word: "Sustainable",
      partOfSpeech: "Adj",
      difficulty: "B2",
      meaning: "Có thể duy trì được lâu dài, bền vững",
      example: "Companies are trying to develop more sustainable business practices.",
      type: "positive"
    },
    {
      word: "Resilience",
      partOfSpeech: "N",
      difficulty: "C1",
      meaning: "Khả năng phục hồi, sức bền",
      example: "The community showed remarkable resilience in the face of economic hardship.",
      type: "positive"
    },
    {
      word: "Implement",
      partOfSpeech: "V",
      difficulty: "B2",
      meaning: "Thực hiện, triển khai",
      example: "The government plans to implement new environmental regulations next year.",
      type: "neutral"
    },
    {
      word: "Unprecedented",
      partOfSpeech: "Adj",
      difficulty: "C1",
      meaning: "Chưa từng có trước đây, chưa từng thấy",
      example: "The pandemic caused unprecedented disruption to global supply chains.",
      type: "neutral"
    },
    {
      word: "Detrimental",
      partOfSpeech: "Adj",
      difficulty: "C1",
      meaning: "Có hại, gây tổn hại",
      example: "Excessive screen time can be detrimental to children's development.",
      type: "negative"
    },
    {
      word: "Mitigate",
      partOfSpeech: "V",
      difficulty: "C1",
      meaning: "Làm giảm, làm dịu bớt",
      example: "Companies are taking steps to mitigate their environmental impact.",
      type: "positive"
    },
    {
      word: "Profound",
      partOfSpeech: "Adj",
      difficulty: "C1",
      meaning: "Sâu sắc, to lớn",
      example: "Technology has had a profound effect on how we communicate with each other.",
      type: "neutral"
    },
    {
      word: "Advocate",
      partOfSpeech: "V",
      difficulty: "C1",
      meaning: "Ủng hộ, biện hộ",
      example: "Many scientists advocate for stronger climate change policies.",
      type: "neutral"
    }
  ];

  // Combine vocabulary words
  const allVocabularyWords = [...vocabularyWords, ...additionalVocabulary];

  // Get phrase words from vocabulary data
  const phraseWords = allVocabulary.flatMap(category => 
    category.words
      .filter(word => word.partOfSpeech === "Phrase")
      .map(word => ({ ...word, type: category.type }))
  );

  // Additional collocations data
  const additionalCollocations = [
    {
      word: "Public health crisis",
      partOfSpeech: "Collocations",
      difficulty: "B2",
      meaning: "Khủng hoảng sức khỏe cộng đồng",
      example: "The rise in heroin use has led to a public health crisis in many regions.",
      type: "neutral"
    },
    {
      word: "Climate change impact",
      partOfSpeech: "Collocations",
      difficulty: "B2",
      meaning: "Tác động của biến đổi khí hậu",
      example: "Researchers are studying the climate change impact on coastal communities.",
      type: "neutral"
    },
    {
      word: "Sustainable development goals",
      partOfSpeech: "Collocations",
      difficulty: "C1",
      meaning: "Mục tiêu phát triển bền vững",
      example: "Many countries are working to meet the sustainable development goals set by the United Nations.",
      type: "positive"
    },
    {
      word: "Digital literacy skills",
      partOfSpeech: "Collocations",
      difficulty: "B2",
      meaning: "Kỹ năng sử dụng công nghệ số",
      example: "Schools are focusing more on teaching digital literacy skills to prepare students for modern workplaces.",
      type: "positive"
    },
    {
      word: "Economic inequality gap",
      partOfSpeech: "Collocations",
      difficulty: "C1",
      meaning: "Khoảng cách bất bình đẳng kinh tế",
      example: "The economic inequality gap has widened in many developed countries over the past decade.",
      type: "negative"
    },
    {
      word: "Demographic shift",
      partOfSpeech: "Collocations",
      difficulty: "B2",
      meaning: "Sự thay đổi nhân khẩu học",
      example: "The demographic shift toward an aging population has implications for healthcare systems worldwide.",
      type: "neutral"
    },
    {
      word: "Renewable energy sources",
      partOfSpeech: "Collocations",
      difficulty: "B1",
      meaning: "Các nguồn năng lượng tái tạo",
      example: "Investing in renewable energy sources is essential for reducing carbon emissions.",
      type: "positive"
    },
    {
      word: "Global supply chain",
      partOfSpeech: "Collocations",
      difficulty: "B2",
      meaning: "Chuỗi cung ứng toàn cầu",
      example: "The pandemic has revealed vulnerabilities in global supply chains across many industries.",
      type: "neutral"
    }
  ];

  // Combine phrase words with additional collocations
  const allPhraseWords = [...phraseWords, ...additionalCollocations];

  // State for displayed word counts
  const [vocabDisplayCount, setVocabDisplayCount] = useState(10);
  const [phraseDisplayCount, setPhraseDisplayCount] = useState(8);

  // Handle loading more words
  const handleLoadMoreVocab = () => {
    setVocabDisplayCount(prevCount => prevCount + 10);
  };

  const handleLoadMorePhrases = () => {
    setPhraseDisplayCount(prevCount => prevCount + 10);
  };

  // Words to display based on current count limits
  const displayedVocabWords = allVocabularyWords.slice(0, vocabDisplayCount);
  const displayedPhraseWords = allPhraseWords.slice(0, phraseDisplayCount);

  // Check if there are more words to load
  const hasMoreVocab = vocabDisplayCount < allVocabularyWords.length;
  const hasMorePhrases = phraseDisplayCount < allPhraseWords.length;

  return (
    <Card className="mt-6 p-0 border-0 bg-transparent shadow-none">
      <Tabs 
        defaultValue="vocabulary" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative"
      >
        <div className="mb-4 relative">
          <TabsList className="w-full flex gap-1 bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
            <TabsTrigger 
              value="vocabulary" 
              className="flex-1 text-sm py-2.5 px-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-primary 
                      data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M12 20V4"></path><path d="M20 8h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2"></path><path d="M4 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4"></path>
              </svg>
              Vocabulary
            </TabsTrigger>
            <TabsTrigger 
              value="phrases" 
              className="flex-1 text-sm py-2.5 px-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-primary 
                      data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Useful collocations
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="vocabulary" className="p-0 min-h-[200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {displayedVocabWords.map((word, index) => {
              const colorClasses = word.type === "positive" 
                ? "bg-green-50 border-green-200 text-green-700" 
                : word.type === "negative" 
                  ? "bg-rose-50 border-rose-200 text-rose-700"
                  : "bg-blue-50 border-blue-200 text-blue-700";
              
              return (
                <div 
                  key={`word-${index}`}
                  className={`p-3 rounded-lg border ${colorClasses} h-full shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="font-semibold text-base">{word.word}</span>
                    <Badge className={`text-xs font-medium px-2 py-0.5 ${
                      word.type === "positive" 
                        ? "bg-green-100 text-green-800 hover:bg-green-200" 
                        : word.type === "negative" 
                          ? "bg-rose-100 text-rose-800 hover:bg-rose-200"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }`}>
                      {word.partOfSpeech}
                    </Badge>
                    <Badge variant="outline" className={`text-xs px-2 py-0.5 border-current opacity-80`}>
                      {word.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-700 mb-1.5">
                    <span className="font-medium">Meaning:</span> {word.meaning}
                  </p>
                  <p className="text-xs text-gray-600 italic border-t border-gray-200 pt-1.5 mt-1.5">
                    <span className="font-medium not-italic">Example:</span> {word.example}
                  </p>
                </div>
              );
            })}

            {/* Fill in empty cell if odd number of words */}
            {displayedVocabWords.length % 2 !== 0 && (
              <div className="hidden md:block" />
            )}
          </div>

          {/* Load more button for vocabulary */}
          {hasMoreVocab && (
            <div className="flex justify-center mt-4 mb-2">
              <Button 
                variant="outline" 
                onClick={handleLoadMoreVocab}
                className="text-primary border-primary/30 hover:border-primary text-xs px-6 py-1.5 h-auto shadow-sm"
                size="sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-2">
                  <path d="M12 8v8"></path><path d="M8 12h8"></path>
                </svg>
                Load More Words
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="phrases" className="p-0 min-h-[200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {displayedPhraseWords.map((phrase, index) => {
              const colorClasses = phrase.type === "positive" 
                ? "bg-green-50 border-green-200 text-green-700" 
                : phrase.type === "negative" 
                  ? "bg-rose-50 border-rose-200 text-rose-700"
                  : "bg-blue-50 border-blue-200 text-blue-700";
              
              return (
                <div 
                  key={`phrase-${index}`}
                  className={`p-3 rounded-lg border ${colorClasses} h-full shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="font-semibold text-base">{phrase.word}</span>
                    <Badge className={`text-xs font-medium px-2 py-0.5 ${
                      phrase.type === "positive" 
                        ? "bg-green-100 text-green-800 hover:bg-green-200" 
                        : phrase.type === "negative" 
                          ? "bg-rose-100 text-rose-800 hover:bg-rose-200"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }`}>
                      Collocation
                    </Badge>
                    <Badge variant="outline" className={`text-xs px-2 py-0.5 border-current opacity-80`}>
                      {phrase.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-700 mb-1.5">
                    <span className="font-medium">Meaning:</span> {phrase.meaning}
                  </p>
                  <p className="text-xs text-gray-600 italic border-t border-gray-200 pt-1.5 mt-1.5">
                    <span className="font-medium not-italic">Example:</span> {phrase.example}
                  </p>
                </div>
              );
            })}

            {/* Fill in empty cell if odd number of phrases */}
            {displayedPhraseWords.length % 2 !== 0 && (
              <div className="hidden md:block" />
            )}
          </div>

          {/* Load more button for phrases */}
          {hasMorePhrases && (
            <div className="flex justify-center mt-4 mb-2">
              <Button 
                variant="outline" 
                onClick={handleLoadMorePhrases}
                className="text-primary border-primary/30 hover:border-primary text-xs px-6 py-1.5 h-auto shadow-sm"
                size="sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-2">
                  <path d="M12 8v8"></path><path d="M8 12h8"></path>
                </svg>
                Load More Phrases
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}

interface WritingInterfaceProps {
  testType: WritingTestType;
  difficulty: DifficultyLevel;
  topic: string;
  timeLimit: number;
  onSubmit: (essayContent: string) => void;
}

export function WritingInterface({
  testType,
  difficulty,
  topic,
  timeLimit,
  onSubmit,
}: WritingInterfaceProps) {
  const [essayContent, setEssayContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isWordCountValid, setIsWordCountValid] = useState(true);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const { formattedTime, isRunning, startTimer, updateTimer } = useTimer({
    initialMinutes: timeLimit,
    onTimeUp: () => setShowTimeUpDialog(true),
    autoStart: timeLimit > 0,
  });

  // Start timer when component mounts if time limit is set
  useEffect(() => {
    if (timeLimit > 0) {
      startTimer();
    }
  }, [timeLimit, startTimer]);

  const handleTimeSelect = (minutes: number) => {
    updateTimer(minutes);
    if (minutes > 0) {
      startTimer();
    }
  };

  const handleWordCountChange = (count: number, isValid: boolean) => {
    setWordCount(count);
    setIsWordCountValid(isValid);
  };

  const handleSubmit = () => {
    if (!isWordCountValid) {
      setShowErrorDialog(true);
      return;
    }
    onSubmit(essayContent);
  };

  const handleSaveDraft = () => {
    // Save to localStorage
    localStorage.setItem('essayDraft', essayContent);
    localStorage.setItem('essayTopic', topic);
    alert('Draft saved successfully');
  };

  const [showExitDialog, setShowExitDialog] = useState(false);

  return (
    <div className="p-4">
      <div className="flex mb-2">
        <Button 
          variant="outline" 
          size="sm"
          className="h-7 text-xs"
          onClick={() => setShowExitDialog(true)}
        >
          <ArrowLeft className="h-3 w-3 mr-1" /> Back
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="lg:w-3/5">
          <div className="bg-cyan-50 rounded-md p-4 mb-3 border-2 border-cyan-200 shadow-sm">
            <div className="text-cyan-700 font-medium mb-1">Question:</div>
            <div className="text-gray-700 text-sm">{topic}</div>
          </div>

          <div className="flex items-center justify-between mb-2 h-8">
            <Timer 
              time={formattedTime()} 
              onTimeSelect={handleTimeSelect}
              isRunning={isRunning}
            />
            <WordCounter
              count={wordCount}
              maxWords={500}
              isValid={isWordCountValid}
            />
          </div>

          <Editor
            value={essayContent}
            onChange={setEssayContent}
            onWordCountChange={handleWordCountChange}
          />

          <div className="flex justify-end mt-3">
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:opacity-90 h-8 text-xs"
            >
              Submit Essay <Layers className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="hidden lg:block lg:w-2/5 lg:pl-3 lg:flex lg:flex-col" style={{ minHeight: '500px' }}>
          <OutlineSection 
            testType={testType} 
            topic={topic} 
          />
        </div>
      </div>

      <div className="mt-4 lg:hidden">
        <OutlineSection 
          testType={testType} 
          topic={topic} 
        />
      </div>

      {/* Resources Section Below */}
      <ResourcesSection 
        testType={testType} 
        topic={topic} 
      />

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thoát khỏi bài tập?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn thoát khỏi quá trình làm bài? Tiến trình làm bài của bạn sẽ không được lưu lại.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tiếp tục làm bài</AlertDialogCancel>
            <Link href="/writing-practice">
              <AlertDialogAction>
                Thoát
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time's Up Dialog */}
      <AlertDialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your allocated time for this essay has ended. Would you like to submit your work now or continue writing?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Writing</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowTimeUpDialog(false);
              handleSubmit();
            }}>
              Submit Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Word Count Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Word Count Error</AlertDialogTitle>
            <AlertDialogDescription>
              Word limit requirement not met. Your essay should be between 50 and 500 words.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
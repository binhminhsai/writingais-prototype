import React, { useState, useEffect } from "react";
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
import { getOutline } from "@/data/outlines";
import { getVocabulary } from "@/data/vocabulary";
import { getPhrases } from "@/data/phrases";
import { WritingTestType, DifficultyLevel } from "./test-setup";
import { Link } from "wouter";

// Outline component with toggle visibility
function OutlineSection({ testType, topic }: { testType: WritingTestType, topic: string }) {
  const [showOutline, setShowOutline] = useState(true);
  const outline = getOutline(testType, topic);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between py-2 px-3 bg-gray-50">
        <h3 className="font-medium text-xs">Suggested Outline</h3>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            title={showOutline ? "Hide Outline" : "Show Outline"}
            onClick={() => setShowOutline(!showOutline)}
          >
            {showOutline ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-3">
        {showOutline ? (
          <ul className="space-y-3 text-xs">
            {outline.map((section, index) => (
              <li key={index}>
                <span className="font-medium text-sm text-gray-700">{section.title}:</span>
                <ul className="pl-3 mt-1.5 space-y-2 list-disc">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-[150px]">
            <p className="text-gray-700 font-medium text-base mb-2 text-center">Hãy cố gắng hết mình nhé!</p>
            <p className="text-primary font-medium text-sm text-center">Good things take time. 😉</p>
          </div>
        )}
      </CardContent>
    </Card>
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
    <Card className="mt-4">
      <Tabs 
        defaultValue="vocabulary" 
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="w-full flex mb-3 gap-3 bg-transparent p-2 border border-gray-200 rounded-lg">
          <TabsTrigger 
            value="vocabulary" 
            className="flex-1 text-sm py-2 px-4 font-medium rounded-md border border-gray-200 transition-all
                    bg-gray-50 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary"
          >
            Vocabulary
          </TabsTrigger>
          <TabsTrigger 
            value="phrases" 
            className="flex-1 text-sm py-2 px-4 font-medium rounded-md border border-gray-200 transition-all
                    bg-gray-50 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary"
          >
            Useful phrases & collocations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vocabulary" className="p-2">
          {/* Grid layout with 1 column on small screens, 2 columns on medium screens and above */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {displayedVocabWords.map((word, index) => (
              <div 
                key={`word-${index}`}
                className="p-2 rounded-md border bg-blue-50 border-blue-200 h-full shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-1 mb-1">
                  <span className="font-semibold text-base text-blue-700">{word.word}</span>
                  <Badge className="text-xs font-medium px-1.5 py-0.5">
                    {word.partOfSpeech}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    {word.difficulty}
                  </Badge>
                </div>
                <p className="text-xs text-gray-700 mb-1">
                  <span className="font-medium">Meaning:</span> {word.meaning}
                </p>
                <p className="text-xs text-gray-600 italic">
                  <span className="font-medium not-italic">Example:</span> {word.example}
                </p>
              </div>
            ))}
            
            {/* Fill in empty cell if odd number of words */}
            {displayedVocabWords.length % 2 !== 0 && (
              <div className="hidden md:block" />
            )}
          </div>
          
          {/* Load more button for vocabulary */}
          {hasMoreVocab && (
            <div className="flex justify-center mt-2">
              <Button 
                variant="outline" 
                onClick={handleLoadMoreVocab}
                className="text-primary text-xs px-2 py-1 h-auto"
                size="sm"
              >
                Load More Words
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="phrases" className="p-2">
          {/* Grid layout with 1 column on small screens, 2 columns on medium screens and above */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {displayedPhraseWords.map((phrase, index) => (
              <div 
                key={`phrase-${index}`}
                className="p-2 rounded-md border bg-blue-50 border-blue-200 h-full shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-1 mb-1">
                  <span className="font-semibold text-base text-blue-700">{phrase.word}</span>
                  <Badge className="text-xs font-medium px-1.5 py-0.5">
                    {phrase.partOfSpeech}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    {phrase.difficulty}
                  </Badge>
                </div>
                <p className="text-xs text-gray-700 mb-1">
                  <span className="font-medium">Meaning:</span> {phrase.meaning}
                </p>
                <p className="text-xs text-gray-600 italic">
                  <span className="font-medium not-italic">Example:</span> {phrase.example}
                </p>
              </div>
            ))}
            
            {/* Fill in empty cell if odd number of phrases */}
            {displayedPhraseWords.length % 2 !== 0 && (
              <div className="hidden md:block" />
            )}
          </div>
          
          {/* Load more button for phrases */}
          {hasMorePhrases && (
            <div className="flex justify-center mt-2">
              <Button 
                variant="outline" 
                onClick={handleLoadMorePhrases}
                className="text-primary text-xs px-2 py-1 h-auto"
                size="sm"
              >
                Load More Phrases
              </Button>
            </div>
          )}
          
          {/* Display additional useful phrases from phrases data */}
          {phrases.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Additional Useful Expressions</h4>
              <div className="flex flex-wrap gap-2">
                {phrases.flatMap(category => 
                  category.phrases.map((phrase, phraseIndex) => (
                    <Badge 
                      key={`${category.name}-${phraseIndex}`} 
                      variant="outline"
                      className="bg-gray-50 whitespace-normal text-wrap my-0.5 p-1.5 text-xs border-blue-100"
                    >
                      {phrase}
                    </Badge>
                  ))
                )}
              </div>
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
          <div className="bg-green-50 rounded-md p-4 mb-3 border border-green-100">
            <div className="text-green-800 font-medium mb-1">Question:</div>
            <div className="text-gray-700 text-sm">{topic}</div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
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
        
        <div className="hidden lg:block lg:w-2/5 lg:pl-3">
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

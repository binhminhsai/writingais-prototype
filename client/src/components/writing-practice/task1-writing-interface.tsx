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
import { getTask1Outline } from "@/data/task1-outlines";
import { getTask1Vocabulary } from "@/data/task1-vocabulary";
import { getTask1Phrases, task1PhraseCategories } from "@/data/task1-phrases";
import { Link } from "wouter";

interface Task1WritingInterfaceProps {
  question: string;
  questionType: string;
  bandLevel: string;
  timeLimit: string;
}

// Task 1 Outline component with tabs for outline and useful expressions
function Task1OutlineSection({ questionType, question }: { questionType: string, question: string }) {
  const [showOutline, setShowOutline] = useState(true);
  const outline = getTask1Outline(questionType);

  return (
    <div className="h-full flex flex-col">
      {showOutline ? (
        <Tabs defaultValue="expressions" className="w-full h-full flex flex-col">
          <div className="mb-4 relative">
            <TabsList className="w-full flex gap-1 bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
              <TabsTrigger 
                value="expressions" 
                className="flex-1 text-sm py-2.5 px-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2
                        hover:bg-gray-50
                        data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-bold"
              >
                <Smile className="h-4 w-4" />
                Analyze Topic
              </TabsTrigger>
              <TabsTrigger 
                value="outline" 
                className="flex-1 text-sm py-2.5 px-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2
                        hover:bg-gray-50
                        data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-bold"
              >
                <Layers className="h-4 w-4" />
                Suggested Outline
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent 
            value="outline" 
            className="flex-1 overflow-y-auto custom-scrollbar mt-0 rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-4 shadow-md"
            style={{ height: '500px' }}
          >
            <div>
              <h4 className="font-semibold text-primary mb-3 text-sm flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                Suggested Outline - Đề xuất cấu trúc bài viết Task 1
              </h4>
              <p className="text-xs mb-4 text-gray-600 italic bg-gray-50 p-2 rounded-md border border-gray-100">
                Cấu trúc đề xuất giúp bạn tổ chức ý tưởng và viết bài Task 1 tốt hơn
              </p>

              <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: '430px' }}>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {/* Overall Outline as the first item */}
                  <AccordionItem 
                    value="overall-outline"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          1
                        </span>
                        Overall Outline
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="space-y-3">
                        {outline.map((section, index) => (
                          <div key={index} className="p-3 rounded-md border border-blue-100 bg-[#f9fafb] text-[#374151]">
                            <p className="mb-2 text-[#1fb2aa] font-bold text-[12px]">{section.title}</p>
                            <ul className="text-xs space-y-1 list-disc pl-4 text-[#374151]">
                              {section.points.map((point, pointIndex) => (
                                <li key={pointIndex}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>

          <TabsContent 
            value="expressions" 
            className="flex-1 overflow-y-auto custom-scrollbar mt-0 rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-4 shadow-md"
            style={{ height: '500px' }}
          >
            <div>
              <h4 className="font-semibold text-primary mb-3 text-sm flex items-center gap-1.5">
                <Smile className="h-4 w-4" />
                Topic Analysis - Phân tích đề bài
              </h4>
              <div className="p-3 rounded-md border border-gray-200 bg-gray-50 mb-4">
                <h5 className="font-medium text-sm mb-2">Question Analysis:</h5>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {question}
                </p>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-md border border-blue-100 bg-[#f9fafb]">
                  <p className="text-xs font-medium text-[#1fb2aa] mb-2">Key Task Requirements:</p>
                  <ul className="text-xs space-y-1 list-disc pl-4 text-[#374151]">
                    <li>Summarise the information by selecting and reporting the main features</li>
                    <li>Make comparisons where relevant</li>
                    <li>Write at least 150 words</li>
                    <li>Use your own words (paraphrase the question)</li>
                  </ul>
                </div>
                <div className="p-3 rounded-md border border-green-100 bg-[#f9fafb]">
                  <p className="text-xs font-medium text-[#1fb2aa] mb-2">Writing Strategy:</p>
                  <ul className="text-xs space-y-1 list-disc pl-4 text-[#374151]">
                    <li>Start with a clear introduction that paraphrases the question</li>
                    <li>Include an overview paragraph highlighting main trends</li>
                    <li>Use specific data and figures to support your descriptions</li>
                    <li>Focus on the most significant features and comparisons</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-8 shadow-sm">
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

// Task 1 Vocabulary and Phrases component
function Task1ResourcesSection({ questionType }: { questionType: string }) {
  const [activeTab, setActiveTab] = useState("vocabulary");
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);
  const [showWordBank, setShowWordBank] = useState(false);
  const [loadedPhrases, setLoadedPhrases] = useState<{[key: string]: string[]}>({});
  const [isLoadingPhrases, setIsLoadingPhrases] = useState(false);
  
  const allVocabulary = getTask1Vocabulary(questionType);
  const phrases = getTask1Phrases();

  // Filter vocabulary for each tab
  const vocabularyWords = allVocabulary.flatMap(category => 
    category.words
      .filter(word => ["N", "V", "Adj", "Adv"].includes(word.partOfSpeech))
      .map(word => ({ ...word, type: category.type }))
  );

  const topicSpecificWords = allVocabulary.flatMap(category => 
    category.words
      .filter(word => category.name.toLowerCase().includes(questionType) || 
                     category.name.toLowerCase().includes("specific"))
      .map(word => ({ ...word, type: category.type }))
  );

  const handleLoadMorePhrases = async (categoryId: string) => {
    if (loadedPhrases[categoryId]) return;
    
    setIsLoadingPhrases(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const category = phrases.find(cat => 
      cat.name.toLowerCase().replace(' ', '') === categoryId.toLowerCase()
    );
    
    if (category) {
      setLoadedPhrases(prev => ({
        ...prev,
        [categoryId]: category.phrases
      }));
    }
    
    setIsLoadingPhrases(false);
  };

  return (
    <div className="h-full">
      <Accordion type="single" collapsible className="w-full space-y-1">
        {/* Vocabulary Section */}
        <AccordionItem value="vocabulary" className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger 
            className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
            onClick={() => setShowVocabulary(!showVocabulary)}
          >
            <span className="flex items-center gap-2">
              <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                V
              </span>
              Vocabulary
            </span>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex gap-0 bg-gray-50 rounded-none p-0 border-b border-gray-200">
                <TabsTrigger 
                  value="vocabulary" 
                  className="flex-1 text-xs py-2 px-3 font-medium transition-all
                          hover:bg-gray-100
                          data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  General Vocabulary
                </TabsTrigger>
                <TabsTrigger 
                  value="topic" 
                  className="flex-1 text-xs py-2 px-3 font-medium transition-all
                          hover:bg-gray-100
                          data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  Topic-specific Vocabulary
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="vocabulary" className="p-3 space-y-2 max-h-64 overflow-y-auto">
                {vocabularyWords.map((word, index) => (
                  <div key={index} className="flex flex-wrap items-center gap-2 p-2 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-2 py-0.5 ${
                          word.type === 'positive' ? 'border-green-300 text-green-700' :
                          word.type === 'negative' ? 'border-red-300 text-red-700' :
                          word.type === 'academic' ? 'border-blue-300 text-blue-700' :
                          'border-gray-300 text-gray-700'
                        }`}
                      >
                        {word.partOfSpeech}
                      </Badge>
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        {word.difficulty}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{word.word}</div>
                      <div className="text-xs text-gray-600">{word.meaning}</div>
                      <div className="text-xs text-gray-500 italic mt-1">{word.example}</div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="topic" className="p-3 space-y-2 max-h-64 overflow-y-auto">
                {topicSpecificWords.length > 0 ? (
                  topicSpecificWords.map((word, index) => (
                    <div key={index} className="flex flex-wrap items-center gap-2 p-2 border border-gray-100 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs px-2 py-0.5 ${
                            word.type === 'positive' ? 'border-green-300 text-green-700' :
                            word.type === 'negative' ? 'border-red-300 text-red-700' :
                            word.type === 'academic' ? 'border-blue-300 text-blue-700' :
                            'border-gray-300 text-gray-700'
                          }`}
                        >
                          {word.partOfSpeech}
                        </Badge>
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          {word.difficulty}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">{word.word}</div>
                        <div className="text-xs text-gray-600">{word.meaning}</div>
                        <div className="text-xs text-gray-500 italic mt-1">{word.example}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 text-center py-4">
                    No topic-specific vocabulary available for {questionType}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>

        {/* Useful Expressions */}
        {task1PhraseCategories.map((category, index) => (
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
            <AccordionContent className="p-3">
              {loadedPhrases[category.id] ? (
                <div className="space-y-2">
                  {loadedPhrases[category.id].map((phrase, phraseIndex) => (
                    <div 
                      key={phraseIndex} 
                      className="p-2 bg-gray-50 rounded-md border border-gray-100 text-sm text-gray-700"
                    >
                      {phrase}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Button
                    variant="outline"
                    onClick={() => handleLoadMorePhrases(category.id)}
                    className="text-primary border-primary/30 hover:border-primary text-xs px-6 py-1.5 h-auto shadow-sm"
                    size="sm"
                    disabled={isLoadingPhrases}
                  >
                    {isLoadingPhrases ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-2">
                          <path d="M12 8v8"></path><path d="M8 12h8"></path>
                        </svg>
                        Load Phrases
                      </>
                    )}
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default function Task1WritingInterface({ question, questionType, bandLevel, timeLimit }: Task1WritingInterfaceProps) {
  const [content, setContent] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const { timeRemaining, formattedTime, isRunning, startTimer, pauseTimer, resetTimer } = useTimer({
    initialMinutes: timeLimit === "no-limit" ? 0 : parseInt(timeLimit),
    autoStart: timeLimit !== "no-limit"
  });

  useEffect(() => {
    // Auto-start timer when component mounts
    if (timeLimit !== "no-limit") {
      startTimer();
    }
  }, [timeLimit, startTimer]);

  const handleSave = () => {
    setShowSaveDialog(true);
  };

  const handleConfirmSave = () => {
    // Handle save logic here
    console.log("Saving Task 1 content:", content);
    setShowSaveDialog(false);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/writing-task-1">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Setup
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Writing Task 1 Practice</h1>
          </div>
          <div className="flex items-center gap-4">
            <Timer time={formattedTime()} isRunning={isRunning} />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={isRunning ? pauseTimer : startTimer}
                disabled={timeLimit === "no-limit"}
              >
                {isRunning ? "Pause" : "Start"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => resetTimer()}
                disabled={timeLimit === "no-limit"}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Display */}
      <div className="bg-teal-50 border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Writing Question:</h2>
          <p className="text-gray-700 leading-relaxed">{question}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Writing Area */}
        <div className="flex-1 flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <WordCounter count={wordCount} minWords={150} maxWords={400} />
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
          </div>
          <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-full">
              <Editor
                value={content}
                onChange={setContent}
                placeholder="Start writing your Task 1 response here..."
                minWords={150}
                maxWords={400}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-96 border-l border-gray-200 bg-gray-50 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Outline Section */}
            <div className="flex-1 p-4">
              <Task1OutlineSection questionType={questionType} question={question} />
            </div>
            
            {/* Resources Section */}
            <div className="h-96 border-t border-gray-200 p-4 bg-white">
              <Task1ResourcesSection questionType={questionType} />
            </div>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Your Task 1 Writing</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to save your current Task 1 writing progress? You can continue editing later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSave}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
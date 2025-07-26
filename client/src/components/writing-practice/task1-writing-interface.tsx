import React, { useState, useEffect, useRef } from "react";
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

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
                Analyze Question
              </TabsTrigger>
              <TabsTrigger 
                value="outline" 
                className="flex-1 text-sm py-2.5 px-4 font-medium rounded-lg transition-all flex items-center justify-center gap-2
                        hover:bg-gray-50
                        data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-bold"
              >
                <Layers className="h-4 w-4" />
                Sample
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
                Sample - Bài mẫu
              </h4>
              <p className="text-xs mb-4 text-gray-600 italic bg-gray-50 p-2 rounded-md border border-gray-100">
                Sample Task 1 essay structure with detailed paragraph breakdown
              </p>

              <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: '430px' }}>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {/* Accordion 1: Paragraph 1: Introduction */}
                  <AccordionItem 
                    value="paragraph-1"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          1
                        </span>
                        Paragraph 1: Introduction
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="text-xs text-gray-700 leading-relaxed">
                        The line graph illustrates the consumption of energy in the United States from 1980, with projections extending to 2030, categorized by different fuel types.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion 2: Paragraph 2: Overview */}
                  <AccordionItem 
                    value="paragraph-2"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          2
                        </span>
                        Paragraph 2: Overview
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="text-xs text-gray-700 leading-relaxed">
                        Overall, the graph indicates a general increase in energy consumption across most sources over the period. While petroleum consistently remained the dominant energy source, natural gas experienced the most substantial growth. Conversely, nuclear energy exhibited relative stability, and renewables, although starting from a low base, showed a gradual upward trend.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion 3: Paragraph 3: First Main Feature */}
                  <AccordionItem 
                    value="paragraph-3"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          3
                        </span>
                        Paragraph 3: First Main Feature
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="text-xs text-gray-700 leading-relaxed">
                        Petroleum held the largest share of energy consumption, starting at approximately 35 quadrillion BTU in 1980. It rose slightly to around 37 quadrillion BTU by 2008 and is projected to remain at this level until 2030. Natural gas consumption, however, saw a significant increase, rising from about 20 quadrillion BTU in 1980 to roughly 24 quadrillion BTU in 2008.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion 4: Paragraph 4: Second Main Feature */}
                  <AccordionItem 
                    value="paragraph-4"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          4
                        </span>
                        Paragraph 4: Second Main Feature
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="text-xs text-gray-700 leading-relaxed">
                        Coal consumption increased steadily from 15 quadrillion BTU in 1980 to approximately 22 quadrillion BTU in 2008 and is expected to remain stable until 2030. In contrast, nuclear energy remained relatively constant at around 8 quadrillion BTU throughout the period. Renewables, starting from a low base of 3 quadrillion BTU in 1980, increased to about 7 quadrillion BTU by 2008 and are projected to reach 12 quadrillion BTU by 2030.
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
                Analyze Question - Phân tích câu hỏi
              </h4>
              <p className="text-xs mb-4 text-gray-600 italic bg-gray-50 p-2 rounded-md border border-gray-100">
                Detailed analysis of the Task 1 question and visual data
              </p>

              <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: '430px' }}>
                <Accordion type="single" collapsible defaultValue="image-description" className="w-full space-y-2">
                  {/* Accordion 1: Image Description */}
                  <AccordionItem 
                    value="image-description"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          1
                        </span>
                        Image Description
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="text-xs text-gray-600 italic">
                        (Leave this empty for now. This section will contain key trends, data points, and significant changes parsed from the visual input.)
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion 2: Analyze Question */}
                  <AccordionItem 
                    value="analyze-question"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          2
                        </span>
                        Analyze Question
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="text-xs text-gray-600 italic">
                        (Leave this empty for now. This section will contain key trends, data points, and significant changes parsed from the visual input.)
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion 3: Identify Main Features */}
                  <AccordionItem 
                    value="identify-features"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          3
                        </span>
                        Identify Main Features
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="text-xs text-gray-600 italic">
                        (Leave this empty for now. This section will contain key trends, data points, and significant changes parsed from the visual input.)
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion 4: Jobs To Be Done */}
                  <AccordionItem 
                    value="jobs-to-be-done"
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger 
                      className="text-sm font-medium py-3 px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">
                          4
                        </span>
                        Jobs To Be Done
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-3 bg-white">
                      <div className="text-xs text-gray-600 italic">
                        (Leave this empty for now. This section will contain key trends, data points, and significant changes parsed from the visual input.)
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
  const [isLoadingPhrases, setIsLoadingPhrases] = useState(false);
  const [phrasesLoaded, setPhrasesLoaded] = useState(false);
  
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

  // Get phrase words from vocabulary data
  const phraseWords = allVocabulary.flatMap(category => 
    category.words
      .filter(word => word.partOfSpeech === "Phrase")
      .map(word => ({ ...word, type: category.type }))
  );

  const handleLoadMorePhrases = async () => {
    if (phrasesLoaded) return;
    
    setIsLoadingPhrases(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPhrasesLoaded(true);
    setIsLoadingPhrases(false);
  };

  const hasMorePhrases = !phrasesLoaded && phraseWords.length > 0;

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="py-2 px-3 bg-gray-50 border-b border-gray-200">
        <h3 className="font-medium text-xs">Vocabulary & Phrases</h3>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex gap-0 bg-gray-50 rounded-none p-0 border-b border-gray-200">
            <TabsTrigger 
              value="vocabulary" 
              className="flex-1 text-xs py-2 px-3 font-medium transition-all
                      hover:bg-gray-100
                      data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
            >Structure Vocabulary</TabsTrigger>
            <TabsTrigger 
              value="topic" 
              className="flex-1 text-xs py-2 px-3 font-medium transition-all
                      hover:bg-gray-100
                      data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              Topic-specific Vocabulary
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="vocabulary" className="p-3">
            {/* General Vocabulary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {vocabularyWords.map((word, index) => (
                <div key={index} className="p-2 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-sm font-medium text-gray-900">{word.word}</div>
                    <div className="flex gap-1">
                      <div className={`text-xs px-1.5 py-0.5 rounded ${
                        word.type === 'positive' ? 'bg-green-100 text-green-700' :
                        word.type === 'negative' ? 'bg-red-100 text-red-700' :
                        word.type === 'academic' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {word.partOfSpeech}
                      </div>
                      <div className="text-xs px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">
                        {word.difficulty}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 mb-1">
                    <span className="font-medium">Meaning:</span> {word.meaning}
                  </p>
                  <p className="text-xs text-gray-600 italic border-t border-gray-200 pt-1 mt-1">
                    <span className="font-medium not-italic">Example:</span> {word.example}
                  </p>
                </div>
              ))}
            </div>

            {/* Phrases Section */}
            {phrasesLoaded && (
              <>
                <div className="border-t border-gray-200 pt-3 mb-2">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Task 1 Phrases</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {phraseWords.map((phrase, index) => (
                    <div key={index} className="p-2 border border-gray-100 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-medium text-gray-900">{phrase.word}</div>
                        <div className="flex gap-1">
                          <div className={`text-xs px-1.5 py-0.5 rounded ${
                            phrase.type === 'positive' ? 'bg-green-100 text-green-700' :
                            phrase.type === 'negative' ? 'bg-red-100 text-red-700' :
                            phrase.type === 'academic' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {phrase.partOfSpeech}
                          </div>
                          <div className="text-xs px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">
                            {phrase.difficulty}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-1">
                        <span className="font-medium">Meaning:</span> {phrase.meaning}
                      </p>
                      <p className="text-xs text-gray-600 italic border-t border-gray-200 pt-1 mt-1">
                        <span className="font-medium not-italic">Example:</span> {phrase.example}
                      </p>
                    </div>
                  ))}

                  {/* Fill in empty cell if odd number of phrases */}
                  {phraseWords.length % 2 !== 0 && (
                    <div className="hidden md:block" />
                  )}
                </div>
              </>
            )}

            {/* Load more button for phrases */}
            {hasMorePhrases && (
              <div className="flex justify-center mt-4 mb-2">
                <Button 
                  variant="outline" 
                  onClick={handleLoadMorePhrases}
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
                      Load More Phrases
                    </>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="topic" className="p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topicSpecificWords.length > 0 ? (
                topicSpecificWords.map((word, index) => (
                  <div key={index} className="p-2 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-sm font-medium text-gray-900">{word.word}</div>
                      <div className="flex gap-1">
                        <div className={`text-xs px-1.5 py-0.5 rounded ${
                          word.type === 'positive' ? 'bg-green-100 text-green-700' :
                          word.type === 'negative' ? 'bg-red-100 text-red-700' :
                          word.type === 'academic' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {word.partOfSpeech}
                        </div>
                        <div className="text-xs px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">
                          {word.difficulty}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 mb-1">
                      <span className="font-medium">Meaning:</span> {word.meaning}
                    </p>
                    <p className="text-xs text-gray-600 italic border-t border-gray-200 pt-1 mt-1">
                      <span className="font-medium not-italic">Example:</span> {word.example}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-sm text-gray-500 text-center py-4">
                  No topic-specific vocabulary available for {questionType}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Chart component for Task 1 data visualization
function Task1Chart() {
  const chartData = {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015'],
    datasets: [
      {
        label: 'Mathematics (Male)',
        data: [65, 68, 72, 75, 78, 82],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Mathematics (Female)',
        data: [62, 66, 70, 74, 77, 80],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Science (Male)',
        data: [58, 61, 65, 68, 71, 75],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Science (Female)',
        data: [55, 59, 63, 66, 69, 73],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.1,
      },
      {
        label: 'English (Male)',
        data: [72, 74, 76, 78, 80, 83],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: 'High School Competency Exam Pass Rates by Subject and Gender (2010-2015)',
        font: {
          size: 12
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          font: {
            size: 10
          }
        },
        title: {
          display: true,
          text: 'Pass Rate (%)',
          font: {
            size: 11
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 10
          }
        },
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 11
          }
        }
      }
    },
  };

  return (
    <div className="bg-white rounded-md p-4 mb-3 border-2 border-gray-200 shadow-sm">
      <div style={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default function Task1WritingInterface({ question, questionType, bandLevel, timeLimit }: Task1WritingInterfaceProps) {
  const [essayContent, setEssayContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isWordCountValid, setIsWordCountValid] = useState(true);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const { formattedTime, isRunning, startTimer, updateTimer } = useTimer({
    initialMinutes: timeLimit === "no-limit" ? 0 : parseInt(timeLimit),
    onTimeUp: () => setShowTimeUpDialog(true),
    autoStart: timeLimit !== "no-limit" && parseInt(timeLimit) > 0,
  });

  // Start timer when component mounts if time limit is set
  useEffect(() => {
    if (timeLimit !== "no-limit" && parseInt(timeLimit) > 0) {
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
    // Handle submit logic for Task 1
    console.log("Submitting Task 1 essay:", essayContent);
  };

  const handleSaveDraft = () => {
    // Save to localStorage
    localStorage.setItem('task1EssayDraft', essayContent);
    localStorage.setItem('task1Question', question);
    alert('Task 1 draft saved successfully');
  };

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
            <div className="text-cyan-700 font-medium mb-1">Task 1 Question:</div>
            <div className="text-gray-700 text-sm">The bar chart below shows the percentage of students who passed their high school competency exams, by subject and gender, during the period 2010-2011. Summarise the information by selecting and reporting the main features and make comparisons where relevant.</div>
          </div>

          <Task1Chart />

          <div className="flex items-center justify-between mb-2 h-8">
            <Timer 
              time={formattedTime()} 
              onTimeSelect={handleTimeSelect}
              isRunning={isRunning}
            />
            <WordCounter
              count={wordCount}
              maxWords={400}
              isValid={isWordCountValid}
              minWords={150}
            />
          </div>

          <Editor
            value={essayContent}
            onChange={setEssayContent}
            onWordCountChange={handleWordCountChange}
            minWords={150}
            maxWords={400}
            placeholder="Start writing your Task 1 response here..."
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
          <Task1OutlineSection 
            questionType={questionType} 
            question={question} 
          />
        </div>
      </div>

      <div className="mt-4 lg:hidden">
        <Task1OutlineSection 
          questionType={questionType} 
          question={question} 
        />
      </div>

      {/* Resources Section Below */}
      <Task1ResourcesSection 
        questionType={questionType} 
      />

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Task 1 Practice?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit the Task 1 writing practice? Your progress will not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Writing</AlertDialogCancel>
            <Link href="/writing-task-1">
              <AlertDialogAction>
                Exit
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
              Your allocated time for this Task 1 essay has ended. Would you like to submit your work now or continue writing?
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
              Word limit requirement not met. Your Task 1 essay should be between 150 and 400 words.
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
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
import { Task1FeedbackInterface } from "./task1-feedback-interface";
import { Link } from "wouter";
import { InteractiveLoadingPage } from "@/components/ui/interactive-loading-page";
import { ShimmerLoader, ShimmerCard, ShimmerList, ShimmerText } from "@/components/ui/shimmer-loader";
import { BookLoader } from "@/components/ui/book-loader";
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
  const [showTaskBreakdown, setShowTaskBreakdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTaskBreakdown, setIsLoadingTaskBreakdown] = useState(false);
  const outline = getTask1Outline(questionType);

  useEffect(() => {
    // Show loading for 6 seconds when component mounts
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // Handle task breakdown toggle with loading animation
  const handleShowTaskBreakdown = () => {
    setIsLoadingTaskBreakdown(true);
    setTimeout(() => {
      setIsLoadingTaskBreakdown(false);
      setShowTaskBreakdown(true);
    }, 5000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toggle Button for Task Breakdown */}
      {isLoadingTaskBreakdown ? (
        <div className="flex flex-col justify-center items-center h-full w-full bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-lg p-8 shadow-sm min-h-[200px] mb-4">
          <BookLoader message="Analyzing your Task 1 question..." />
        </div>
      ) : !showTaskBreakdown ? (
        <div className="flex flex-col justify-center items-center w-full bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4">
          <Button
            variant="outline"
            size="sm"
            className="mb-3 bg-white hover:bg-gray-50 shadow-sm border-gray-200 px-4 text-sm"
            onClick={handleShowTaskBreakdown}
          >
            🔍 Show Task Breakdown
          </Button>
          <p className="text-gray-700 font-medium text-sm mb-1 text-center">Click to unlock insights into the Task 1 image and sample answer!</p>
          <p className="text-primary font-medium text-xs text-center">Understand the structure before you write. ✨</p>
        </div>
      ) : (
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
              <div className="text-xs text-gray-700 leading-relaxed">
                Analysis content for Task 1 breakdown.
              </div>
            </div>
          </TabsContent>

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
              <p className="text-xs mb-4 text-gray-600 italic bg-gray-50 p-2 rounded-md border border-gray-100">Sample answer</p>
              <div className="text-xs text-gray-700 leading-relaxed">
                Sample content for Task 1 breakdown.
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default function Task1WritingInterface({ 
  question,
  questionType, 
  bandLevel, 
  timeLimit 
}: Task1WritingInterfaceProps) {
  const [essay, setEssay] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [showOutline, setShowOutline] = useState(true);
  const editorRef = useRef<any>(null);

  const { timeLeft, isRunning, startTimer, stopTimer, resetTimer } = useTimer(
    timeLimit === "no-limit" ? 0 : parseInt(timeLimit) * 60
  );

  const handleEssayChange = (content: string) => {
    setEssay(content);
    // Simple word count (spaces + 1, accounting for empty content)
    const words = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
    setWordCount(words);
  };

  const handleFinish = () => {
    stopTimer();
    setShowFeedback(true);
  };

  const handleSaveDraft = () => {
    // Save to localStorage or send to backend
    localStorage.setItem('task1-draft', JSON.stringify({
      essay,
      question,
      questionType,
      bandLevel,
      timeLimit,
      timestamp: new Date().toISOString()
    }));
  };

  if (showFeedback) {
    return (
      <Task1FeedbackInterface
        essay={essay}
        question={question}
        questionType={questionType}
        bandLevel={bandLevel.replace("Band ", "")}
        onBack={() => setShowFeedback(false)}
      />
    );
  }

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/writing-task-1">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Setup
              </Button>
            </Link>
            <div className="h-4 w-px bg-gray-300" />
            <h1 className="text-lg font-semibold text-gray-900">IELTS Writing Task 1</h1>
            <Badge variant="outline" className="text-xs">
              Target: {bandLevel}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <WordCounter count={wordCount} target={150} />
            {timeLimit !== "no-limit" && (
              <div className="flex items-center gap-2">
                <Timer 
                  timeLeft={timeLeft} 
                  isRunning={isRunning}
                  onStart={startTimer}
                  onStop={stopTimer}
                  onReset={resetTimer}
                />
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              className="text-gray-600 hover:text-gray-900"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Writing Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Question Display */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="max-w-4xl">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Writing Task 1</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {question}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  You should write at least 150 words.
                </p>
              </div>
            </div>

            {/* Editor */}
            <div className="flex-1 p-6">
              <div className="h-full">
                <Editor
                  ref={editorRef}
                  value={essay}
                  onChange={handleEssayChange}
                  placeholder="Start writing your Task 1 response here..."
                  className="h-full border border-gray-200 rounded-lg"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Words: {wordCount} / 150+ recommended
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowExitDialog(true)}
                  >
                    Exit Practice
                  </Button>
                  <Button
                    onClick={handleFinish}
                    className="bg-primary hover:bg-primary/90"
                    disabled={wordCount < 50}
                  >
                    Get Feedback
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Support Section */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Writing Support</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOutline(!showOutline)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showOutline ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <Task1OutlineSection questionType={questionType} question={question} />
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Writing Practice?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost. Make sure to save your draft before leaving.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Writing</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link href="/writing-task-1">
                Exit Practice
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { Save, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "wouter";

interface Task2WritingInterfaceProps {
  question: string;
  questionType: string;
  bandLevel: string;
  timeLimit: string;
}

// Task 2 Outline component with tabs for outline and useful expressions
function Task2OutlineSection({ questionType, question }: { questionType: string, question: string }) {
  const [showOutline, setShowOutline] = useState(true);
  
  // Generate outline based on question type
  const getOutline = () => {
    switch (questionType) {
      case 'opinion':
        return {
          title: 'Opinion Essay Structure',
          sections: [
            'Introduction: Paraphrase the question and state your opinion clearly',
            'Body Paragraph 1: First reason supporting your opinion with examples',
            'Body Paragraph 2: Second reason supporting your opinion with examples',
            'Conclusion: Restate your opinion and summarize main points'
          ]
        };
      case 'discussion':
        return {
          title: 'Discussion Essay Structure',
          sections: [
            'Introduction: Paraphrase the question and outline both viewpoints',
            'Body Paragraph 1: Discuss the first viewpoint with examples',
            'Body Paragraph 2: Discuss the second viewpoint with examples',
            'Conclusion: Summarize both views and give your opinion'
          ]
        };
      case 'problem-solution':
        return {
          title: 'Problem-Solution Essay Structure',
          sections: [
            'Introduction: Paraphrase the question and outline the problems',
            'Body Paragraph 1: Identify and explain main problems with examples',
            'Body Paragraph 2: Propose practical solutions with examples',
            'Conclusion: Summarize problems and solutions'
          ]
        };
      case 'advantage-disadvantage':
        return {
          title: 'Advantage-Disadvantage Essay Structure',
          sections: [
            'Introduction: Paraphrase the question and outline advantages/disadvantages',
            'Body Paragraph 1: Discuss advantages with examples',
            'Body Paragraph 2: Discuss disadvantages with examples',
            'Conclusion: Weigh up advantages and disadvantages, give your view'
          ]
        };
      case 'two-part-question':
        return {
          title: 'Two-Part Question Essay Structure',
          sections: [
            'Introduction: Paraphrase the question and outline your response',
            'Body Paragraph 1: Answer the first part of the question with examples',
            'Body Paragraph 2: Answer the second part of the question with examples',
            'Conclusion: Summarize your answers to both questions'
          ]
        };
      default:
        return {
          title: 'Essay Structure',
          sections: [
            'Introduction: Introduce the topic and state your position',
            'Body Paragraph 1: Main point with supporting details',
            'Body Paragraph 2: Second main point with supporting details',
            'Conclusion: Summarize and restate your position'
          ]
        };
    }
  };

  const outline = getOutline();

  return (
    <div className="space-y-4">
      <Tabs defaultValue="outline" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="tips">Writing Tips</TabsTrigger>
        </TabsList>
        
        <TabsContent value="outline" className="space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">{outline.title}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOutline(!showOutline)}
                  className="h-8 w-8 p-0"
                >
                  {showOutline ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            {showOutline && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {outline.sections.map((section, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-0.5 min-w-[20px] justify-center">
                        {index + 1}
                      </Badge>
                      <p className="text-sm text-gray-700 leading-relaxed">{section}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <h4 className="font-semibold text-gray-900">Writing Tips for Task 2</h4>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Aim for 250+ words (ideally 280-320 words)</p>
                <p>• Spend 5 minutes planning your essay</p>
                <p>• Use a variety of sentence structures</p>
                <p>• Include topic-specific vocabulary</p>
                <p>• Support your points with examples</p>
                <p>• Use linking words to connect ideas</p>
                <p>• Save 3-5 minutes for checking your work</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Task2WritingInterface({
  question,
  questionType,
  bandLevel,
  timeLimit
}: Task2WritingInterfaceProps) {
  const [essayContent, setEssayContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<any>(null);

  // Parse time limit
  const timeInMinutes = timeLimit === "no-limit" ? 0 : parseInt(timeLimit.split(" ")[0]);
  
  const {
    timeRemaining,
    formattedTime,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    isTimeUp
  } = useTimer({ 
    initialMinutes: timeInMinutes, 
    onTimeUp: () => {
      if (!isSubmitted) {
        handleSubmit();
      }
    }
  });

  // Start timer when component mounts
  useEffect(() => {
    if (timeInMinutes && timeInMinutes > 0) {
      startTimer();
    }
  }, [timeInMinutes, startTimer]);

  const handleContentChange = useCallback((content: string) => {
    setEssayContent(content);
    // Calculate word count
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, []);

  const handleSubmit = () => {
    setIsSubmitted(true);
    pauseTimer();
    // Here you would typically send the essay for grading
    console.log("Essay submitted:", {
      content: essayContent,
      wordCount,
      timeSpent: timeInMinutes ? (timeInMinutes * 60 - timeRemaining) : null,
      questionType,
      bandLevel
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Essay Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Your Task 2 essay has been submitted with {wordCount} words.
            </p>
          </div>
          <div className="space-y-3">
            <Link href="/writing-task-2">
              <Button className="w-full">
                Practice Another Essay
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExit}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Exit
                </Button>
                <div className="text-sm text-gray-600">
                  IELTS Writing Task 2 - {questionType}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {timeInMinutes > 0 && (
                  <Timer 
                    time={formattedTime()}
                    isRunning={isRunning}
                  />
                )}
                <WordCounter 
                  count={wordCount}
                  minWords={250}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="min-w-[80px]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={wordCount < 50}
                  className="bg-[#1fb2aa] hover:bg-[#0d9488]"
                >
                  Submit Essay
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Question and Outline - Left Side */}
            <div className="lg:col-span-1 space-y-6">
              {/* Question Card */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Task 2 Question</h3>
                  <Badge variant="outline" className="w-fit">
                    {questionType} - Band {bandLevel}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {question}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Outline */}
              <Task2OutlineSection questionType={questionType} question={question} />
            </div>

            {/* Writing Area - Right Side */}
            <div className="lg:col-span-2">
              <Card className="h-[calc(100vh-200px)]">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Your Essay</h3>
                    <div className="text-sm text-gray-500">
                      Target: 250+ words
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-full pb-6">
                  <Editor
                    value={essayContent}
                    onChange={handleContentChange}
                    placeholder="Start writing your Task 2 essay here..."
                    minWords={250}
                    maxWords={500}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Exit Confirmation Dialog */}
        <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Exit Writing Practice?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to exit? Your current progress will be lost if you haven't saved it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continue Writing</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href="/writing-task-2">
                  <Button variant="destructive">
                    Exit
                  </Button>
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}